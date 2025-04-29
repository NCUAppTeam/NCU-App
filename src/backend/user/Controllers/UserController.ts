import ErrorHandler from "../../../utils/ErrorHandler";
import { supabase } from "../../../utils/supabase";

import User, { DBUser } from '../Entities/User';
import UserService from '../Services/UserService';
import UserSignupData from "../Entities/UserSignupData";

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
     * @param   {string} fields     - The columns to retrieve
     * 
     * @returns {User}              - The target user entity (null if not found)
     * 
     * @author Henry C. (@yeahlowflicker)
     */
    public async findUserByID(userID: string, fields?: string) : Promise<User | null> {

        const { data, error } = await supabase
            .from(USER_TABLE_NAME)
            .select(fields)
            .eq("uuid", userID)
            .returns<DBUser>()
            .limit(1)
            .single()


        // Error handling
        if (error) {
            ErrorHandler.handleSupabaseError(error)
            return null
        }

        if (!data)
            return null
        
        // Type conversion: DBUser -> User
        const user : User = UserService.parseUser(data)

        return user
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
     * @param   {UserSignupData} userSignupData - The user data to create
     * 
     * @returns {User} - The created user entity
     * 
     * @author Boyiliu (@boyiliu1007)
     */

    public async createUser(userSignupData: UserSignupData): Promise<User | null> {
        
        // should signup in users table at auth schema
        const { data, error } = await supabase.auth.signUp({
            email: userSignupData.email,
            password: userSignupData.password,
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

        // insert into members table at public schema
        const { error: insertMemberError } = await supabase
            .from(USER_TABLE_NAME)
            .insert(
                {   
                    uuid: userID,
                    name: userSignupData.name,
                    email: userSignupData.email,
                    username: userSignupData.username,
                    studentId: userSignupData.studentId,
                    identity: 2,
                    created_at: new Date().toISOString(),
                }
            )
            .single();
        if (insertMemberError) {
            console.log("Error inserting member:", insertMemberError);
            ErrorHandler.handleSupabaseError(insertMemberError);
            return null;
        }
        
        // get the inserted member data
        const insertedMemberData = await supabase
            .from(USER_TABLE_NAME)
            .select("*")
            .eq("uuid", userID as string)
            .single()

        if (!insertedMemberData) {
            console.log("Error: Member data not found.");
            return null;
        }
        if (insertedMemberData.error) {
            console.log("Error retrieving member data:", insertedMemberData.error);
            return null;
        }
        console.log("User created successfully:", insertedMemberData.data);
        const { error: signoutError } = await supabase.auth.signOut()
        if (signoutError) {
            console.error("Sign out error:", signoutError);
        }
        return UserService.parseUser(insertedMemberData.data);
    }
}