create policy "Enable read access for all users"
on "public"."event_type"
as permissive
for select
to public
using (true);


create policy "Enable delete for users based on user_id"
on "public"."events"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));



