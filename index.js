import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const {
      name,
      companyName,
      mobile,
      email,
      website,
      city,
      interests,
      segment
    } = req.body;

    // 1️⃣ Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    // 2️⃣ Build email content
    const mailOptions = {
      from: `"Website Enquiry" <${process.env.EMAIL}>`,
      to: ["booking@mfindia.net","support@acmee.in"], // YOUR EMAIL (fixed)
      subject: "New Enquiry Received - MFINDIA Website",
      html: `
        <h2>Received Data</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Company:</b> ${companyName}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Website:</b> ${website}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>Interests:</b> ${interests.join(", ")}</p>
        <p><b>Segment:</b> ${segment}</p>
      `
    };

    // 3️⃣ Send email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});