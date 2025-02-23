import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCrisisSchema, insertFundSchema, insertNonprofitSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Crisis routes
  app.get("/api/crises", async (_req, res) => {
    const crises = await storage.getCrises();
    res.json(crises);
  });

  app.get("/api/crises/:id", async (req, res) => {
    const crisis = await storage.getCrisis(Number(req.params.id));
    if (!crisis) {
      return res.status(404).json({ message: "Crisis not found" });
    }
    res.json(crisis);
  });

  app.post("/api/crises", async (req, res) => {
    const result = insertCrisisSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid crisis data" });
    }
    const crisis = await storage.createCrisis(result.data);
    res.status(201).json(crisis);
  });

  app.patch("/api/crises/:id/status", async (req, res) => {
    const { status } = req.body;
    if (!status || typeof status !== "string") {
      return res.status(400).json({ message: "Invalid status" });
    }
    const crisis = await storage.updateCrisisStatus(Number(req.params.id), status);
    if (!crisis) {
      return res.status(404).json({ message: "Crisis not found" });
    }
    res.json(crisis);
  });

  // Fund routes
  app.get("/api/funds", async (_req, res) => {
    const funds = await storage.getFunds();
    res.json(funds);
  });

  app.get("/api/crises/:id/funds", async (req, res) => {
    const funds = await storage.getFundsByCrisis(Number(req.params.id));
    res.json(funds);
  });

  app.post("/api/funds", async (req, res) => {
    const result = insertFundSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid fund data" });
    }
    const fund = await storage.createFund(result.data);
    res.status(201).json(fund);
  });

  app.patch("/api/funds/:id/status", async (req, res) => {
    const { status } = req.body;
    if (!status || typeof status !== "string") {
      return res.status(400).json({ message: "Invalid status" });
    }
    const fund = await storage.updateFundStatus(Number(req.params.id), status);
    if (!fund) {
      return res.status(404).json({ message: "Fund not found" });
    }
    res.json(fund);
  });

  // Nonprofit routes
  app.get("/api/nonprofits", async (_req, res) => {
    const nonprofits = await storage.getNonprofits();
    res.json(nonprofits);
  });

  app.get("/api/nonprofits/:id", async (req, res) => {
    const nonprofit = await storage.getNonprofit(Number(req.params.id));
    if (!nonprofit) {
      return res.status(404).json({ message: "Nonprofit not found" });
    }
    res.json(nonprofit);
  });

  app.post("/api/nonprofits", async (req, res) => {
    const result = insertNonprofitSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid nonprofit data" });
    }
    const nonprofit = await storage.createNonprofit(result.data);
    res.status(201).json(nonprofit);
  });

  const httpServer = createServer(app);
  return httpServer;
}