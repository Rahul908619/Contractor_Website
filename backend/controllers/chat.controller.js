// FIX: API key is now server-side only. Frontend Chatbot calls /api/chat
// This controller calls Groq API using the key from .env
// Add GROQ_API_KEY to your .env file

const axios = require("axios");

exports.askAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success:false, message:"Message required" });

    const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;

    if (!GROQ_API_KEY) {
      // Fallback to static replies if no API key configured
      return res.json({ success:true, reply: getStaticReply(message) });
    }

    // Try Groq first (faster + cheaper), fallback to OpenAI
    const isGroq = process.env.GROQ_API_KEY;

    const response = await axios.post(
      isGroq
        ? "https://api.groq.com/openai/v1/chat/completions"
        : "https://api.openai.com/v1/chat/completions",
      {
        model: isGroq ? "llama-3.1-8b-instant" : "gpt-3.5-turbo",
        max_tokens: 200,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `You are a friendly, concise customer support assistant for SK Tiles & Marbles.
Business: SK Tiles & Marble Contractors
Owner: Shimbhu Dayal Kumawat
Location: Takli Road, Taphovan, Nashik, Maharashtra, India
Phones: 8619181791 and 9028933305
Email: SkTiles&marbles@gmail.com
Services: Marble flooring, bathroom design, tile installation, commercial interiors, staircases, feature walls, granite countertops, outdoor/parking tiles.
Experience: 20+ years, Est. 2004, 500+ projects
Areas: Maharashtra and Rajasthan

Rules:
- Keep replies short (2-4 sentences max)
- For price questions: give approximate range, suggest calling/WhatsApp for exact quote
- Always be warm and helpful
- If asked something unrelated to the business, politely redirect`,
          },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ success: true, reply });

  } catch (error) {
    console.error("Chat AI error:", error.message);
    // Always return a helpful static reply on error — never crash
    res.json({ success: true, reply: getStaticReply(req.body.message || "") });
  }
};

// Static fallback replies when API key missing or API fails
function getStaticReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes("price") || m.includes("rate") || m.includes("cost") || m.includes("kitna"))
    return "Our marble starts from ₹85/sq ft and tiles from ₹35/sq ft. For an exact quote, please call 8619181791 or WhatsApp us!";
  if (m.includes("contact") || m.includes("number") || m.includes("call") || m.includes("whatsapp"))
    return "You can reach us at 8619181791 or 9028933305. We're also on WhatsApp! Or fill the contact form on our website.";
  if (m.includes("address") || m.includes("location") || m.includes("nashik") || m.includes("where"))
    return "We are at Takli Road, Taphovan, Nashik, Maharashtra. We work across Maharashtra and Rajasthan!";
  if (m.includes("service") || m.includes("work") || m.includes("what") || m.includes("kya"))
    return "We do: Marble Flooring, Bathroom Design, Tile Installation, Staircases, Commercial Interiors, Feature Walls, Granite Countertops, and Outdoor Tiles.";
  if (m.includes("time") || m.includes("days") || m.includes("how long") || m.includes("kitne din"))
    return "A single bathroom takes 5–8 days. Larger projects 2–4 weeks. We give firm deadlines after site visit!";
  if (m.includes("experience") || m.includes("year") || m.includes("old") || m.includes("since"))
    return "We have 20+ years of experience (Est. 2004) with 500+ completed projects across Maharashtra and Rajasthan!";
  return "Thank you for reaching out! For any queries call 8619181791 or WhatsApp us. We respond within a few hours!";
}
