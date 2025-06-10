drop policy "Enable insert for authenticated users only" on "public"."registrations";

drop policy "Enable read access for all users" on "public"."registrations";

revoke delete on table "public"."registrations" from "anon";

revoke insert on table "public"."registrations" from "anon";

revoke references on table "public"."registrations" from "anon";

revoke select on table "public"."registrations" from "anon";

revoke trigger on table "public"."registrations" from "anon";

revoke truncate on table "public"."registrations" from "anon";

revoke update on table "public"."registrations" from "anon";

revoke delete on table "public"."registrations" from "authenticated";

revoke insert on table "public"."registrations" from "authenticated";

revoke references on table "public"."registrations" from "authenticated";

revoke select on table "public"."registrations" from "authenticated";

revoke trigger on table "public"."registrations" from "authenticated";

revoke truncate on table "public"."registrations" from "authenticated";

revoke update on table "public"."registrations" from "authenticated";

revoke delete on table "public"."registrations" from "service_role";

revoke insert on table "public"."registrations" from "service_role";

revoke references on table "public"."registrations" from "service_role";

revoke select on table "public"."registrations" from "service_role";

revoke trigger on table "public"."registrations" from "service_role";

revoke truncate on table "public"."registrations" from "service_role";

revoke update on table "public"."registrations" from "service_role";

alter table "public"."registrations" drop constraint "registrations_pkey";

drop index if exists "public"."registrations_pkey";

drop table "public"."registrations";

alter table "public"."event_participants" add column "status" boolean not null default false;

create policy "delete data"
on "public"."event_participants"
as permissive
for delete
to public
using (true);



