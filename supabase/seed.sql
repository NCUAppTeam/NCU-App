SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'deb1ed76-8824-41db-b828-41df13f8ab00', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"ncuapp@test.com","user_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","user_phone":""}}', '2024-10-02 10:35:35.562773+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed403553-8154-4688-8502-daea6f1ca73c', '{"action":"login","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-02 10:36:09.936352+00', ''),
	('00000000-0000-0000-0000-000000000000', '95d16bac-bd07-4916-aebb-6a5625dab9f6', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-10-02 11:50:58.301333+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cdb2a32e-8c07-4330-b919-58353546b459', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-10-02 11:50:58.301792+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b280f568-e5b8-48a8-b0e7-14df55570569', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-10-02 13:03:21.672306+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e7d43fe-397b-4d1a-9342-0757d889bfff', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-10-02 13:03:21.672995+00', ''),
	('00000000-0000-0000-0000-000000000000', '29566b6d-cb57-4800-96cd-694d89718dc3', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-10-02 14:03:23.417122+00', ''),
	('00000000-0000-0000-0000-000000000000', '8af4ff22-3ef3-460a-b4f4-79ad58377be4', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-10-02 14:03:23.417642+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a58c98ac-8669-4626-a9ba-5c1fd7044f50', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-10-02 15:03:38.959391+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c8ca0a1d-6ead-4b58-94a9-db845a2bd529', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-10-02 15:03:38.960108+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a429f97-071a-4d76-95e1-6f1d3f20f8c1', '{"action":"logout","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account"}', '2024-10-02 15:56:28.490475+00', ''),
	('00000000-0000-0000-0000-000000000000', '72696d50-841d-462f-97d1-b776c12af0a3', '{"action":"login","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-02 16:09:29.251602+00', ''),
	('00000000-0000-0000-0000-000000000000', '1265bb43-f5c7-4c1a-93c6-fce33fe5f1c1', '{"action":"login","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-02 16:15:37.46596+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec161169-c89e-4b05-b901-67ee71294a17', '{"action":"logout","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account"}', '2024-10-02 16:19:38.156323+00', ''),
	('00000000-0000-0000-0000-000000000000', '22bd8fc1-ee1f-4209-a3ea-0ece49776bd7', '{"action":"login","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-02 16:41:03.776042+00', ''),
	('00000000-0000-0000-0000-000000000000', '6582ebf9-2681-4279-b240-6372ea52b165', '{"action":"logout","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account"}', '2024-10-02 16:41:17.933011+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b22254f7-aad1-4323-8015-a2faa18fec0e', '{"action":"login","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-02 16:46:25.927847+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a9594d72-c937-46cc-bd8a-1e2aee05a476', '{"action":"logout","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account"}', '2024-10-02 16:46:32.72011+00', ''),
	('00000000-0000-0000-0000-000000000000', '21974e0b-1b76-4f17-8f50-d6a1b7b3a8b2', '{"action":"login","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-02 16:48:05.392616+00', ''),
	('00000000-0000-0000-0000-000000000000', 'adf3345c-0207-4bd4-95ed-936f5944ad6c', '{"action":"logout","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account"}', '2024-10-02 16:48:08.153584+00', ''),
	('00000000-0000-0000-0000-000000000000', '699045ab-841f-4766-a53b-1dd0fe9042e8', '{"action":"login","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-02 16:48:17.708698+00', ''),
	('00000000-0000-0000-0000-000000000000', '51b875b1-286f-44f2-b0ce-aba59c4beb21', '{"action":"logout","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account"}', '2024-10-02 16:49:39.293615+00', ''),
	('00000000-0000-0000-0000-000000000000', 'caf5cd81-f73a-4762-b1ca-94586f8730c5', '{"action":"login","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-12-13 02:47:25.49333+00', ''),
	('00000000-0000-0000-0000-000000000000', '2016657b-4da0-44a0-9cd4-89b927559864', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-12-13 03:59:18.772208+00', ''),
	('00000000-0000-0000-0000-000000000000', '9e126110-cefc-4918-8dcf-7c580eb6276c', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-12-13 03:59:18.772512+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dff1f7f9-0016-4695-aea8-5bf00f7e811d', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-12-13 05:15:36.225039+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f4298a8e-fd3a-498f-96ff-3feb464ca4d2', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-12-13 05:15:36.225313+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f25f7841-6acf-4680-aec7-b0766d571ade', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-12-13 13:41:56.492579+00', ''),
	('00000000-0000-0000-0000-000000000000', '9192aafa-0021-4c44-9003-cded4d481df0', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-12-13 13:41:56.49313+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d81a1b2-7361-43e6-8bec-b34c8725d32d', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-12-16 07:30:34.04478+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d1db0e8-ee88-473f-8de4-127d33e16bce', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2024-12-16 07:30:34.045217+00', ''),
	('00000000-0000-0000-0000-000000000000', '9976064b-b46e-4fab-a062-59fce858b6d1', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-20 17:01:10.138583+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e65e19cf-c3c9-4790-9ba7-45adfa335abb', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-20 17:01:10.139115+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fdfd1fb9-8bc8-4ac0-b65b-369efdd7826d', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-20 18:01:01.511522+00', ''),
	('00000000-0000-0000-0000-000000000000', '786737a0-f463-4dcc-a336-3986c50088c0', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-20 18:01:01.512484+00', ''),
	('00000000-0000-0000-0000-000000000000', '58f44c25-277b-4d85-ab57-efb937c07bee', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-20 19:02:57.263568+00', ''),
	('00000000-0000-0000-0000-000000000000', 'baceacf9-e1c9-426d-959e-f0a62d5e50a7', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-20 19:02:57.26426+00', ''),
	('00000000-0000-0000-0000-000000000000', '87524c7d-3e46-4154-9a29-e642acbcd3e0', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-20 20:09:44.816094+00', ''),
	('00000000-0000-0000-0000-000000000000', '0156b0e0-bea4-4196-885a-64f9e462c4ad', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-20 20:09:44.816531+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3002a18-d50f-4237-bcdb-d1675ce4f969', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-21 15:52:22.33102+00', ''),
	('00000000-0000-0000-0000-000000000000', '7a0312c9-970f-4412-b5e8-7b6b651f7f07', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-21 15:52:22.332423+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a5b717fc-548e-4080-80b3-e3e731ca0878', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-21 17:15:33.290875+00', ''),
	('00000000-0000-0000-0000-000000000000', '28c2a1c6-8014-4fff-a70c-b5564faf0cc3', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-21 17:15:33.291399+00', ''),
	('00000000-0000-0000-0000-000000000000', '64b73d59-79d3-456d-a7e7-6ee51fd9bde4', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-22 08:40:07.720416+00', ''),
	('00000000-0000-0000-0000-000000000000', '97b88527-dca1-43ed-99da-0f73547561b6', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-22 08:40:07.722009+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bc6c5d1b-4355-4f09-b0cf-f1c765c0a1e1', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-22 10:28:35.243232+00', ''),
	('00000000-0000-0000-0000-000000000000', '59588882-cf68-4fe2-9553-2b27cdfa43e8', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-22 10:28:35.243851+00', ''),
	('00000000-0000-0000-0000-000000000000', '6fe9d93d-df74-4ca5-aae8-7618b451ea22', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-22 12:57:29.778001+00', ''),
	('00000000-0000-0000-0000-000000000000', '4040fb34-5364-4095-86e3-99b9ba334111', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-22 12:57:29.778319+00', ''),
	('00000000-0000-0000-0000-000000000000', '5f805365-f100-48fd-8b7d-3fec50e92046', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-22 15:56:38.583004+00', ''),
	('00000000-0000-0000-0000-000000000000', '23881ef0-2a11-48cf-b8da-70fa7de1e059', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-22 15:56:38.583418+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3dc1061-5de3-4a32-85ad-98e2e7912358', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-22 17:06:25.621138+00', ''),
	('00000000-0000-0000-0000-000000000000', '2acf5201-86d4-4f24-967c-a34ab8312270', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-01-22 17:06:25.621531+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd17d3001-d315-4ab1-8cd8-9686ef1d4475', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-03-04 10:20:38.325635+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ec4fe50-a79a-45f1-a123-f15d657ddfc5', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-03-04 10:20:38.327954+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd22e0a44-a38c-4ae4-802e-6d5535fe2008', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-03-04 11:49:09.475674+00', ''),
	('00000000-0000-0000-0000-000000000000', '2705e58d-7a4f-4000-b7c0-f4ebcf0c39fd', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-03-04 11:49:09.476384+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c1fefc2-1b90-438b-89fe-d09eff8da5b4', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-03-04 12:51:33.346704+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd79502cc-e29e-4edb-864c-f5f590ffeacd', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-03-04 12:51:33.346918+00', ''),
	('00000000-0000-0000-0000-000000000000', '88c56aa8-4275-46ef-998a-32c61dbc326a', '{"action":"token_refreshed","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-03-04 13:56:04.679634+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de680fea-eef9-401a-ba84-b44eb6691e4b', '{"action":"token_revoked","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"token"}', '2025-03-04 13:56:04.6803+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'c7e80cb0-7d3d-411f-9983-5e3addf62980', 'authenticated', 'authenticated', 'ncuapp@test.com', '$2a$10$Y3OTXkqoLAgYrjGpEeMKLOuMnrYWwvLTRdqXwgRO9npX50TD8Ku32', '2024-10-02 10:35:35.563744+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-12-13 02:47:25.493957+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-10-02 10:35:35.560964+00', '2025-03-04 13:56:04.681952+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('c7e80cb0-7d3d-411f-9983-5e3addf62980', 'c7e80cb0-7d3d-411f-9983-5e3addf62980', '{"sub": "c7e80cb0-7d3d-411f-9983-5e3addf62980", "email": "ncuapp@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-10-02 10:35:35.562128+00', '2024-10-02 10:35:35.562151+00', '2024-10-02 10:35:35.562151+00', 'e9c1a1d6-f840-4461-8694-30e39456b383');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: event_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."event_type" ("type_id", "type_name", "hashtag_relation") VALUES
	(1, '揪人共乘', '{0}'),
	(2, '揪人運動', '{0}'),
	(3, '揪人遊戲', '{0}'),
	(10, '#打桌球', '{2}'),
	(9, '#打羽球', '{2}'),
	(4, '揪人讀書', '{0}');


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."events" ("id", "name", "description", "start_time", "end_time", "fee", "created_at", "user_id", "type", "location") VALUES
	(1, 'ncu app recruiting', '', NULL, NULL, 0, '2024-10-02 10:38:22+00', 'c7e80cb0-7d3d-411f-9983-5e3addf62980', 4, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."identities" ("identity_no", "identity_name") VALUES
	(2, 'Student'),
	(3, 'Alumni'),
	(4, 'School'),
	(5, 'Others'),
	(1, 'Dev Team');


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."members" ("uuid", "created_at", "name", "fk_email", "fk_identity", "grad_time", "avatar") VALUES
	('c7e80cb0-7d3d-411f-9983-5e3addf62980', '2024-10-02 10:35:46+00', 'NCU APP', 'ncuapp@test.com', 1, NULL, 'http://127.0.0.1:54321/storage/v1/object/public/avatar/logo.png?t=2024-10-02T15%3A39%3A22.509Z');


--
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('avatar', 'avatar', NULL, '2024-10-02 15:39:08.478744+00', '2024-10-02 15:39:08.478744+00', true, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('b452bfa8-6013-446a-a36f-8676914257c0', 'avatar', 'logo.png', NULL, '2024-10-02 15:39:19.235608+00', '2024-10-02 15:39:19.235608+00', '2024-10-02 15:39:19.235608+00', '{"eTag": "\"947cacbec2759960b0e6e5895e6d2d04\"", "size": 16858, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-10-02T15:39:19.226Z", "contentLength": 16858, "httpStatusCode": 200}', '89fd52da-ab3d-404c-bda5-e7233eb377f8', NULL, NULL),
	('e829e905-0433-47f2-a115-c420d2bfa770', 'avatar', 'defaultAvatar.webp', NULL, '2024-10-02 15:40:25.009052+00', '2024-10-02 15:40:25.009052+00', '2024-10-02 15:40:25.009052+00', '{"eTag": "\"0474dad9eb2752e87c90f18fa9529d93\"", "size": 18124, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2024-10-02T15:40:25.005Z", "contentLength": 18124, "httpStatusCode": 200}', '8bebcc3d-4557-4d18-aa78-3f6f71a8eb31', NULL, NULL);


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 31, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: event_type_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."event_type_type_id_seq"', 1, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."events_id_seq"', 1, false);


--
-- Name: identities_identity_no_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."identities_identity_no_seq"', 1, false);


--
-- Name: sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."sales_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
