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
    public gender:              string  = ""
    public avatar:              string  = ""
    public profileBackground:   string  = ""
    public joinedAt:            Date    = new Date()
    public identity:            number  = 2
    public department:          string  = ""
    public grade:               number  = 1
    public bio:                 string  = ""
    public studentId:          string  = ""
    public grad_time:           string  = ""
    public point:               number  = 0


    public convertIdentity(): string {
        switch (this.identity) {
            case 1: return "開發團隊"
            case 2: return "Verified"
            default: return "未驗證"
        }
    }
}