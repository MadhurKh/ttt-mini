import { Router } from "express";
const r = Router();
r.get("/", (_req, res) => res.json([{ orgId: "demo-org", name: "Demo Org" }]));
export default r;
