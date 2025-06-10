import { Database } from "../../../utils/database.types";

/**
 * This is a dummy-type inherited from the generated Supabase type
 */
export type DBChat = Omit<Database['public']['Tables']['chatrooms']['Row'], 'user_id'> & {
    members: {
        uuid: string;
        username: string;
        avatar: string | null;
    };
};