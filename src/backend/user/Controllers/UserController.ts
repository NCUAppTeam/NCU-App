import ErrorHandler from "../../../utils/ErrorHandler";
import { supabase } from "../../../utils/supabase";

import User, { DBUser } from '../Entities/User';
import UserFromPortal from "../Entities/UserFromPortal";
import UserService from '../Services/UserService';

const USER_TABLE_NAME = "members"

export default class UserController {

    /**
     * Get an array of users
     * 
     * @usage userController.getUsers(<PARAMS>).then(
     *          (users: Array<Users>) => { ... }
     *        )
     * 
     * @param   {string}  fields            - The columns to retrieve (comma-separated)
     * @param   {string}  orderBy           - Which field to order by (leave blank if not needed)
     * @param   {boolean} orderDescending   - Whether to order in descending order (defaults to false)
     * @param   {number}  rangeStart        - Starting index of fetch (defaults to 0)
     * @param   {number}  rangeEnd          - Ending index of fetch (defaults to 100)
     * 
     * @returns {Array<User>}               - Array of users
     * 
     * @see [https://supabase.com/docs/reference/javascript/order]
     * @see [https://supabase.com/docs/reference/javascript/range]
     * 
     * @author Henry C. (@yeahlowflicker)
     */
    public async getUsers(
        fields: string,
        orderBy?: string,
        orderDescending?: boolean,
        rangeStart?: number,
        rangeEnd?: number
    ) : Promise<Array<User> | null> {

        const query = supabase
            .from(USER_TABLE_NAME)
            .select(fields)
            .returns<Array<DBUser>>()  
            
        if (orderBy)
            query.order(orderBy, { ascending: !orderDescending })

        if (rangeStart !== undefined && rangeEnd !== undefined)
            query.range(rangeStart, rangeEnd)
        
        const { data, error } = await query

        // Error handling
        if (error) {
            ErrorHandler.handleSupabaseError(error)
            return null
        }

        // Initialize result array
        const users : Array<User> = []        
        
        // For each found DBUser, convert to User and append to result array
        data.forEach((record: DBUser) => {
            users.push(
                UserService.parseUser(record)
            )
        })

        return users
    }



    /**
     * Find a single user by ID
     * 
     * @usage userController.FindUserByID(<PARAMS>).then(
     *          (user: User) => { ... }
     *        )
     * 
     * @param   {string} userID     - Target user ID
     * 
     * @returns {User}              - The target user entity (null if not found)
     * 
     * @author Henry C. (@yeahlowflicker)
     */
    public async findUserByID(userID: string): Promise<User | null> {

        const { data, error } = await supabase
            .from(USER_TABLE_NAME)
            .select("*")
            .eq("uuid", userID)
            .returns<DBUser>()
            .single();

        // Error handling
        if (error || !data) {
            ErrorHandler.handleSupabaseError(error);
            return null;
        }

        const user = UserService.parseUser(data);

        return user;
    }
    
    /**
     * Create a new user 
     * (it will create a new row in supabase users table and a new row in members table
     * the supabse user table is used for authentication, and the members table is used for user information
     * )
     * 
     * @usage userController.createUser(<PARAMS>).then(
     *          (user: User) => { ... }
     *        )
     * 
     * @param   {UserFromPortal} userPortal - The user data access from NCU Portal
     * 
     * @returns {User} - The created user entity
     * 
     * @author Boyiliu (@boyiliu1007)
     * @author Susan Chen(@1989ONCE)(refactor)
     */

    public async createUser(userPortal: UserFromPortal, pwd: string, username: string): Promise<User | null> {
        if (pwd.length < 8) {
            console.error("Password too short");
            return null;
        }
        
        // should signup in users table at auth schema
        const { data, error } = await supabase.auth.signUp({
            email: userPortal.email,
            password: pwd,
        }) 

        

        if (error) {
            // handle auth error cannot use handleSupabaseError
            console.log(error.name);
            return null
        }
        if (!data)
            return null

        // get user id from users table at auth schema
        const userID = data.user?.id

        if (!userID) {
            console.error("User ID is undefined");
            return null;
        }
        
        //  convert user portal info to DBUser to fit memebers' schema
        const dbData : DBUser = UserService.convertSignupToDB(userPortal, userID, username)

        // insert into members table at public schema
        const { error: insertMemberError } = await supabase
            .from(USER_TABLE_NAME)
            .insert(dbData)
            .single();
        if (insertMemberError) {
            console.log("Error inserting member:", insertMemberError);
            ErrorHandler.handleSupabaseError(insertMemberError);
            return null;
        }
        
        // get the inserted member data
        // fetch the newly created user
        const { data: memberData, error: getMemberError } = await supabase
            .from(USER_TABLE_NAME)
            .select("*")
            .eq("uuid", userID)
            .single();

        if (getMemberError) {
            console.error("Error retrieving member data:", getMemberError);
            ErrorHandler.handleSupabaseError(getMemberError);
            return null;
        }

        console.log("User created successfully:", memberData);
        alert("註冊成功！請使用剛剛註冊的信箱及密碼登入！")

        // NOTE: Signing out immediately after signup may be unexpected—
        // please confirm if automatic sign-in is not desired.
        const { error: signoutError } = await supabase.auth.signOut();
        if (signoutError) {
            console.error("Sign-out error:", signoutError);
            // proceed even if sign-out fails
        }

        return UserService.parseUser(memberData);
    }

    /**
     * Get the Current User, return the user information from members table by uuid
     * 
     * @usage userController.getCurrentUser().then(
     *          (user: User) => { ... }
     *        )
     * 
     * @returns {User} - The created user entity
     * 
     * @author Susan Chen(@1989ONCE)
     */

    public async getCurrentUser(): Promise<User | null> {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return null
        }
        const userID = user.id
        const { data, error } = await supabase
            .from(USER_TABLE_NAME)
            .select("*")
            .eq("uuid", userID)
            .single()
        if (error) {
            console.error("Error retrieving member data:", error);
            ErrorHandler.handleSupabaseError(error);
            return null;
        }

        if (!data) {
            console.error("User data not found");
            return null;
        }
        
        const userData : User | null = await this.findUserByID(userID)
        if (!userData) {
            console.error("User not found");
            return null;
        }

        return userData

    }

    public async updateUser(userID: string, userData: Partial<User>): Promise<User | null> {
        const { data, error } = await supabase
            .from(USER_TABLE_NAME)
            .update(userData)
            .eq("uuid", userID)
            .returns<DBUser>()
            .single()

        if (error) {
            ErrorHandler.handleSupabaseError(error)
            return null
        }

        if (!data)
            return null

        return UserService.parseUser(data)
    }
}