alter table "public"."events" add column "img" text;

alter table "public"."members" add column "point" bigint default '0'::bigint;


