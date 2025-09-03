import { Router, Request, Response } from "express";
import { ddb, tables } from "../services/db.js";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Initiative } from "../models/types.js";

const r = Router();

/**
 * List initiatives for the caller's org
 */
r.get("/", async (req: Request, res: Response) => {
  const orgId = (req as any).orgId as string;

  const data = await ddb.send(new ScanCommand({
    TableName: tables.initiatives,
    FilterExpression: "orgId = :o",
    ExpressionAttributeValues: { ":o": orgId }
  }));

  res.json(data.Items || []);
});

/**
 * Create an initiative (belongs to a project)
 */
r.post("/", async (req: Request, res: Response) => {
  const orgId = (req as any).orgId as string;
  const now = new Date().toISOString();

  const {
    projectId,
    title,
    approach,
    tech,
    owner,
    rag = "GREEN",
    valueUSDDelivered = 0,
    notes
  } = req.body ?? {};

  if (!projectId) {
    return res.status(400).json({ message: "projectId is required" });
  }
  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  const initiative: Initiative = {
    orgId,
    initiativeId: "init_" + Math.random().toString(36).slice(2, 8),
    projectId,
    title,
    approach,
    tech,
    owner,
    rag,
    valueUSDDelivered: Number(valueUSDDelivered || 0),
    notes,
    createdAt: now,
    updatedAt: now
  };

  await ddb.send(new PutCommand({
    TableName: tables.initiatives,
    Item: initiative
  }));

  res.status(201).json(initiative);
});

export default r;
