import { Database } from "../../../utils/database.types";

/**
 * This is a dummy-type inherited from the generated Supabase type
 */
export type DBUser = Database['public']['Tables']['members']['Row'];


/**
 * The User entity model
 * 
 * @author Henry C. (@yeahlowflicker)
 */
export default class User {
    public id:                  string  = ""
    public username:            string  = ""
    public email:               string  = ""
    public phone:               string  = ""
    public avatar:              string  = ""
    public profileBackground:   string  = ""
    public joinedAt:            Date    = new Date()
    public identity:            number  = 0
    public department:          string  = ""
    public grade:               string  = ""
    public bio:                 string  = ""


    public convertIdentity(): string {
        switch (this.identity) {
            default: return "用戶"
        }
    }
}