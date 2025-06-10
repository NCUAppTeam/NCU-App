import Event, { DBEvent } from "../Entities/Event";

function toUTC8ISOString(dateString?: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Add 8 hours (28800000 ms)
    date.setUTCHours(date.getUTCHours() + 8);
    return date.toISOString();
}

const EventService = {
    toUTC8ISOString,
    parseEvent(record: DBEvent): Event {
        if (!record || typeof record !== 'object')
            throw new Error('Invalid record provided');
        if (!record.id)
            throw new Error('id is a required field');


        const event = new Event();
    
        event.id                = record.id
        event.name              = record.name ?? ""
        event.type              = typeof record.type === 'number' ? record.type : 0
        // Parse description
        event.description       = record.description ?? ""
        event.startTime         = record.start_time ? toUTC8ISOString(record.start_time) : ""
        event.endTime           = record.end_time ? toUTC8ISOString(record.end_time) : ""
        event.apply_due         = record.apply_due ? toUTC8ISOString(record.apply_due) : ""
        event.meeting_point     = record.meeting_point ?? ""
        event.destination       = record.destination ?? ""
        event.fee               = typeof record.fee === 'number' ? record.fee : 0
        event.owner_id            = record.owner_id ?? ""
        event.createdAt         = record.created_at ? toUTC8ISOString(record.created_at) : ""
        event.img               = record.img ?? []
        event.hashtag           = record.hashtag ?? []
        event.custom_hashtag    = record.custom_hashtag ?? []
        return event
    }

}

export default EventService;