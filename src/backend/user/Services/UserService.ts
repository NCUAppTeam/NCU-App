import User, { DBUser } from "../Entities/User";
import UserFromPortal from "../Entities/UserFromPortal";


const UserService = {

    /**
     * Convert a user from default Supabase type to User entity
     * 
     * @param   {DBUser} record   - The record retrieved from Supabase
     * @returns {User}            - Converted user entity
     * 
     * @author Henry C. (@yeahlowflicker)
     * @author Susan Chen (@1989ONCE)
     */
    parseUser(record: Partial<DBUser>) : User {
       

        if (!record.uuid)
            throw new Error('uuid is a required field');

        const user          = new User()

        user.id             = record.uuid
        user.username       = record.username || '未提供'
        user.name           = record.name || '未提供'
        user.email          = record.email || '未提供'
        user.phone          = record.phone || '使用者未提供'
        user.joinedAt       = record.created_at ? new Date(record.created_at) : new Date()
        user.identity       = record.identity || 0
        user.department     = record.department || '使用者未提供'
        user.grade          = record.grade || 1
        user.gender        = record.gender == 0 ? '男' : '女'
        user.bio            = record.bio || '使用者未提供'
        user.profileBackground = record.profileBackground || 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
        user.studentId      = record.studentId || '使用者未提供'
        user.grad_time      = record.grad_time || new Date().toISOString()
        user.avatar         = record.avatar || 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
        user.point         = record.point || 0
        return user
    },


     /**
     * Convert incomplete user signup data into DBUser type
     * 
     * @param   UserFromPortal      - The user data to create
     * @returns {DBUser}            - Converted user entity
     * 
     * @author Susan Chen (@1989ONCE)
     */
    convertSignupToDB(record: UserFromPortal, uuid: string, username: string) : DBUser {
        
        if (!record || typeof record !== 'object')
            throw new Error('Invalid record provided')

        const gradTime: Date = new Date()
        // 學號的前三碼為入學年份
        const year = parseInt(record.studentId.substring(0, 3), 10) + 1911
        // calculate grad time
        if(record.academyRecords.studySystemNo == "0"){ // 0學士班
            gradTime.setFullYear(year + 4)
        }
        else if(record.academyRecords.studySystemNo == "2"){ // 2碩士班 預設4年
            gradTime.setFullYear(year + 2)
        }
        else{ // 3在職專班、4博士班 預設4年
            gradTime.setFullYear(year + 4)
        }


        const user: DBUser = {
            uuid: uuid,
            username: username,
            name: record.chineseName,
            email: record.email,
            gender: record.gender,
            phone: null,
            created_at: new Date().toISOString(),
            profileBackground: null,
            department: record.academyRecords.name,
            grade: parseInt(record.academyRecords.grad, 10),
            bio: null,
            identity: 2,
            avatar: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
            studentId: record.studentId,
            grad_time: gradTime.toISOString(),
            point: 0,
        };

        return user
    },
    convertUserToDB(record: User) : DBUser {
        if (!record || typeof record !== 'object')
            throw new Error('Invalid record provided')

        const user: DBUser = {
            uuid: record.id,
            username: record.username,
            name: record.name,
            email: record.email,
            avatar: record.avatar,
            bio: record.bio,
            created_at: record.joinedAt.toISOString(),
            department: record.department,
            gender: record.gender == '男' ? 0 : 1,
            grad_time: record.grad_time,
            grade: record.grade,
            identity: record.identity,
            phone: record.phone,
            point: record.point,
            profileBackground: record.profileBackground,
            studentId: record.studentId,
        }

        return user;
    }
}

export default UserService
