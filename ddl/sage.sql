

CREATE table agent_catalog (
  agent_id         BIGSERIAL PRIMARY KEY,
  agent_name       TEXT NOT NULL,
  description      TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_agent_name
  ON agent_catalog(agent_name);