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
	('00000000-0000-0000-0000-000000000000', 'e5a4fb59-cf52-4c99-a050-a845953bf219', '{"action":"login","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-06 08:15:39.486378+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e7c8b69-0ea7-4e67-a0a8-697452b590ff', '{"action":"logout","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account"}', '2025-05-06 08:15:39.569334+00', ''),
	('00000000-0000-0000-0000-000000000000', '4fc32859-47c2-4061-8b90-f67e3322329c', '{"action":"login","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-06 08:16:04.655976+00', ''),
	('00000000-0000-0000-0000-000000000000', '3caaa1f5-f652-4834-9f66-0b9c406fcc4b', '{"action":"logout","actor_id":"c7e80cb0-7d3d-411f-9983-5e3addf62980","actor_username":"ncuapp@test.com","actor_via_sso":false,"log_type":"account"}', '2025-05-06 08:16:04.832161+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'c7e80cb0-7d3d-411f-9983-5e3addf62980', 'authenticated', 'authenticated', 'ncuapp@test.com', '$2a$10$Y3OTXkqoLAgYrjGpEeMKLOuMnrYWwvLTRdqXwgRO9npX50TD8Ku32', '2024-10-02 10:35:35.563744+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-05-13 10:21:19.610029+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-10-02 10:35:35.560964+00', '2025-05-13 10:21:19.61155+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


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
	(4, '揪人讀書', '{0}'),
	(11, '回學校', '{1}'),
	(14, '新手局', '{2,3}'),
	(15, '求大神帶飛', '{2,3,4}'),
	(16, '假日共乘', '{1}'),
	(9, '羽球咖', '{2}'),
	(20, '考研', '{4}'),
	(21, '段考', '{4}'),
	(22, '運動日常', '{2}'),
	(23, '燃燒我的卡路里', '{2}'),
	(25, '馬甲線養成計畫', '{2}'),
	(26, '組隊開玩', '{3}'),
	(27, '手殘黨求帶飛', '{3}'),
	(28, '遊戲就是要人多才好玩', '{3}'),
	(29, '通宵局', '{3}'),
	(5, '其他揪人', '{0}'),
	(31, '長跑夥伴', '{2}'),
	(32, '約唱KTV', '{3}'),
	(33, '線上讀書會', '{4}'),
	(30, '實體讀書會', '{4}'),
	(17, '固定共乘', '{1}'),
	(34, '桌遊', '{3}'),
	(35, '湊數省錢', '{1,2,3}'),
	(39, '探店', '{5}'),
	(40, '吃飯', '{5}'),
	(36, 'English Café', '{5}'),
	(42, '社團活動', '{5}'),
	(43, '面試互助', '{4}'),
	(18, '認識朋友', '{1,2,3,4,5}'),
	(13, 'Boys Only', '{1,2,3,4,5}'),
	(12, 'Girls Only', '{1,2,3,4,5}'),
	(37, '會自行篩人', '{1,2,3,4,5}'),
	(38, '按加入順序選人', '{1,2,3,4,5}'),
	(19, '輪流上場', '{2,3}'),
	(10, '桌球咖', '{2}'),
	(8, '急徵', '{1,2,3,4,5}');


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."events" ("id", "name", "description", "start_time", "end_time", "fee", "created_at", "owner_id", "type", "img", "apply_due", "custom_hashtag", "destination", "externalLink", "hashtag", "meeting_point") VALUES
	(1, 'NCU APP 程式開發組招募', NULL, '2025-05-09 09:03:32+00', NULL, 0, '2024-10-02 10:38:22+00', 'c7e80cb0-7d3d-411f-9983-5e3addf62980', 5, NULL, '2025-05-15 06:31:19+00', NULL, NULL, NULL, NULL, '工程五館A205教室');

--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."members" ("uuid", "created_at", "name", "identity", "grad_time", "avatar", "bio", "department", "email", "grade", "phone", "profileBackground", "studentId", "username", "point", "gender") VALUES
	('c7e80cb0-7d3d-411f-9983-5e3addf62980', '2024-10-02 10:35:46+00', 'NCU APP', 1, NULL, 'http://127.0.0.1:54321/storage/v1/object/public/avatar/logo.png?t=2025-04-27T15%3A28%3A56.405Z', NULL, NULL, 'ncuapp@test.com', NULL, NULL, NULL, NULL, 'ncuapp-devteam', 0, NULL);

--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('b452bfa8-6013-446a-a36f-8676914257c0', 'avatar', 'logo.png', NULL, '2024-10-02 15:39:19.235608+00', '2024-10-02 15:39:19.235608+00', '2024-10-02 15:39:19.235608+00', '{"eTag": "\"947cacbec2759960b0e6e5895e6d2d04\"", "size": 16858, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-10-02T15:39:19.226Z", "contentLength": 16858, "httpStatusCode": 200}', '89fd52da-ab3d-404c-bda5-e7233eb377f8', NULL, NULL),
	('ed6c7962-333b-46c6-b1c6-69b3f30f6119', 'restaurant', '.emptyFolderPlaceholder', NULL, '2025-04-27 15:18:43.211707+00', '2025-04-27 15:18:43.211707+00', '2025-04-27 15:18:43.211707+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2025-04-27T15:18:43.208Z", "contentLength": 0, "httpStatusCode": 200}', 'c4bf6f01-559e-4c41-b62d-8e62fd0a7c86', NULL, '{}');


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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 133, true);


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
