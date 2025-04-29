
import Restaurant, { DBRestaurant } from "../Entities/Restaurant";
 
 const RestaurantService = {
     
    /**
     * Convert a restaurant from default Supabase type to User entity
     * 
     * @param   {DBRestaurant} record   - The record retrieved from Supabase
     * @returns {Restaurant}            - Converted user entity
     * 
     * @author Susan Chen (@1989ONCE)
     */
     parseRestaurant(record: DBRestaurant) : Restaurant {
         if (!record || typeof record !== 'object')
             throw new Error('Invalid record provided')
         
         if (!record.id)
             throw new Error('id is a required field')
 
         const restaurant             = new Restaurant()
             
         restaurant.id                = record.id
         restaurant.openhr            = record.openhr ?? "以店家公告為主"
         restaurant.address           = record.address ?? "-"
         restaurant.location          = record.location ?? 0
         restaurant.openday           = record.openday ?? []
         restaurant.restaurant        = record.restaurant ?? "-"
         restaurant.fk_category       = record.fk_category ?? 0
         restaurant.image             = record.image ?? "https://via.placeholder.com/150"
         restaurant.menu              = record.menu ?? "https://via.placeholder.com/150"
         
         return restaurant
     }
     
 }
 
 export default RestaurantService