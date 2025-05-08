import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";
import cors from "cors";

export async function registerRoutes(app: Express): Promise<Server> {
  // Handle preflight OPTIONS for /api/contact
  app.options("/api/contact", cors());

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body against schema
      const validatedData = contactSchema.parse(req.body);
      
      // Store the contact message
      const message = await storage.createContactMessage(validatedData);
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "Contact message received",
        data: message
      });
    } catch (error) {
      // Return error response
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to process contact message"
      });
    }
  });
  
  // Get all contact messages (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      
      res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to retrieve contact messages"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
