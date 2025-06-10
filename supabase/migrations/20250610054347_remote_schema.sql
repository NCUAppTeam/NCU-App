alter table "public"."comments" drop column "created_at";

alter table "public"."comments" add column "commented_at" timestamp with time zone default now();


