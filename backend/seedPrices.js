require("dotenv").config();
const mongoose = require("mongoose");
const Price = require("./models/price.model");
const connectDB = require("./config/db");

const main = async () => {
  try {
    await connectDB();
    
    // The prices array to be seeded
    const prices = [
      // 🧱 Flooring Work
      { category: "Flooring Work", name: "Italian Granite Flooring", price: 88, unit: "sqft" },
      { category: "Flooring Work", name: "Wooden Flooring", price: 30, unit: "sqft" },
      { category: "Flooring Work", name: "Granite Flooring", price: 73, unit: "sqft" },
      { category: "Flooring Work", name: "800x1600 Tile Flooring", price: 30, unit: "sqft" },
      // 🧱 Wall & Cladding
      { category: "Wall & Cladding", name: "Italian Wall Cladding", price: 128, unit: "sqft" },
      { category: "Wall & Cladding", name: "Granite Wall Cladding", price: 108, unit: "sqft" },
      { category: "Wall & Cladding", name: "1200x1800 Wall Cladding", price: 45, unit: "sqft" },
      { category: "Wall & Cladding", name: "800x1600 Wall Tile", price: 35, unit: "sqft" },
      // 🚪 Frame & Fitting
      { category: "Frame & Fitting", name: "Door/Window Frame Cutting & Fitting", price: 78, unit: "rft" },
      { category: "Frame & Fitting", name: "Italian Door Frame Work", price: 88, unit: "rft" },
      { category: "Frame & Fitting", name: "Photo Frame Work", price: 83, unit: "rft" },
      // 📐 Finishing Work
      { category: "Finishing Work", name: "Champer Work", price: 30, unit: "rft" },
      { category: "Finishing Work", name: "Moulding", price: 60, unit: "rft" },
      { category: "Finishing Work", name: "45° Katra Cutting", price: 60, unit: "rft" },
      { category: "Finishing Work", name: "Border Patti", price: 68, unit: "rft" },
      // 🪜 Staircase & Special Work
      { category: "Staircase & Special Work", name: "Riser Cutting", price: 78, unit: "rft" },
      { category: "Staircase & Special Work", name: "Tappa Work", price: 88, unit: "sqft" },
      { category: "Staircase & Special Work", name: "Hard Machan (Base Work)", price: 15, unit: "sqft" },
      // 🛠️ Extra Work
      { category: "Extra Work", name: "Old Flooring Removing", price: 12, unit: "sqft" },
      { category: "Extra Work", name: "Skirting Remove", price: 8, unit: "rft" },
      { category: "Extra Work", name: "Basin Counter", price: 5000, unit: "piece" },
      { category: "Extra Work", name: "Nani Trap", price: 200, unit: "piece" },
      { category: "Extra Work", name: "Light Core Cutting", price: 100, unit: "piece" }
    ];

    // Optional: Clear existing prices before seeding to prevent duplicates
    // But let's check if they exist or just insert/update them
    for (const item of prices) {
      const existing = await Price.findOne({ name: item.name });
      if (existing) {
        existing.price = item.price;
        existing.category = item.category;
        existing.unit = item.unit;
        await existing.save();
        console.log(`Updated: ${item.name}`);
      } else {
        await Price.create(item);
        console.log(`Added: ${item.name}`);
      }
    }
    
    console.log("Pricing seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding pricing:", error);
    process.exit(1);
  }
};

main();
