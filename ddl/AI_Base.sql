-- 1. Enum type for user intent (customize values as needed)
CREATE TYPE intent_enum AS ENUM (
  'ASK_QUESTION',
  'SUMMARIZE',
  'TRANSLATE',
  'ANALYZE',
  'GENERATE_ACCEPTANCE_CRITERIA',
  'GENERATE_USER_STORY',
  'GENERATE_FEATURE',
  'GENERATE_DESIGN'
  'GENERATE_CODE',
  'GENERATE_ARCH'
  'GENERATE_TEST_PLAN',
  'GENERATE_TEST_DATA',
  'EXECUTE_TEST_PLAN',
  'CUSTOM'
);

-- 2. Main table to record user intents
CREATE TABLE intent (
  intent_id         BIGSERIAL PRIMARY KEY,
  user_id           BIGINT REFERENCES "user" (user_id) ON DELETE SET NULL,
    -- references your users table, e.g.: REFERENCES users(id),
  agent_id          BIGINT REFERENCES sage.agent_catalog (agent_id) ON DELETE SET NULL,
    -- references your agents registry, e.g.: REFERENCES agents(id),
  intent            intent_enum     NOT NULL,
  llm_settings      JSONB           NOT NULL,
    -- e.g. {"model":"gpt-4o-mini","temperature":0.7,"stream":true}
  kb_id             BIGINT REFERENCES knowledge_base (kb_id) ON DELETE SET NULL,
    -- references a knowledge_bases table if you have one
  context           JSONB           NULL,
    -- arbitrary context: e.g. conversation history, metadata, etc.
  created_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);


-- 4. Indexes for faster lookups
CREATE INDEX idx_intent_user
  ON intent(user_id);

CREATE INDEX idx_intent_intent
  ON intent(intent_id);

CREATE INDEX idx_intent_created
  ON intent(created_at);


/*────────────────────────────────────────────────────────────────────────
  9)  KNOWLEDGE BASES  (independent of documents)
────────────────────────────────────────────────────────────────────────*/
CREATE TABLE knowledge_base (
    kb_id         BIGSERIAL PRIMARY KEY,
    workspace_id  BIGINT NOT NULL REFERENCES workspace (workspace_id) ON DELETE CASCADE,
    title         TEXT NOT NULL,
    description   TEXT,
    content       TEXT,
    metadata      JSONB,
    tags          TEXT[],
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_kb_ws ON knowledge_base (workspace_id);

/*────────────────────────────────────────────────────────────────────────
  10)  DOCUMENTS & EMBEDDINGS  (one KB → many docs)
────────────────────────────────────────────────────────────────────────*/
CREATE TABLE documents (
    document_id        BIGSERIAL PRIMARY KEY,
    knowledge_base_id  BIGINT NOT NULL REFERENCES knowledge_base (kb_id) ON DELETE CASCADE,
    workspace_id       BIGINT NOT NULL REFERENCES workspace (workspace_id) ON DELETE CASCADE,
    document_name      TEXT NOT NULL,
    rag_status         rag_status_enum NOT NULL DEFAULT 'PENDING',
    error_message      TEXT,
    upload_time        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed_at       TIMESTAMPTZ,
    storage_uri        TEXT,
    mime_type          TEXT,
    byte_size          BIGINT,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_documents_kb ON documents (knowledge_base_id);
CREATE INDEX idx_documents_ws_status ON documents (workspace_id, rag_status);

/* Embeddings */
CREATE TABLE document_embeddings (
    embedding_id  BIGSERIAL PRIMARY KEY,
    document_id   BIGINT NOT NULL REFERENCES documents (document_id) ON DELETE CASCADE,
    chunk_index   INT    NOT NULL,
    content_chunk TEXT   NOT NULL,
    metadata      JSONB  NOT NULL,
    embedding     VECTOR(1536) NOT NULL,
    cluster_id    BIGINT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ivfflat_docemb_cosine
          ON document_embeddings USING ivfflat (embedding vector_cosine_ops);

/* Clusters */
CREATE TABLE clusters (
    cluster_id    BIGSERIAL PRIMARY KEY,
    workspace_id  BIGINT NOT NULL REFERENCES workspace (workspace_id) ON DELETE CASCADE,
    cluster_label TEXT,
    centroid      VECTOR(1536),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_clusters_ws ON clusters (workspace_id);

ALTER TABLE document_embeddings
    ADD CONSTRAINT fk_cluster
        FOREIGN KEY (cluster_id) REFERENCES clusters (cluster_id) ON DELETE SET NULL;

CREATE TABLE cluster_assignments (
    cluster_id   BIGINT NOT NULL REFERENCES clusters (cluster_id)           ON DELETE CASCADE,
    embedding_id BIGINT NOT NULL REFERENCES document_embeddings (embedding_id) ON DELETE CASCADE,
    PRIMARY KEY (cluster_id, embedding_id)
);

/*────────────────────────────────────────────────────────────────────────
  11)  AGENT TOOLS & CONVERSATIONS
────────────────────────────────────────────────────────────────────────*/
CREATE TABLE ai_tool (
    ai_tool_id    BIGSERIAL PRIMARY KEY,
    workspace_id  BIGINT NOT NULL REFERENCES workspace (workspace_id) ON DELETE CASCADE,
    tool_name     TEXT NOT NULL,
    description   TEXT,
    config_json   JSONB,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (workspace_id, tool_name)
);

CREATE TABLE conversations (
    conversation_id      BIGSERIAL PRIMARY KEY,

    workspace_id         BIGINT NOT NULL REFERENCES workspace (workspace_id) ON DELETE CASCADE,
    created_by_user_id   BIGINT REFERENCES "user" (user_id) ON DELETE SET NULL,
    root_conversation_id BIGINT REFERENCES conversations (conversation_id) ON DELETE SET NULL,
    title                TEXT,
    status               conv_status_enum NOT NULL DEFAULT 'active',
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_conv_ws   ON conversations (workspace_id);
CREATE INDEX idx_conv_root ON conversations (root_conversation_id);

CREATE TABLE conversation_participants (
    conversation_id BIGINT NOT NULL REFERENCES conversations (conversation_id) ON DELETE CASCADE,
    user_id         BIGINT NOT NULL REFERENCES "user" (user_id)               ON DELETE CASCADE,
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE messages (
    message_id        BIGSERIAL PRIMARY KEY,
    conversation_id   BIGINT NOT NULL REFERENCES conversations (conversation_id) ON DELETE CASCADE,
    user_id           BIGINT REFERENCES "user" (user_id) ON DELETE SET NULL,
    message_type      message_type_enum NOT NULL,
    content           TEXT NOT NULL,
    parent_message_id BIGINT REFERENCES messages (message_id) ON DELETE SET NULL,
    ai_tool_id        BIGINT REFERENCES ai_tool (ai_tool_id) ON DELETE SET NULL,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_msg_conv   ON messages (conversation_id);
CREATE INDEX idx_msg_parent ON messages (parent_message_id);

CREATE TABLE agent_response (
    agent_response_id  BIGSERIAL PRIMARY KEY,
    message_id       BIGINT NOT NULL REFERENCES messages (message_id) ON DELETE CASCADE,
    model_name       TEXT NOT NULL,
    total_tokens     INT,
    prompt_tokens    INT,
    completion_tokens INT,
    temperature      NUMERIC(4,3),
    top_p            NUMERIC(4,3),
    raw_prompt       TEXT,
    raw_response     TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE message_kb_references (
    message_id BIGINT NOT NULL REFERENCES messages (message_id)      ON DELETE CASCADE,
    kb_id      BIGINT NOT NULL REFERENCES knowledge_base (kb_id)     ON DELETE CASCADE,
    relevance_score NUMERIC(5,2),
    PRIMARY KEY (message_id, kb_id)
);


