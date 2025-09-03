import { Router } from "express";
import { ddb, tables } from "../services/db.js";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Initiative } from "../models/types.js";
const r = Router();

r.get("/", async (req, res) => {
  const orgId = (req as any).orgId;
  const data = await ddb.send(new ScanCommand({
    TableName: tables.initiatives,
    FilterExpression: "orgId = :o",
    ExpressionAttributeValues: { ":o": orgId }
  }));
  res.json(data.Items || []);
});

r.post("/", async (req, res) => {
  const orgId = (req as any).orgId;
  const now = new Date().toISOString();
  const initiative: Initiative = {
    orgId,
    projectId: req.body.projectId,
    initiativeId: "ini_" + Math.random().toString(36).slice(2, 8),
    title: req.body.title,
    owner: req.body.owner,
    rag: req.body.rag || "GREEN",
    createdAt: now,
    updatedAt: now
  };
  await ddb.send(new PutCommand({ TableName: tables.initiatives, Item: initiative }));
  res.status(201).json(initiative);
});

export default r;
