import ErrorHandler from "../../../utils/ErrorHandler";
import { supabase } from "../../../utils/supabase";

import Restaurant, { DBRestaurant } from '../Entities/Restaurant';
import RestaurantService from '../Services/RestaurantService';


const RESTAURANT_TABLE_NAME = "restaurants"


export default class RestaurantController {

    /**
     * Get an array of restaurants
     * 
     * @usage restaurantConroller.getAllRestaurants(<PARAMS>).then(
     *          (users: Array<Restaurant>) => { ... }
     *        )
     * 
     * @param   {string}  fields            - The columns to retrieve (comma-separated)
     * @param   {string}  orderBy           - Which field to order by (leave blank if not needed)
     * @param   {boolean} orderDescending   - Whether to order in descending order (defaults to false)
     * 
     * @returns {Array<Restaurant>}               - Array of restaurants
     * 
     * @see [https://supabase.com/docs/reference/javascript/order]
     * @see [https://supabase.com/docs/reference/javascript/range]
     * 
     * @author Susan Chen. (@1989ONCE)
     */
    public async getAllRestaurants(
        fields: string,
        orderBy?: string,
        orderDescending?: boolean,
    ) : Promise<Array<Restaurant> | null> {

        const query = supabase
            .from(RESTAURANT_TABLE_NAME)
            .select(fields)
            .returns<Array<DBRestaurant>>()  
            
        if (orderBy)
            query.order(orderBy, { ascending: !orderDescending })
        
        const { data, error } = await query

        // Error handling
        if (error) {
            ErrorHandler.handleSupabaseError(error)
            return null
        }

        // Initialize result array
        const restaurants : Array<Restaurant> = []        
        
        // For each found DBUser, convert to User and append to result array
        data.forEach((record: DBRestaurant) => {
            restaurants.push(
                RestaurantService.parseRestaurant(record)
            )
        })

        return restaurants
    }



    /**
     * Find a single restaurant by ID
     * 
     * @usage restaurantController.findRestaurantByID(<PARAMS>).then(
     *          (restaurant: Restaurant) => { ... }
     *        )
     * 
     * @param   {string} restaurantID    - Target restaurant ID
     * @param   {string} fields          - The columns to retrieve
     * 
     * @returns {User}                   - The target user entity (null if not found)
     * 
     * @author Susan Chen. (@1989ONCE)
     */
    public async findRestaurantByID(restaurantID: string, fields?: string) : Promise<Restaurant | null> {

        const { data, error } = await supabase
            .from(RESTAURANT_TABLE_NAME)
            .select(fields)
            .eq("id", restaurantID)
            .returns<DBRestaurant>()
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
        const restaurant : Restaurant = RestaurantService.parseRestaurant(data)

        return restaurant
    }


}