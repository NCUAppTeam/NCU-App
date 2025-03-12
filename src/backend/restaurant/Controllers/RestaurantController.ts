import ErrorHandler from "../../../utils/ErrorHandler";
import { supabase } from "../../../utils/supabase";

import Event, { DBEvent } from '../Entities/Restaurant';
import EventService from "../Services/RestaurantService";


const EVENT_TABLE_NAME = "restaurant"


/**
 * Controller for handling restaurant-related operations.
 * 
 * This class provides methods to interact with the restaurant database.
 * 
 * @remarks
 * The original database service was authored by @yeahlowflicker. This implementation
 * has been modified and extended by @1989ONCE.
 * 
 * @author Susan C.(@1989ONCE)
 */
export default class RestaurantController {


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
     * @template author Henry C. (@yeahlowflicker)
     * @
     */
    public async getAllRestaurant(
        fields: string,
        orderBy?: string,
        orderDescending?: boolean,
        rangeStart?: number,
        rangeEnd?: number
    ) : Promise<Array<Event> | null> {
        
        const query = supabase
            .from(EVENT_TABLE_NAME)
            .select(fields)
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

}