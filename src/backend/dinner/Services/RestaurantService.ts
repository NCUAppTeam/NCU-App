
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
         restaurant.image             = record.image ?? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fzh.wikipedia.org%2Fzh-tw%2F7-Eleven&psig=AOvVaw0ki7Iy1o8GRIYwMK-sZfmZ&ust=1745853442073000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOC85YPB-IwDFQAAAAAdAAAAABAZ"
         restaurant.menu              = record.menu ?? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fzh.wikipedia.org%2Fzh-tw%2F7-Eleven&psig=AOvVaw0ki7Iy1o8GRIYwMK-sZfmZ&ust=1745853442073000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOC85YPB-IwDFQAAAAAdAAAAABAZ"
         
         return restaurant
     }
     
 }
 
 export default RestaurantService