import GenericModel from "../models/GenericModel";
import { supabase } from "../utils/supabase";

// Supabase service for quickly accessing data
export default class SupabaseService {


    /* Fetch a single object
    *
    * Parameters
    * ----------
    * modelClass: class
    *   The target model class
    * targetID: str
    *   The target record ID
    * criteria: Dictionary
    *   Extra search criteria, please follow the DATABASE_MAPPING of the target model
    * 
    * Returns
    * -------
    * The target object (of the target model type). Null if record is not found.
    */
    public static async fetchSingle<T extends GenericModel>(
        modelClass: new() => T,
        targetID:   String,
        criteria?: Partial<Record<string, any>>,
    ): Promise<T | null> {
        const model = (modelClass as any)
        const tableName = model.TABLE_NAME

        var query = supabase.from(tableName)
                        .select('*')
                        .eq("uuid", targetID)
        
        for (const key in criteria)
            if (model.DATABASE_MAP[key])
                query = query.eq(model.DATABASE_MAP[key], criteria[key])

        const data = await query;

        if (!data.data || data.data.length == 0) {
            return null
        }
        const record = data.data[0]

        return model.parseJson(record)
    }




    /* Fetch an array of objects
    *
    * Parameters
    * ----------
    * modelClass: class
    *   The target model class
    * 
    * Returns
    * -------
    * Array of objects (of the target model type).
    * Returns empty array if no records can be found.
    */
    public static async fetchMultiple<T extends GenericModel>(
        modelClass: new() => T,
    ): Promise<Array<T>> {
        const model = (modelClass as any)
        const tableName = model.TABLE_NAME

        const data = await supabase.from(tableName)
                        .select('*')
                        
        const records = data.data

        const results: Array<T> = []

        records?.forEach(record => {
            const user = model.parseJson(record)
            results.push(user)
        })

        return results
    }
}