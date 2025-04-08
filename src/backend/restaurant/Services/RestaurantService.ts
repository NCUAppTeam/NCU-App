import Event, { DBEvent } from "../Entities/Restaurant";

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
        event.description       = record.description ?? ""
        event.startTime         = record.start_time ? new Date(record.start_time).toISOString() : ""
        event.endTime           = record.end_time ? new Date(record.end_time).toISOString() : ""
        event.location          = record.location ?? ""
        event.fee               = typeof record.fee === 'number' ? record.fee : 0
        event.userID            = record.user_id
        event.createdAt         = record.created_at ? new Date(record.created_at).toISOString() : ""

        return event
    }
    
}

export default EventService