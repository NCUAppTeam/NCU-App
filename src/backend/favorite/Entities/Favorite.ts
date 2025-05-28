import { Database } from "../../../utils/database.types";

/**
 * This is a dummy-type inherited from the generated Supabase type
 */
export type DBFavorite = Database['public']['Tables']['favorites']['Row'];

export default class Favorite {

    public id:                  string  = '';
    public event_id:             Array<number>  = [];
}