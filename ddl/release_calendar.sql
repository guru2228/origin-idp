--
-- Table to store the change ticket information
-- Name: release_info; Type: TABLE; Schema: public; Owner: origin_admin
--

CREATE TABLE public.release_info (
    ch_id character varying(20) NOT NULL,
    ch_category character varying(30),
    status character varying(30),
    requested_by character varying(20),
    request_date timestamp(3) without time zone,
    assigned_to character varying(20),
    assign_dept character varying(100),
    planned_start timestamp(3) without time zone,
    planned_end timestamp(3) without time zone,
    duration integer,
    current_phase character varying(30),
    risk_assessment character varying(25),
    date_entered timestamp(3) without time zone,
    orig_date_entered timestamp(3) without time zone,
    close_time timestamp(3) without time zone,
    brief_description character varying(250),
    description text,
    backout_method text,
    implementationcomments text,
    acceptancecomments text,
    closing_comments text,
    uh_preimplementationplan text,
    uh_owner character varying(20),
    uh_requester_name character varying(100),
    uh_assigned_to_name character varying(100),
    uh_duration character varying(100),
    uh_opened_by character varying(100),
    uh_closed_by_full_name character varying(250),
    uh_owner_name character varying(100),
    cab_approved character varying(30),
    uh_peak_season character varying(1),
    aff_ci_concat text,
    aff_ci_concat_ucmdb text,
    uh_calculated_risk character varying(30),
    change_type character varying(100),
    uh_service_impact character varying(20),
    uh_peak_season_reason text,
    approval_status character varying(30),
    sn_enhanced_risk character varying(30),
    implementation_plan text,
    closed_by character varying(100),
    uh_completion_code text
);


--
-- PK for release_info table
-- Name: release_info release_info_pk; Type: CONSTRAINT; Schema: public; Owner: origin_admin
--

ALTER TABLE ONLY public.release_info
    ADD CONSTRAINT release_info_pk PRIMARY KEY (ch_id);

--
-- Index for approval_status on release_info table
-- Name: release_info_approval_status; Type: INDEX; Schema: public; Owner: origin_admin
--

CREATE INDEX release_info_approval_status ON public.release_info USING btree (approval_status);


--
-- Index for planned_end on release_info table
-- Name: release_info_planned_end; Type: INDEX; Schema: public; Owner: origin_admin
--

CREATE INDEX release_info_planned_end ON public.release_info USING btree (planned_end);


--
-- Index for planned_start on release_info table
-- Name: release_info_planned_start; Type: INDEX; Schema: public; Owner: origin_admin
--

CREATE INDEX release_info_planned_start ON public.release_info USING btree (planned_start);


--
-- Index for resource_uri on release_info table
-- Name: resource_info_resource_uri; Type: INDEX; Schema: public; Owner: origin_admin
--

CREATE INDEX resource_info_resource_uri ON public.resource_info USING btree (resource_uri);

--
-- Table to store the change ticket affected services information
-- Name: release_info_aff_srv; Type: TABLE; Schema: public; Owner: origin_admin
--

CREATE TABLE public.release_info_aff_srv (
    ch_id character varying NOT NULL,
    srv_ucmdb character varying NOT NULL,
    srv_name character varying NOT NULL,
    srv_type character varying,
    srv_subtype character varying,
    srv_discovered character varying,
    srv_peak character varying,
    srv_impacted character varying,
    srv_impact_start timestamp with time zone,
    srv_impact_end timestamp with time zone,
    srv_derived_srv_primary character varying,
    srv_derived_svc_impact_level character varying,
    sn_sys_id character varying
);

--
-- PK for release_info_aff_srv table
-- Name: release_info_aff_srv release_info_aff_srv_pkey; Type: CONSTRAINT; Schema: public; Owner: origin_admin
--

ALTER TABLE ONLY public.release_info_aff_srv
    ADD CONSTRAINT release_info_aff_srv_pkey PRIMARY KEY (ch_id, srv_ucmdb);

--
-- FK for release_info_aff_srv to release_info table
-- Name: release_info_aff_srv fk_release_info_aff_srv_release_info; Type: FK CONSTRAINT; Schema: public; Owner: origin_admin
--

ALTER TABLE ONLY public.release_info_aff_srv
        ADD CONSTRAINT fk_release_info_aff_srv_release_info FOREIGN KEY (ch_id) REFERENCES public.release_info(ch_id);

--
-- Table to store the change ticket approval information
-- Name: release_info_approvals; Type: TABLE; Schema: public; Owner: origin_admin
--

CREATE TABLE public.release_info_approvals (
    ch_id character varying NOT NULL,
    approval_type character varying NOT NULL,
    approval_group character varying NOT NULL,
    state character varying,
    action_taken character varying,
    approver character varying NOT NULL,
    approver_fullname character varying,
    sn_created_on timestamp with time zone,
    sn_created_by character varying,
    sn_updated_on timestamp with time zone,
    sn_updated_by character varying,
    sn_sys_id character varying,
    comments text
);

--
-- PK for release_info_approvals table
-- Name: release_info_approvals release_info_approvals_pkey; Type: CONSTRAINT; Schema: public; Owner: origin_admin
--

ALTER TABLE ONLY public.release_info_approvals
    ADD CONSTRAINT release_info_approvals_pkey PRIMARY KEY (ch_id, approver, approval_group, approval_type);


--
-- FK for release_info_approvals to release_info
-- Name: release_info_approvals fk_release_info_approvals_release_info; Type: FK CONSTRAINT; Schema: public; Owner: origin_admin
--

ALTER TABLE ONLY public.release_info_approvals
      ADD CONSTRAINT fk_release_info_approvals_release_info FOREIGN KEY (ch_id) REFERENCES public.release_info(ch_id);


--
-- Table to store the change ticket to ask id mapping information
-- Name: release_ci_aide_map_info; Type: TABLE; Schema: public; Owner: origin_admin
--

CREATE TABLE public.release_ci_aide_map_info (
    ch_id character varying(20) NOT NULL,
    ci_ref character varying(100) NOT NULL,
    is_effective_ci smallint DEFAULT 1,
    ask_id character varying(50),
    creat_dttm timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    chg_dttm timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);

--
-- PK for release_ci_aide_map_info table
-- Name: release_ci_aide_map_info release_ci_aide_map_info_pkey; Type: CONSTRAINT; Schema: public; Owner: origin_admin
--

ALTER TABLE ONLY public.release_ci_aide_map_info
    ADD CONSTRAINT release_ci_aide_map_info_pkey PRIMARY KEY (ch_id, ci_ref);

--
-- FK for release_ci_aide_map_info to release_info table
-- Name: release_ci_aide_map_info fk_release_ci_aide_map_info_release_info; Type: FK CONSTRAINT; Schema: public; Owner: origin_admin
--

ALTER TABLE ONLY public.release_ci_aide_map_info
    ADD CONSTRAINT fk_release_ci_aide_map_info_release_info FOREIGN KEY (ch_id) REFERENCES public.release_info(ch_id);


--
-- Table to store the milestones to be tracked for releases
-- Name: rally_milestone_info; Type: TABLE; Schema: public; Owner: origin_admin
--

-- CREATE TABLE public.rally_milestone_info (
--         milestone_id character varying NOT NULL,
--         name character varying,
--         target_date date,
--         chg_id character varying,
--         domain character varying NOT NULL,
--         system character varying NOT NULL,
--         description text,
--         creat_dttm timestamp without time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
--         chg_dttm timestamp without time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
--         notes text,
--         brief_status text
--     );

--
-- PK for rally_milestone_info table
-- Name: rally_milestone_info rally_milestone_info_pkey; Type: CONSTRAINT; Schema: public; Owner: origin_admin
--

-- ALTER TABLE ONLY public.rally_milestone_info
--     ADD CONSTRAINT rally_milestone_info_pkey PRIMARY KEY (milestone_id);

--
-- Unique Constraint for rally_milestone_info
-- Name: rally_milestone_info rally_milestone_info_milestone_id_domain_system_key; Type: CONSTRAINT; Schema: public; Owner: origin_admin
--

-- ALTER TABLE ONLY public.rally_milestone_info
--     ADD CONSTRAINT rally_milestone_info_milestone_id_domain_system_key UNIQUE (milestone_id, domain, system);
