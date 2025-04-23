/*────────────────────────────────────────────────────────────────────────
  12)  TRIGGER helper – auto‑update updated_at columns
────────────────────────────────────────────────────────────────────────*/
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN
        SELECT unnest(ARRAY[
            'application','feature','subscription_plan','plan_feature','pricing',
            'tenant','tool_config','tenant_tool_config','org_tool_config','org_leader',
            'user','workspace','knowledge_base','documents','conversations','ai_tool',
            'clusters'
        ])
    LOOP
        EXECUTE format(
            'CREATE TRIGGER trg_%I_touch
             BEFORE UPDATE ON %I
             FOR EACH ROW
             EXECUTE FUNCTION touch_updated_at();', tbl, tbl);
    END LOOP;
END $$;

/*************************************************************************
 ✅  SCHEMA COMPLETE
*************************************************************************/