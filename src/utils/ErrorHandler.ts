import { PostgrestError } from "@supabase/supabase-js";

/**
 * A universal error handler class.
 * 
 * This will be called by all controllers and is useful for general
 * error-handling logic.
 * 
 * @author Henry C. (@yeahlowflicker)
 */
export default class ErrorHandler {

    public static handleSupabaseError(error: PostgrestError) {
        console.error(error)
    }

}