import { Router } from "express";
const r = Router();
r.get("/", (_req, res) => res.json({ ok: true, service: "ttt-mini", ts: Date.now() }));
export default r;
