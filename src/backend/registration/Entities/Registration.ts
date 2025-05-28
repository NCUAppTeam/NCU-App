import { Database } from "../../../utils/database.types";

/**
 * This is a dummy-type inherited from the generated Supabase type
 */
export type DBRegistration = Database['public']['Tables']['registrations']['Row'];

export default class Registration {

    public id:                  string  = '';
    public event_id:             Array<number>  = [];
    public likes_event_id:      Array<number>  = [];
}