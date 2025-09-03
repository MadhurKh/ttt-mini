import { Request, Response, NextFunction } from "express";
export function authStub(req: Request, _res: Response, next: NextFunction) {
  const orgId = (req.header("x-org-id") || "demo-org").toString();
  const role = (req.header("x-role") || "admin").toString();
  (req as any).orgId = orgId;
  (req as any).role = role;
  next();
}
