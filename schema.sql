-- Usage stats for token metering
CREATE TABLE IF NOT EXISTS usage_stats (
  configId TEXT NOT NULL,
  date TEXT NOT NULL,
  tokensUsed INTEGER NOT NULL,
  PRIMARY KEY (configId, date)
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  sessionId TEXT PRIMARY KEY,
  lastMessageAt INTEGER,
  closed INTEGER DEFAULT 0,
  personalityId INTEGER,
  department TEXT
);
