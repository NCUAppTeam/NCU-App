import Event, { DBEvent } from "../Entities/Event";

const EventService = {
    
    parseEvent(record: DBEvent) : Event {
        if (!record || typeof record !== 'object')
            throw new Error('Invalid record provided')
        
        if (!record.id)
            throw new Error('id is a required field')

        const event             = new Event()
            
        event.id                = record.id
        event.name              = record.name ?? ""
        event.type              = typeof record.type === 'number' ? record.type : 0
        // Parse description
        event.description       = record.description ?? ""
        event.startTime         = record.start_time ? new Date(record.start_time).toISOString() : ""
        event.endTime           = record.end_time ? new Date(record.end_time).toISOString() : ""
        event.apply_due         = record.apply_due ? new Date(record.apply_due).toISOString() : ""
        event.meeting_point     = record.meeting_point ?? ""
        event.fee               = typeof record.fee === 'number' ? record.fee : 0
        event.userID            = record.user_id
        event.createdAt         = record.created_at ? new Date(record.created_at).toISOString() : ""
        event.img               = record.img ?? []
        event.hashtag           = record.custom_hashtag ?? []
        return event
    }


    
}

export default EventService