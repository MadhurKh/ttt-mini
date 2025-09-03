import { Router, Request, Response } from "express";
import { ddb, tables } from "../services/db.js";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Project } from "../models/types.js";

const r = Router();

/**
 * List projects for the caller's org
 */
r.get("/", async (req: Request, res: Response) => {
  const orgId = (req as any).orgId as string;

  const data = await ddb.send(new ScanCommand({
    TableName: tables.projects,
    FilterExpression: "orgId = :o",
    ExpressionAttributeValues: { ":o": orgId }
  }));

  res.json(data.Items || []);
});

/**
 * Create a project with richer fields
 */
r.post("/", async (req: Request, res: Response) => {
  const orgId = (req as any).orgId as string;
  const now = new Date().toISOString();

  // Accept the new model fields (with sensible defaults)
  const {
    name,
    problem,
    solution,
    owner,
    sponsor,
    stage = "IN_PROGRESS",
    rag = "GREEN",
    valueUSDTarget = 0,
    valueUSDDelivered = 0,
    startDate,
    targetEndDate,
    actualEndDate
  } = req.body ?? {};

  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  // Backward-compat: if old field 'valueUSD' is sent, treat as delivered
  const delivered = req.body?.valueUSD != null
    ? Number(req.body.valueUSD)
    : Number(valueUSDDelivered || 0);

  const project: Project = {
    orgId,
    projectId: "prj_" + Math.random().toString(36).slice(2, 8),
    name,
    problem,
    solution,
    owner,
    sponsor,
    stage,
    rag,
    valueUSDTarget: Number(valueUSDTarget || 0),
    valueUSDDelivered: delivered,
    startDate,
    targetEndDate,
    actualEndDate,
    createdAt: now,
    updatedAt: now
  };

  await ddb.send(new PutCommand({
    TableName: tables.projects,
    Item: project
  }));

  res.status(201).json(project);
});

export default r;
