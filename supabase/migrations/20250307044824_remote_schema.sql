alter table "public"."event_type" add column "hashtag_relation" smallint[] not null default '{0}'::smallint[];

alter table "public"."event_type" alter column "type_name" set not null;

CREATE UNIQUE INDEX event_type_type_id_key ON public.event_type USING btree (type_id);

alter table "public"."event_type" add constraint "event_type_type_id_key" UNIQUE using index "event_type_type_id_key";


