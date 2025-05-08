import { users, contactMessages, type User, type InsertUser, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
}

export class MongoStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  currentId: number;
  contactMessageId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.currentId = 1;
    this.contactMessageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const doc = await ContactMessageModel.create(message);
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
      subject: `New Contact Message: ${message.subject}`,
      text: `Name: ${message.name}\nEmail: ${message.email}\nMessage: ${message.message}`
    });
    return { ...doc.toObject(), id: doc._id, createdAt: doc.createdAt };
  }
  async getAllContactMessages(): Promise<ContactMessage[]> {
    const docs = await ContactMessageModel.find().sort({ createdAt: -1 });
    return docs.map(doc => ({ ...doc.toObject(), id: doc._id, createdAt: doc.createdAt }));
  }
}

export const storage = new MongoStorage();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI!);

const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const ContactMessageModel = mongoose.models.ContactMessage || mongoose.model("ContactMessage", contactMessageSchema);
