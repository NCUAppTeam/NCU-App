import User, { DBUser } from "../Entities/User";


const UserService = {

    /**
     * Convert a user from default Supabase type to User entity
     * 
     * @param   {DBUser} record   - The record retrieved from Supabase
     * @returns {User}            - Converted user entity
     * 
     * @author Henry C. (@yeahlowflicker)
     */
    parseUser(record: DBUser) : User {
        if (!record || typeof record !== 'object')
            throw new Error('Invalid record provided')

        if (!record.uuid)
            throw new Error('uuid is a required field');

        const user          = new User()

        user.id             = record.uuid
        if(record.username)
            user.username     = record.username
        
        user.name           = record.name 
        if(record.phone){
            user.phone         = record.phone
        }else{
            user.phone         = ""
        }
        user.joinedAt       = new Date(record.created_at)
        if(record.profileBackground) {
            user.profileBackground = record.profileBackground
        } else {
            user.profileBackground = ""
        }
        if(record.department) {
            user.department     = record.department
        }else{
            user.department     = ""
        }
        if(record.grade){
            user.grade          = record.grade.toString()
        }else{
            user.grade          = ""
        }
        if(record.bio) user.bio = record.bio
        else user.bio = ""
        user.email          = record.email
        user.identity       = record.identity
        user.avatar         = record.avatar

        return user
    }
}

export default UserService