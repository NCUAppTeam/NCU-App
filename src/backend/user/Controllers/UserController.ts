import ErrorHandler from "../../../utils/ErrorHandler";
import { supabase } from "../../../utils/supabase";

import User, { DBUser } from '../Entities/User';
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


}