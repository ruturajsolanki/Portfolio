// Vercel Serverless Function for /api/contact
// Required environment variables: MONGODB_URI, GMAIL_USER, GMAIL_PASS, GMAIL_RECEIVER
import { contactSchema } from "../../shared/schema";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// MongoDB connection (reuse if already connected)
const MONGODB_URI = process.env.MONGODB_URI!;
if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI);
}

const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const ContactMessageModel = mongoose.models.ContactMessage || mongoose.model("ContactMessage", contactMessageSchema);

/**
 * @param {any} req
 * @param {any} res
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS for Netlify frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Validate request body
    const validatedData = contactSchema.parse(req.body);
    // Store the contact message
    const doc = await ContactMessageModel.create(validatedData);
    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_RECEIVER,
      subject: `New Contact Message: ${validatedData.subject}`,
      text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nMessage: ${validatedData.message}`
    });
    return res.status(201).json({
      success: true,
      message: "Contact message received",
      data: { ...doc.toObject(), id: doc._id, createdAt: doc.createdAt }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to process contact message"
    });
  }
} 