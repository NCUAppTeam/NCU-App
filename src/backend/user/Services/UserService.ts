import User, { DBUser } from "../Entities/User";

export default class UserService {

    /**
     * Convert a user from default Supabase type to User entity
     * 
     * @param   {DBUser} record   - The record retrieved from Supabase
     * @returns {User}            - Converted user entity
     * 
     * @author Henry C. (@yeahlowflicker)
     */
    public static parseUser(record: DBUser) : User {
        const user          = new User()
        user.id             = record.uuid
        user.username       = record.name
        user.email          = record.fk_email
        user.identity       = record.fk_identity
        user.avatar         = record.avatar

        return user
    }
    
}