import ErrorHandler from "../../../utils/ErrorHandler";
import { supabase } from "../../../utils/supabase";

import Event, { DBEvent } from '../Entities/Event';
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
            .gt('end_time', new Date().toISOString()) // Filter out past events
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
     */
    public async getEventTypes(): Promise<Array<{ type_id: number; type_name: string }> | null> {
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
}

