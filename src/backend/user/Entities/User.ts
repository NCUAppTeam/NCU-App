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
    public name:                string  = ""
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
            case 1: return "管理員"
            case 2: return "學生"
            case 3: return "校友"
            case 4: return "教職員"
            default: return "用戶"
        }
    }
}