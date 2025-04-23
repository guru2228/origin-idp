

/* =============================================================
   ORIGIN – AI Internal Developer Platform
   PostgreSQL 14+  ▸  FULL SCHEMA  (v3 – audit columns)
   ============================================================= */

/* ---------- 1. ENUM TYPES ----------------------------------- */

CREATE TYPE role_enum AS ENUM (
  'PLATFORM_ADMIN',
  'TENANT_ADMIN',
  'ORG_LEADER',
  'WS_OWNER',
  'WS_CONTRIBUTOR',
  'WS_VIEWER'
);

CREATE TYPE tenant_type_enum        AS ENUM ('IND', 'ORG');
CREATE TYPE payment_method_enum     AS ENUM ('CREDIT_CARD', 'REDEEM_CODE');
CREATE TYPE sso_provider_enum       AS ENUM ('SAML', 'OAUTH');
CREATE TYPE tool_type_enum          AS ENUM ('SCM', 'PM', 'QM', 'IM', 'OTHER');
CREATE TYPE auth_event_type_enum    AS ENUM ('LOGIN', 'LOGOUT');

/* ---------- 3. MASTER CATALOGS ----------------------------- */

/* 3.1 Applications */
CREATE TABLE application (
  application_id        BIGSERIAL PRIMARY KEY ,
  application_name      TEXT  NOT NULL UNIQUE,
  application_description TEXT,
  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/* 3.2 Features */
CREATE TABLE feature (
  feature_id      BIGSERIAL PRIMARY KEY,
  application_id  BIGINT NOT NULL
                 REFERENCES application(application_id) ON DELETE CASCADE,
  feature_name    TEXT NOT NULL,
  feature_description TEXT,

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (application_id, feature_name)
);

/* 3.3 Subscription Plan */
CREATE TABLE subscription_plan (
  subscription_plan_id BIGSERIAL PRIMARY KEY,
  plan_code            subscription_plan_enum NOT NULL UNIQUE,
  plan_description     TEXT,

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/* 3.4 Plan‑Feature mapping (flattened) */
CREATE TABLE plan_feature (
  plan_feature_id       BIGSERIAL PRIMARY KEY,
  subscription_plan_id  BIGINT NOT NULL
      REFERENCES subscription_plan(subscription_plan_id) ON DELETE CASCADE,
  application_id        BIGINT NOT NULL
      REFERENCES application(application_id) ON DELETE CASCADE,
  feature_id            BIGINT NOT NULL
      REFERENCES feature(feature_id) ON DELETE CASCADE,
  feature_limit         TEXT,

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (subscription_plan_id, feature_id)
);

/* optional historic pricing */
CREATE TABLE pricing (
  pricing_id            BIGSERIAL PRIMARY KEY,
  subscription_plan_id  BIGINT NOT NULL
      REFERENCES subscription_plan(subscription_plan_id) ON DELETE CASCADE,
  base_cost             NUMERIC(12,2) NOT NULL DEFAULT 0,
  unit_cost             NUMERIC(12,2),
  currency              CHAR(3)   NOT NULL DEFAULT 'USD',
  effective_start_date  DATE      NOT NULL,
  effective_end_date    DATE,

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_pricing_dates
    CHECK (effective_end_date IS NULL OR effective_end_date > effective_start_date)
);


/* ---------- 9. TOOL CONFIGURATION -------------------------- */

/* master templates */
CREATE TABLE tool_config (
  tool_config_id     BIGSERIAL PRIMARY KEY,
  tool_type          tool_type_enum NOT NULL,
  tool_name          TEXT           NOT NULL,
  template_details   JSONB          NOT NULL,

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (tool_type, tool_name)
);


/* ---------- 2. TENANT -------------------------------------- */

CREATE TABLE tenant (
  tenant_id        BIGSERIAL      PRIMARY KEY,
  tenant_name      TEXT           NOT NULL,
  tenant_type      tenant_type_enum NOT NULL,
  org_cd           TEXT,
  admin_ad_group   TEXT,
  status           TEXT           NOT NULL DEFAULT 'ACTIVE',
  created_by       BIGINT,
  updated_by       BIGINT,
  created_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_tenant_adgroup
    CHECK (
      (tenant_type='Organization' AND admin_ad_group IS NOT NULL AND org_cd IS NOT NULL)
      OR tenant_type='Individual'
    )
);


/* ---------- 4. SUBSCRIPTION (1:1 with TENANT) -------------- */

CREATE TABLE subscription (
  subscription_id      BIGSERIAL PRIMARY KEY,
  tenant_id            BIGINT NOT NULL UNIQUE
                        REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  subscription_plan_id BIGINT NOT NULL
                        REFERENCES subscription_plan(subscription_plan_id),
  start_date           DATE   NOT NULL DEFAULT CURRENT_DATE,
  end_date             DATE,
  is_active            BOOLEAN NOT NULL DEFAULT TRUE,
  payment_method       payment_method_enum NOT NULL,
  payment_details      JSONB  NOT NULL DEFAULT '{}',

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/* ---------- 5. Tenant‑selected Feature Toggles ------------- */

CREATE TABLE subscription_feature (
  subscription_feature_id BIGSERIAL PRIMARY KEY,
  subscription_id   BIGINT NOT NULL
                      REFERENCES subscription(subscription_id) ON DELETE CASCADE,
  feature_id        BIGINT NOT NULL
                      REFERENCES feature(feature_id)     ON DELETE CASCADE,
  is_enabled        BOOLEAN NOT NULL DEFAULT TRUE,

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (subscription_id, feature_id)
);

/* tenant‑specific configs */
CREATE TABLE tenant_tool_config (
  tenant_tool_config_id BIGSERIAL PRIMARY KEY,
  tenant_id     BIGINT NOT NULL REFERENCES tenant(tenant_id)     ON DELETE CASCADE,
  tool_config_id BIGINT NOT NULL REFERENCES tool_config(tool_config_id) ON DELETE CASCADE,
  config_details JSONB  NOT NULL,

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (tenant_id, tool_config_id)
);

/* tenant‑specific configs */
CREATE TABLE org_tool_config (
  org_tool_config_id BIGSERIAL PRIMARY KEY,
  org_cd      TEXT NOT NULL,
  tool_config_id BIGINT NOT NULL REFERENCES tool_config(tool_config_id) ON DELETE CASCADE,
  config_details JSONB  NOT NULL,

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (org_cd, tool_config_id)
);

/* ---------- 7. WORKSPACES & MEMBERS ------------------------ */

CREATE TABLE workspace (
  workspace_id BIGSERIAL PRIMARY KEY,
  tenant_id    BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  name         TEXT   NOT NULL,
  meta_data    JSONB  NOT NULL,
  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (tenant_id, name)
);


/* ---------- 6. USERS & ROLES ------------------------------- */

CREATE TABLE "user" (
  user_id          BIGSERIAL PRIMARY KEY,
  tenant_id        BIGINT REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  username         TEXT   NOT NULL UNIQUE,
  email            TEXT   NOT NULL UNIQUE,
  f_name           TEXT   NOT NULL,
  l_name           TEXT   NOT NULL,
  display_name     TEXT,
  platform_role    role_enum,
  status           TEXT   NOT NULL DEFAULT 'ACTIVE',

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_platform_role_only_admin
    CHECK (platform_role IS NULL OR platform_role = 'PLATFORM_ADMIN')
);

/* ---------- 11. ORG CONFIG & LEADERS ----------------------- */


CREATE TABLE org_leader (
  org_leader_id   BIGSERIAL PRIMARY KEY,
  tenant_id       BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  org_cd          TEXT NOT NULL,
  level           SMALLINT NOT NULL CHECK (level BETWEEN 1 AND 6),
  user_id         BIGINT REFERENCES "user"(user_id) ON DELETE SET NULL,
  leader_name     TEXT NOT NULL,
  leader_email    TEXT,
  title           TEXT,

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

);
/* tenant‑scoped roles */
CREATE TABLE user_tenant_role (
  user_tenant_role_id BIGSERIAL PRIMARY KEY,
  user_id    BIGINT NOT NULL REFERENCES "user"(user_id)   ON DELETE CASCADE,
  tenant_id  BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  role       role_enum NOT NULL CHECK (role IN ('TENANT_ADMIN','ORG_LEADER')),

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (user_id, tenant_id, role)
);

CREATE TABLE user_workspace (
  user_id      BIGINT NOT NULL REFERENCES "user"(user_id)      ON DELETE CASCADE,
  workspace_id BIGINT NOT NULL REFERENCES workspace(workspace_id) ON DELETE CASCADE,
  role         role_enum NOT NULL CHECK (role IN ('WS_OWNER','WS_CONTRIBUTOR','WS_VIEWER')),

  created_by  BIGINT,
  updated_by  BIGINT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (user_id, workspace_id)
);



/* ---------- 8. USAGE METRICS ------------------------------- */

CREATE TABLE usage (
  usage_id        BIGSERIAL PRIMARY KEY,
  subscription_id BIGINT NOT NULL REFERENCES subscription(subscription_id) ON DELETE CASCADE,
  workspace_id    BIGINT REFERENCES workspace(workspace_id) ON DELETE SET NULL,
  user_id         BIGINT REFERENCES "user"(user_id)         ON DELETE SET NULL,
  feature_name    TEXT   NOT NULL,
  usage_value     NUMERIC(18,2) NOT NULL DEFAULT 0,
  recorded_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

  created_by  BIGINT,
  updated_by  BIGINT,

  CHECK (workspace_id IS NOT NULL OR user_id IS NOT NULL)
);


/* ---------- 10. AUTH EVENTS (insert‑only) ------------------ */

CREATE TABLE user_auth_event (
  auth_event_id BIGSERIAL PRIMARY KEY,
  user_id       BIGINT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
  tenant_id     BIGINT REFERENCES tenant(tenant_id) ON DELETE SET NULL,
  role          role_enum NOT NULL,
  event_type    auth_event_type_enum NOT NULL,
  event_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id    TEXT,
  ip_address    INET,

  created_by  BIGINT,
  updated_by  BIGINT
);



/* ============================================================
   END OF SCHEMA (v3)
   ============================================================ */
