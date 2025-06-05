create policy "Enable insert for authenticated users only"
on "public"."chatrooms"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for authenticated users"
on "public"."chatrooms"
as permissive
for select
to authenticated
using (true);


create policy "Enable update for authenticated users "
on "public"."chatrooms"
as permissive
for update
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."comments"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."comments"
as permissive
for select
to public
using (true);


create policy "Enable update for authenticated user"
on "public"."comments"
as permissive
for update
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."event_participants"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."event_participants"
as permissive
for select
to public
using (true);


create policy "Enable update for authenticated users only"
on "public"."event_participants"
as permissive
for update
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."messages"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."messages"
as permissive
for select
to public
using (true);


create policy "Enable update for authenticated users"
on "public"."messages"
as permissive
for update
to authenticated
using (true);



