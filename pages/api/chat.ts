import type { NextApiRequest, NextApiResponse } from 'next';
import Database from 'better-sqlite3';
import fs from 'fs';
import { getUsableApiConfig } from '../../utils/apiConfig';

export type ChatRequest = {
  sessionId: string;
  message: string;
  personalityId: number;
  department: string;
};

export type ChatResponse = {
  reply: string;
  sessionClosed: boolean;
  transferTo?: string;
};

const dbPath = './data.sqlite';
const db = new Database(dbPath);
const schema = fs.readFileSync('./schema.sql', 'utf8');
db.exec(schema);

export default function handler(req: NextApiRequest, res: NextApiResponse<ChatResponse>) {
  if (req.method !== 'POST') return res.status(405).end();
  const body = req.body as ChatRequest;
  const now = Date.now();
  db.prepare('INSERT OR IGNORE INTO sessions(sessionId,lastMessageAt,closed,personalityId,department) VALUES (?,?,?,?,?)')
    .run(body.sessionId, now, 0, body.personalityId, body.department);
  const row = db.prepare('SELECT closed,lastMessageAt FROM sessions WHERE sessionId=?').get(body.sessionId);
  if (row.closed || now - row.lastMessageAt > 60 * 60 * 1000) {
    db.prepare('UPDATE sessions SET closed=1 WHERE sessionId=?').run(body.sessionId);
    return res.json({ reply: 'به‌دلیل عدم فعالیت، این گفت‌وگو بسته شد. هر زمان نیاز داشتید دوباره پیام دهید! 👋', sessionClosed: true });
  }
  db.prepare('UPDATE sessions SET lastMessageAt=? WHERE sessionId=?').run(now, body.sessionId);

  const cfg = getUsableApiConfig();
  console.log('using provider', cfg.provider);

  const reply = `پاسخ به: ${body.message}`; // placeholder for real AI call
  res.json({ reply, sessionClosed: false });
}
