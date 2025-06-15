import type { NextApiRequest, NextApiResponse } from 'next';
import Database from 'better-sqlite3';

const db = new Database('./data.sqlite');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { sessionId, department } = req.body as { sessionId: string; department: string };
  db.prepare('UPDATE sessions SET department=? WHERE sessionId=?').run(department, sessionId);
  res.status(200).json({ ok: true });
}
