import { Database } from "../../../utils/database.types";

/**
 * This is a dummy-type inherited from the generated Supabase type
 */
export type DBComment = Omit<Database['public']['Tables']['comments']['Row'], 'user_id'> & {
    members: {
        username: string;
        avatar: string | null;
    };
};