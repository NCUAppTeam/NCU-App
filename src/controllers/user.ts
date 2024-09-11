import { supabase } from "../utils/supabase";

export const UserController = {
  async get() {
    const { data, error } = await supabase.auth.getUser()

    if( error !== null ) {
      throw error
    }

    return data.user
  }
}
