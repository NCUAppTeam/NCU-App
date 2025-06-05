import ErrorHandler from "../../../utils/ErrorHandler";
import { supabase } from "../../../utils/supabase";

import  Registration, {DBRegistration} from "../Entities/Registration";
import RegistrationService from "../Services/RegistrationService";

const REGISTRATION_TABLE_NAME = "registrations";
export default class RegistrationController {

    /**
     * Get an array of registrations
     * 
     * @usage registrationController.getRegistrations(<PARAMS>).then(
     *          (registrations: Array<Registrations>) => { ... }
     *        )
     * 
     * @param   {string}  fields            - The columns to retrieve (comma-separated)
     * @param   {string}  orderBy           - Which field to order by (leave blank if not needed)
     * @param   {boolean} orderDescending   - Whether to order in descending order (defaults to false)
     * @param   {number}  rangeStart        - Starting index of fetch (defaults to 0)
     * @param   {number}  rangeEnd          - Ending index of fetch (defaults to 100)
     * 
     * @returns {Array<Registration>}       - Array of registrations
     * 
     * @see [https://supabase.com/docs/reference/javascript/order]
     * @see [https://supabase.com/docs/reference/javascript/range]
     */
    public async getRegistrations(
        fields: string,
        orderBy?: string,
        orderDescending?: boolean,
        rangeStart?: number,
        rangeEnd?: number
    ) : Promise<Array<Registration> | null> {

        const query = supabase
            .from(REGISTRATION_TABLE_NAME)
            .select(fields)
            .returns<Array<DBRegistration>>()
            
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
        const registrations : Array<Registration> = []

        // Parse each record into a Registration object
        for (const record of data) {
            registrations.push(RegistrationService.parseRegistration(record))
        }

        return registrations
    }

    /**
     * Get a registration by its ID
     * 
     * @param {number} id - The ID of the registration to retrieve
     * @returns {Promise<Registration | null>} - The registration object or null if not found
     */
    public async getRegistrationById(id: string): Promise<Registration | null> {
        const { data, error } = await supabase
            .from(REGISTRATION_TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            ErrorHandler.handleSupabaseError(error)
            return null
        }

        return RegistrationService.parseRegistration(data)
    }

}