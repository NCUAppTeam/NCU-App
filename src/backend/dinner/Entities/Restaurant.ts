import { Database } from "../../../utils/database.types";

/**
 * This is a dummy-type inherited from the generated Supabase type
 */
export type DBRestaurant = Database['public']['Tables']['restaurants']['Row'];


export default class Restaurant {

    public id:                  number  = 0;
    public openhr:              string  = "";
    public address:             string  = "";
    public location:            number  = 0;
    public openday:             Array<number>  = [];
    public restaurant:          string  = "";
    public fk_category:         number  = 0;
    public image:               string  = "";
    public menu:                string  = "";
}