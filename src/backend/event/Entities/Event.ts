import { Database } from "../../../utils/database.types";

/**
 * This is a dummy-type inherited from the generated Supabase type
 */
export type DBEvent = Database['public']['Tables']['events']['Row'];

export default class Event {
    public id: number = 0;
    public name: string = "";
    public type: number = 0;
    public description: string = "";
    public start_time: string = "";
    public end_time: string = "";
    public apply_due: string = "";
    public meeting_point: string = "";
    public destination: string = "";
    public fee: number = 0;
    public owner_id: string = "";
    public created_at: string = "";
    public img: string[] = [];
    public hashtag: number[] = [];
    public custom_hashtag: string[] = [];
    public externalLink: string = "";
}