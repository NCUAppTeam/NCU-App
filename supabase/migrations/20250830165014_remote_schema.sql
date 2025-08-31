alter table "public"."order" add column "pickup" text not null default ''''''::text;

create policy "delete order"
on "public"."order"
as permissive
for delete
to authenticated
using (true);


create policy "insert order"
on "public"."order"
as permissive
for insert
to authenticated
with check (true);


create policy "select order"
on "public"."order"
as permissive
for select
to authenticated
using (true);


create policy "update order"
on "public"."order"
as permissive
for update
to authenticated
using (true);



