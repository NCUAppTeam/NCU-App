import ErrorHandler from "../../../utils/ErrorHandler";
import { supabase } from "../../../utils/supabase";

import Event, { DBEvent } from '../Entities/Event';
import { EventType } from "../Entities/EventType";
import EventService from "../Services/EventService";

const EVENT_TABLE_NAME = "events"

export default class EventController {


    /**
     * Get an array of events
     * 
     * @usage eventController.getEvents(<PARAMS>).then(
     *          (events: Array<Events>) => { ... }
     *        )
     * 
     * @param   {string}  fields            - The columns to retrieve (comma-separated)
     * @param   {string}  orderBy           - Which field to order by (leave blank if not needed)
     * @param   {boolean} orderDescending   - Whether to order in descending order (defaults to false)
     * @param   {number}  rangeStart        - Starting index of fetch (defaults to 0)
     * @param   {number}  rangeEnd          - Ending index of fetch (defaults to 100)
     * 
     * @returns {Array<Event>}               - Array of events
     * 
     * @see [https://supabase.com/docs/reference/javascript/order]
     * @see [https://supabase.com/docs/reference/javascript/range]
     * 
     * @author Henry C. (@yeahlowflicker)
     */
    public async getActiveEvents(
        fields: string,
        orderBy?: string,
        orderDescending?: boolean,
        rangeStart?: number,
        rangeEnd?: number
    ) : Promise<Array<Event> | null> {
        
        const query = supabase
            .from(EVENT_TABLE_NAME)
            .select(fields)
            .gt('apply_due', new Date().toISOString()) // Filter out past events
            .returns<Array<DBEvent>>()  
            
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
        const events : Array<Event> = []
        
        
        // For each found DBEvent, convert to Event and append to result array
        data.forEach((record: DBEvent) => {
            events.push(
                EventService.parseEvent(record)
            )
        })

        return events
    }

    // Get all events created by the current user
    public async getUserCreatedEvents(
        uuid: string
    ) : Promise<Array<Event> | null> {
        
        const query = supabase
            .from(EVENT_TABLE_NAME)
            .select('*')
            .eq('owner_id', uuid)
            .returns<Array<DBEvent>>()  
            
        // Latest created event first
        query.order('start_time', { ascending: true })
        
                    
        const { data, error } = await query
        
        // Error handling
        if (error) {
            ErrorHandler.handleSupabaseError(error)
            return null
        }

        // Initialize result array
        const events : Array<Event> = []
        
        
        // For each found DBEvent, convert to Event and append to result array
        data.forEach((record: DBEvent) => {
            events.push(
                EventService.parseEvent(record)
            )
        })

        return events
    }



    /**
     * Find a single event by ID
     * 
     * @usage eventController.FindEventByID(<PARAMS>).then(
     *          (event: Event) => { ... }
     *        )
     * 
     * @param   {string} eventID     - Target event ID
     * @param   {string} fields     - The columns to retrieve
     * 
     * @returns {Event}              - The target event entity (null if not found)
     * 
     * @author Henry C. (@yeahlowflicker)
     */
    public async findEventByID(eventID: string, fields?: string) : Promise<Event | null> {

        const { data, error } = await supabase
            .from(EVENT_TABLE_NAME)
            .select(fields)
            .eq("id", eventID)
            .returns<DBEvent>()
            .limit(1)
            .single()

        // Error handling
        if (error) {
            ErrorHandler.handleSupabaseError(error)
            return null
        }

        if (!data)
            return null

        // Type conversion: DBEvent -> Event
        const event : Event = EventService.parseEvent(data)

        return event
    }

    /**
     * Get event types
     * 
     * @returns {Array<{ type_id: number; type_name: string }>} - Array of event types
     * 
     * @throws {Error} - Throws an error if the query fails
     * 
     * @author Susan Chen(@1989ONCE)
     */
    public async getEventTypes(): Promise<Array<EventType> | null> {
        const { data, error } = await supabase
            .from('event_type')
            .select('*')
            .contains('hashtag_relation', [0]) // Use contains for array comparison
            .order('type_id', { ascending: true });
    
        // Error handling
        if (error) {
            ErrorHandler.handleSupabaseError(error);
            return null;
        }
    
        return data;
    }

    /**
     * Get event types name by ID
     * 
     * @param   {number}  type_id     selected event type ID
     * 
     * @returns {string}              event type name
     * 
     * @throws {Error}                Throws an error if the query fails
     * 
     * @author Susan Chen(@1989ONCE)
     */
    public async returnEventTypesById({ type_id }: { type_id: number }) : Promise<EventType | null>  {
        
        const { data, error } = await supabase
            .from('event_type')
            .select('*')
            .eq('type_id', type_id)
            .single();
    
        // Error handling
        if (!data && error) {
            ErrorHandler.handleSupabaseError(error);
            return null;
        }
    
        return data;
    }

    /**
     * Get All Hashtags of an event Type by type_id
     * 
     * @param   {number}  type_id     selected event type ID
     * 
     * @returns {Array<{ hashtag_id: number; hashtag_name: string }>} - Array of hashtags
     * 
     * @throws {Error} - Throws an error if the query fails
     * 
     * @author Susan Chen(@1989ONCE)
     * 
     */
    public async getAllHashtagsByTypeId({ type_id }: { type_id: number }): Promise<Array<EventType> | null>  {
        // Fetch hashtag names based on IDs
        const { data: hashtags, error: hashtagError } = await supabase
            .from('event_type')
            .select('*')
            .contains('hashtag_relation', [type_id])
            .order('type_id', { ascending: true });

        if (hashtagError) {
            ErrorHandler.handleSupabaseError(hashtagError);
            return null;
        }
    
        return hashtags;
    }

    public async getFavoriteEvents(
        userId: string,
        fields: string = '*',
        orderBy?: string,
        orderDescending?: boolean,
        rangeStart?: number,
        rangeEnd?: number
    ) : Promise<Array<Event> | null> {
        // First, get the list of favorite event IDs for the user
        const { data: favoriteIdsData, error: favoriteIdsError } = await supabase
            .from('favorites')
            .select('event_id')
            .eq('uuid', userId);

        if (favoriteIdsError) {
            ErrorHandler.handleSupabaseError(favoriteIdsError);
            return null;
        }

        const favoriteEventIds = (favoriteIdsData ?? []).flatMap((fav: { event_id: number[] | null }) =>
            Array.isArray(fav.event_id) ? fav.event_id.map(String) : []
        );

        if (favoriteEventIds.length === 0) {
            return [];
        }

        // Now, get all events with IDs in the favoriteEventIds list
        const query = supabase
            .from(EVENT_TABLE_NAME)
            .select(fields)
            .in('id', favoriteEventIds)
            .returns<Array<DBEvent>>();
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
        const events : Array<Event> = []
        
        // For each found DBEvent, convert to Event and append to result array
        data.forEach((record: DBEvent) => {
            events.push(
                EventService.parseEvent(record)
            )
        })

        return events
    }

    // Get user accepted events according to staus in event_participants table
    public async getUserAcceptedEvents(
        userId: string,
        fields: string = '*',
        orderBy?: string,
        orderDescending?: boolean,
    ) : Promise<Array<Event> | null> {
        // First, get the list of accepted event IDs for the user
        const { data: acceptedIdsData, error: acceptedIdsError } = await supabase
            .from('event_participants')
            .select('event_id')
            .eq('user_id', userId)
            .eq('status', true);

        if (acceptedIdsError) {
            ErrorHandler.handleSupabaseError(acceptedIdsError);
            return null;
        }

        const acceptedEventIds = (acceptedIdsData ?? []).map((acc: { event_id: number | null }) =>
            acc.event_id !== null ? String(acc.event_id) : null
        ).filter((id): id is string => id !== null);

        if (acceptedEventIds.length === 0) {
            return [];
        }

        // Now, get all events with IDs in the acceptedEventIds list
        const query = supabase
            .from(EVENT_TABLE_NAME)
            .select(fields)
            .in('id', acceptedEventIds)
            .returns<Array<DBEvent>>();
        
        if (orderBy)
            query.order(orderBy, { ascending: !orderDescending })

        const { data, error } = await query
        
        // Error handling
        if (error) {
            ErrorHandler.handleSupabaseError(error)
            return null
        }

        // Initialize result array
        const events : Array<Event> = []
        
        // For each found DBEvent, convert to Event and append to result array
        data.forEach((record: DBEvent) => {
            events.push(
                EventService.parseEvent(record)
            )
        })

        return events
    }    
    
    public async checkUserRegistration(eventId: number, userId: string): Promise<boolean> {
            const { data, error } = await supabase
                .from('event_participants')
                .select('*')
                .eq('user_id', userId)
                .eq('event_id', eventId)
                .single();
            if (error && error.code !== 'PGRST116') return false;
            return !!data;
        }
    
        public async registerUserToEvent(eventId: number, userId: string): Promise<{ success: boolean; message?: string }> {
            const { data: existing, error: fetchError } = await supabase
                .from('event_participants')
                .select('*')
                .eq('user_id', userId)
                .eq('event_id', eventId)
                .single();
            if (fetchError && fetchError.code !== 'PGRST116') {
                return { success: false, message: fetchError.message };
            }
            if (existing) {
                return { success: false, message: "你已經報名過此活動。" };
            }
            const { error: insertError } = await supabase
                .from('event_participants')
                .insert({
                    user_id: userId,
                    event_id: Number(eventId),
                    joined_at: new Date().toISOString(),
                    status: false,
                })
                .select('*')
                .single();
            if (insertError) {
                return { success: false, message: insertError.message };
            }
            return { success: true };
        }
    
        public async cancelUserRegistration(eventId: number, userId: string): Promise<{ success: boolean; message?: string }> {
            const { data: existing, error: fetchError } = await supabase
                .from('event_participants')
                .select('*')
                .eq('user_id', userId)
                .eq('event_id', eventId)
                .single();
            if (fetchError && fetchError.code !== 'PGRST116') {
                return { success: false, message: fetchError.message };
            }
            if (!existing) {
                return { success: false, message: "你尚未報名此活動。" };
            }
            const { error: deleteError } = await supabase
                .from('event_participants')
                .delete()
                .eq('user_id', userId)
                .eq('event_id', eventId);
            if (deleteError) {
                return { success: false, message: deleteError.message };
            }
            return { success: true };
        }
    
}