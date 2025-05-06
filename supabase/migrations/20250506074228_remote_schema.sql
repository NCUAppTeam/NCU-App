drop policy "Enable read access for all users" on "public"."identities";

revoke delete on table "public"."identities" from "anon";

revoke insert on table "public"."identities" from "anon";

revoke references on table "public"."identities" from "anon";

revoke select on table "public"."identities" from "anon";

revoke trigger on table "public"."identities" from "anon";

revoke truncate on table "public"."identities" from "anon";

revoke update on table "public"."identities" from "anon";

revoke delete on table "public"."identities" from "authenticated";

revoke insert on table "public"."identities" from "authenticated";

revoke references on table "public"."identities" from "authenticated";

revoke select on table "public"."identities" from "authenticated";

revoke trigger on table "public"."identities" from "authenticated";

revoke truncate on table "public"."identities" from "authenticated";

revoke update on table "public"."identities" from "authenticated";

revoke delete on table "public"."identities" from "service_role";

revoke insert on table "public"."identities" from "service_role";

revoke references on table "public"."identities" from "service_role";

revoke select on table "public"."identities" from "service_role";

revoke trigger on table "public"."identities" from "service_role";

revoke truncate on table "public"."identities" from "service_role";

revoke update on table "public"."identities" from "service_role";

alter table "public"."identities" drop constraint "identities_pkey";

drop index if exists "public"."identities_pkey";

drop table "public"."identities";

alter table "public"."members" drop column "fk_email";

alter table "public"."members" add column "bio" text;

alter table "public"."members" add column "department" text;

alter table "public"."members" add column "email" text not null;

alter table "public"."members" add column "grade" smallint;

alter table "public"."members" add column "phone" text;

alter table "public"."members" add column "profileBackground" text;

alter table "public"."members" add column "studentId" text;

alter table "public"."members" add column "username" text;

alter table "public"."members" alter column "avatar" drop default;

alter table "public"."members" alter column "avatar" drop not null;

alter table "public"."members" alter column "avatar" set data type text using "avatar"::text;

alter table "public"."members" alter column "identity" set default 2;

CREATE UNIQUE INDEX members_fk_email_key ON public.members USING btree (email);

alter table "public"."members" add constraint "members_fk_email_key" UNIQUE using index "members_fk_email_key";


