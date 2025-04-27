create policy "Enable read access for all users"
on "public"."food_category"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."restaurants"
as permissive
for select
to public
using (true);



