import { Router } from "express";
import { ddb, tables } from "../services/db.js";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Project } from "../models/types.js";
const r = Router();

r.get("/", async (req, res) => {
  const orgId = (req as any).orgId;
  const data = await ddb.send(new ScanCommand({
    TableName: tables.projects,
    FilterExpression: "orgId = :o",
    ExpressionAttributeValues: { ":o": orgId }
  }));
  res.json(data.Items || []);
});

r.post("/", async (req, res) => {
  const orgId = (req as any).orgId;
  const now = new Date().toISOString();
  const project: Project = {
    orgId,
    projectId: "prj_" + Math.random().toString(36).slice(2, 8),
    name: req.body.name,
    owner: req.body.owner,
    valueUSD: Number(req.body.valueUSD || 0),
    createdAt: now,
    updatedAt: now
  };
  await ddb.send(new PutCommand({ TableName: tables.projects, Item: project }));
  res.status(201).json(project);
});

export default r;
