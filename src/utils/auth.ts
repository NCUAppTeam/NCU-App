import { ParsedLocation, redirect } from "@tanstack/react-router";
import { supabase } from "./supabase";

export async function AuthGuard({ location }: { location: ParsedLocation }) {
  const { data: { session }, error } = await supabase.auth.getSession()

  if( error !== null ) {
    throw error
  }

  if (session === null) {
    throw redirect({
      to: '/login',
      search: {
        // Use the current location to power a redirect after login
        // (Do not use `router.state.resolvedLocation` as it can
        // potentially lag behind the actual current location)
        redirect: location.href,
      },
    })
  }
}
