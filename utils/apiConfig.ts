import configs from '../config.json';
import Database from 'better-sqlite3';

const db = new Database('./data.sqlite');

export type ApiConfig = {
  id: string;
  provider: 'gemini' | 'openai';
  apiKey: string;
  dailyTokenLimit: number;
  fallbackConfigId?: string | null;
};

export function getUsableApiConfig(): ApiConfig {
  const today = new Date().toISOString().slice(0, 10);
  for (const cfg of configs as ApiConfig[]) {
    const stat = db
      .prepare('SELECT tokensUsed FROM usage_stats WHERE configId=? AND date=?')
      .get(cfg.id, today);
    if (!stat || stat.tokensUsed < cfg.dailyTokenLimit) {
      return cfg;
    }
    if (cfg.fallbackConfigId) {
      const fallback = (configs as ApiConfig[]).find((c) => c.id === cfg.fallbackConfigId);
      if (fallback) return fallback;
    }
  }
  throw new Error('All APIs exhausted');
}
