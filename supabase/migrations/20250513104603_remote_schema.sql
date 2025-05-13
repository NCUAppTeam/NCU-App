alter table "public"."events" drop column "location";

alter table "public"."events" add column "apply_due" timestamp with time zone;

alter table "public"."events" add column "custom_hashtag" text[];

alter table "public"."events" add column "destination" text;

alter table "public"."events" add column "externalLink" text;

alter table "public"."events" add column "hashtag" bigint[];

alter table "public"."events" add column "link" text;

alter table "public"."events" add column "meeting_point" text;

alter table "public"."events" alter column "description" drop default;

alter table "public"."events" alter column "img" set data type text[] using "img"::text[];

alter table "public"."members" add column "gender" smallint;


