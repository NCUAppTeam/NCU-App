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
    ): Promise<Array<Favorite> | null> {
        const query = supabase
            .from(FAVORITE_TABLE_NAME)
            .select(fields)
            .returns<Array<DBFavorite>>();

        if (orderBy) {
            query.order(orderBy, { ascending: !orderDescending });
        }

        if (rangeStart !== undefined && rangeEnd !== undefined) {
            query.range(rangeStart, rangeEnd);
        }

        const { data, error } = await query;

        // Error handling
        if (error) {
            ErrorHandler.handleSupabaseError(error);
            return null;
        }

        // Initialize result array
        const favorites: Array<Favorite> = [];

        // Parse each record into a Favorite object
        for (const record of data) {
            favorites.push(FavoriteService.parseFavorite(record));
        }

        return favorites;
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
            .single();

        if (error) {
            ErrorHandler.handleSupabaseError(error);
            return null;
        }

        return FavoriteService.parseFavorite(data);
    }

    public async isEventFavorite(userId: string, eventId: number): Promise<boolean> {
        const { data, error } = await supabase
            .from('favorites')
            .select('event_id')
            .eq('uuid', userId)
            .single();

        if (error && error.code !== 'PGRST116') return false;
        if (!data || !data.event_id) return false;
        return data.event_id.includes(eventId);
    }

    public async addEventToFavorites(
        userId: string,
        eventId: number
    ): Promise<{ success: boolean; message?: string }> {
        const { data: currentFavorite, error: fetchError } = await supabase
            .from('favorites')
            .select('event_id')
            .eq('uuid', userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            return { success: false, message: fetchError.message };
        }

        let newEventIds = [];
        if (currentFavorite && currentFavorite.event_id) {
            if (currentFavorite.event_id.includes(eventId)) {
                return { success: false, message: "Event already in favorites." };
            }
            newEventIds = [...currentFavorite.event_id, eventId];
        } else {
            newEventIds = [eventId];
        }

        const { error: upsertError } = await supabase
            .from('favorites')
            .upsert({ uuid: userId, event_id: newEventIds }, { onConflict: 'uuid' })
            .select('*')
            .single();

        if (upsertError) {
            return { success: false, message: upsertError.message };
        }

        return { success: true };
    }

    public async removeEventFromFavorites(
        userId: string,
        eventId: number
    ): Promise<{ success: boolean; message?: string }> {
        const { data: currentFavorite, error: fetchError } = await supabase
            .from('favorites')
            .select('event_id')
            .eq('uuid', userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            return { success: false, message: fetchError.message };
        }

        if (
            !currentFavorite ||
            !currentFavorite.event_id ||
            !currentFavorite.event_id.includes(eventId)
        ) {
            return {
                success: false,
                message: "Event not found in user's favorites or favorites list is empty.",
            };
        }

        const updatedEventIds = currentFavorite.event_id.filter(
            (id: number) => id !== eventId
        );

        const { error: updateError } = await supabase
            .from('favorites')
            .update({ event_id: updatedEventIds })
            .eq('uuid', userId)
            .select('*')
            .single();

        if (updateError) {
            return { success: false, message: updateError.message };
        }

        return { success: true };
    }
}