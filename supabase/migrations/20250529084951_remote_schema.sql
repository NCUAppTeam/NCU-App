create table "public"."favorites" (
    "uuid" uuid not null default gen_random_uuid(),
    "event_id" bigint[]
);


alter table "public"."favorites" enable row level security;

CREATE UNIQUE INDEX favorites_pkey ON public.favorites USING btree (uuid);

alter table "public"."favorites" add constraint "favorites_pkey" PRIMARY KEY using index "favorites_pkey";

grant delete on table "public"."favorites" to "anon";

grant insert on table "public"."favorites" to "anon";

grant references on table "public"."favorites" to "anon";

grant select on table "public"."favorites" to "anon";

grant trigger on table "public"."favorites" to "anon";

grant truncate on table "public"."favorites" to "anon";

grant update on table "public"."favorites" to "anon";

grant delete on table "public"."favorites" to "authenticated";

grant insert on table "public"."favorites" to "authenticated";

grant references on table "public"."favorites" to "authenticated";

grant select on table "public"."favorites" to "authenticated";

grant trigger on table "public"."favorites" to "authenticated";

grant truncate on table "public"."favorites" to "authenticated";

grant update on table "public"."favorites" to "authenticated";

grant delete on table "public"."favorites" to "service_role";

grant insert on table "public"."favorites" to "service_role";

grant references on table "public"."favorites" to "service_role";

grant select on table "public"."favorites" to "service_role";

grant trigger on table "public"."favorites" to "service_role";

grant truncate on table "public"."favorites" to "service_role";

grant update on table "public"."favorites" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."favorites"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."favorites"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on email"
on "public"."favorites"
as permissive
for update
to public
using ((auth.uid() = uuid))
with check ((auth.uid() = uuid));



