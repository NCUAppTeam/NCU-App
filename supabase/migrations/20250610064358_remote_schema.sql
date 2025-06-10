drop policy "Enable insert for authenticated users only" on "public"."chatroom_members";

drop policy "Enable read access for all users" on "public"."chatroom_members";

drop policy "Enable update for authenticated users " on "public"."chatroom_members";

revoke delete on table "public"."chatroom_members" from "anon";

revoke insert on table "public"."chatroom_members" from "anon";

revoke references on table "public"."chatroom_members" from "anon";

revoke select on table "public"."chatroom_members" from "anon";

revoke trigger on table "public"."chatroom_members" from "anon";

revoke truncate on table "public"."chatroom_members" from "anon";

revoke update on table "public"."chatroom_members" from "anon";

revoke delete on table "public"."chatroom_members" from "authenticated";

revoke insert on table "public"."chatroom_members" from "authenticated";

revoke references on table "public"."chatroom_members" from "authenticated";

revoke select on table "public"."chatroom_members" from "authenticated";

revoke trigger on table "public"."chatroom_members" from "authenticated";

revoke truncate on table "public"."chatroom_members" from "authenticated";

revoke update on table "public"."chatroom_members" from "authenticated";

revoke delete on table "public"."chatroom_members" from "service_role";

revoke insert on table "public"."chatroom_members" from "service_role";

revoke references on table "public"."chatroom_members" from "service_role";

revoke select on table "public"."chatroom_members" from "service_role";

revoke trigger on table "public"."chatroom_members" from "service_role";

revoke truncate on table "public"."chatroom_members" from "service_role";

revoke update on table "public"."chatroom_members" from "service_role";

alter table "public"."chatroom_members" drop constraint "chatroom_members_room_id_fkey";

alter table "public"."chatroom_members" drop constraint "chatroom_members_user_id_fkey";

alter table "public"."chatrooms" drop constraint "chatrooms_created_by_fkey";

alter table "public"."chatroom_members" drop constraint "chatroom_members_pkey";

drop index if exists "public"."chatroom_members_pkey";

drop table "public"."chatroom_members";

alter table "public"."chatrooms" drop column "created_at";

alter table "public"."chatrooms" drop column "created_by";

alter table "public"."chatrooms" drop column "name";

alter table "public"."chatrooms" add column "chat" character varying;

alter table "public"."chatrooms" add column "chat_created" timestamp with time zone default now();

alter table "public"."chatrooms" add column "user_id" uuid not null;

alter table "public"."chatrooms" add constraint "chatrooms_user_id_fkey" FOREIGN KEY (user_id) REFERENCES members(uuid) not valid;

alter table "public"."chatrooms" validate constraint "chatrooms_user_id_fkey";


