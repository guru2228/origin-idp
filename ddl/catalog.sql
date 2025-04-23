--
-- Table to store the entity information
-- Name: entity_info; Type: TABLE; Schema: public; Owner: origin_admin
--

CREATE TABLE public.entity_info (
    entity_nm character varying(250) NOT NULL,
    org character varying(100) NOT NULL,
    kind character varying(100) NOT NULL,
    entity_typ character varying(50),
    creat_dttm timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    chg_dttm timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    system character varying(100),
    domain character varying(100),
    ask_id character varying(20),
    sonar_key character varying(250),
    nmspc character varying(100) NOT NULL,
    uuid uuid,
    default_branch character varying(100),
    soft_delete smallint DEFAULT 0,
    module character varying(100),
    owner character varying(100)
);

--
-- PK for entity_info
-- Name: entity_info cmpnt_pk; Type: CONSTRAINT; Schema: public; Owner: origin_admin
--

ALTER TABLE ONLY public.entity_info
    ADD CONSTRAINT cmpnt_pk PRIMARY KEY (entity_nm, kind, nmspc, org);


--
-- Index for domain on entity_info table
-- Name: entity_info_domain; Type: INDEX; Schema: public; Owner: origin_admin
--

CREATE INDEX entity_info_domain ON public.entity_info USING btree (domain);


--
-- Index for entity_typ on entity_info table
-- Name: entity_info_entiy_typ; Type: INDEX; Schema: public; Owner: origin_admin
--

CREATE INDEX entity_info_entiy_typ ON public.entity_info USING btree (entity_typ);


--
-- Index for github_page on entity_info table
-- Name: entity_info_github_page; Type: INDEX; Schema: public; Owner: origin_admin
--

-- CREATE INDEX entity_info_github_page ON public.entity_info USING btree (github_page);


--
-- Index for kind on entity_info table
-- Name: entity_info_kind; Type: INDEX; Schema: public; Owner: origin_admin
--

CREATE INDEX entity_info_kind ON public.entity_info USING btree (kind);


--
-- Index for system on entity_info table
-- Name: entity_info_system; Type: INDEX; Schema: public; Owner: origin_admin
--

CREATE INDEX entity_info_system ON public.entity_info USING btree (system);



--
-- Index for entity_nm on entity_info table
-- Name: entity_kub_info_entity_nm; Type: INDEX; Schema: public; Owner: origin_admin
--

CREATE INDEX entity_info_entity_nm ON public.entity_info USING btree (entity_nm);

--
-- Table to store the entity information for entity in Kubernetes cluster information
-- Name: entity_kub_info; Type: TABLE; Schema: public; Owner: origin_admin
--

CREATE TABLE public.entity_kub_info (
    entity_nm character varying(250) NOT NULL,
    deplymnt_nm character varying(250) NOT NULL,
    env character varying(20) NOT NULL,
    host character varying(1000),
    url_abbrv character varying(1000),
    nmspc character varying(200),
    clstr character varying(100) NOT NULL,
    creat_dttm timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    chg_dttm timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    uuid uuid,
    ingress_error smallint DEFAULT 0,
    namespace character varying(100),
    api_typ character varying(20),
    spec_uri character varying(1000),
    soft_delete smallint,
    is_internal smallint,
    ingress_typ character varying(20),
    api_nm character varying(100),
    image_tag character varying(256),
    image character varying(1000),
    image_cntnr character varying(50),
    kub_env character varying(15),
    org character varying(50) DEFAULT 'optum-ecp'::character varying NOT NULL
);

--
-- PK for entity_kub_info table
-- Name: entity_kub_info kub_pk; Type: CONSTRAINT; Schema: public; Owner: origin_admin
--

ALTER TABLE ONLY public.entity_kub_info
    ADD CONSTRAINT kub_pk PRIMARY KEY (deplymnt_nm, env, clstr, org);

--
-- Index for entity_nm on entity_info table
-- Name: entity_score_info_entity_nm; Type: INDEX; Schema: public; Owner: origin_admin
--

CREATE INDEX entity_kub_info_entity_nm ON public.entity_kub_info USING btree (entity_nm);


--
-- Table to store the dependency information(config-map, secrets) for entity in Kubernetes cluster information
-- Name: entity_kub_dependency_info; Type: TABLE; Schema: public; Owner: origin_admin
--


CREATE TABLE public.entity_kub_dependency_info (
    deplymnt_nm character varying(250) NOT NULL,
    typ character varying(20),
    api_nm character varying(100) NOT NULL,
    api_vrsn character varying(10) NOT NULL,
    host character varying(1000),
    env character varying(20) NOT NULL,
    clstr character varying(100) NOT NULL,
    url character varying(1000),
    uuid uuid,
    creat_dttm timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP(3),
    chg_dttm timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP(3)
);

--
-- PK for entity_kub_dependency_info
-- Name: entity_kub_dependency_info entity_kub_dependency_info_pk; Type: CONSTRAINT; Schema: public; Owner: origin_admin
--

ALTER TABLE ONLY public.entity_kub_dependency_info
    ADD CONSTRAINT entity_kub_dependency_info_pk PRIMARY KEY (deplymnt_nm, api_nm, env, clstr, api_vrsn);


--
-- Table to store the entity owner (CODEOWNERS/.github teams) information
-- Name: entity_owner; Type: TABLE; Schema: public; Owner: origin_admin
--

CREATE TABLE public.entity_owner (
        sub_id uuid,
        entity_nm character varying(250) NOT NULL,
        org character varying(100) NOT NULL,
        owner_typ character varying(20),
        user_id character varying(20) NOT NULL,
        user_ref character varying(20),
        uuid character varying(100)
);

--
-- PK for entity_owner table
-- Name: entity_owner entity_owner_pk; Type: CONSTRAINT; Schema: public; Owner: origin_admin
--

ALTER TABLE ONLY public.entity_owner
    ADD CONSTRAINT entity_owner_pk PRIMARY KEY (user_id, entity_nm, org);

--
-- View to get the deployments in Kubernetes cluster without correlation to direct entity name
-- Name: entity_kub_info_orphan_deployments_view; Type: VIEW; Schema: public; Owner: origin_admin
--

CREATE VIEW public.entity_kub_info_orphan_deployments_view AS
 SELECT DISTINCT entity_kub_info.deplymnt_nm,
    entity_kub_info.org
   FROM public.entity_kub_info
  WHERE (NOT ((entity_kub_info.entity_nm)::text IN ( SELECT entity_info.entity_nm
           FROM public.entity_info)));
