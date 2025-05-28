import ErrorHandler from "../../../utils/ErrorHandler";
import { supabase } from "../../../utils/supabase";

import Favorite, { DBFavorite } from "../Entities/Favorite";
import FavoriteService from "../Services/FavoriteService";

const FAVORITE_TABLE_NAME = "favorites";
export default class FavoriteController {

    /**
     * Get an array of favorites
     * 
     * @usage favoriteController.getFavorites(<PARAMS>).then(
     *          (favorites: Array<Favorite>) => { ... }
     *        )
     * 
     * @param   {string}  fields            - The columns to retrieve (comma-separated)
     * @param   {string}  orderBy           - Which field to order by (leave blank if not needed)
     * @param   {boolean} orderDescending   - Whether to order in descending order (defaults to false)
     * @param   {number}  rangeStart        - Starting index of fetch (defaults to 0)
     * @param   {number}  rangeEnd          - Ending index of fetch (defaults to 100)
     * 
     * @returns {Array<Favorite>}           - Array of favorites
     */
    public async getFavorites(
        fields: string,
        orderBy?: string,
        orderDescending?: boolean,
        rangeStart?: number,
        rangeEnd?: number
    ) : Promise<Array<Favorite> | null> {

        const query = supabase
            .from(FAVORITE_TABLE_NAME)
            .select(fields)
            .returns<Array<DBFavorite>>()
            
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
        const favorites : Array<Favorite> = []

        // Parse each record into a Favorite object
        for (const record of data) {
            favorites.push(FavoriteService.parseFavorite(record))
        }

        return favorites
    }

    /**
     * Get a single favorite by ID
     * 
     * @usage favoriteController.getFavoriteById(id).then(
     *          (favorite: Favorite | null) => { ... }
     *        )
     * 
     * @param   {string}  id                - The ID of the favorite to retrieve
     * 
     * @returns {Favorite | null}           - The favorite object or null if not found
     */
    public async getFavoriteById(id: string): Promise<Favorite | null> {
        const { data, error } = await supabase
            .from(FAVORITE_TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            ErrorHandler.handleSupabaseError(error)
            return null
        }

        return FavoriteService.parseFavorite(data)
    }

}