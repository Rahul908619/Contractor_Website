const nodemailer = require("nodemailer");

const sendEmail = async ({ name, phone, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sktilesandmarblesnashik@gmail.com",
        pass: "ywgu lotl kzde ujay",
      },
    });

    await transporter.sendMail({
      from: "sktilesandmarblesnashik@gmail.com",
      to: "sktilesandmarblesnashik@gmail.com",
      subject: "New Customer Enquiry",
      text: `
New Enquiry Received:

Name: ${name}
Phone: ${phone}
Message: ${message}
      `,
    });

  } catch (error) {
    console.log("Email Error:", error);
  }
};

module.exports = sendEmail;
