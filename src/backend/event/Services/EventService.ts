import Event, { DBEvent } from "../Entities/Event"

export default class EventService {
    
    public static parseEvent(record: DBEvent) : Event {
        const event             = new Event()

        event.id                = record.id
        event.name              = record.name ?? ""
        event.type              = record.type ?? 0
        event.description       = record.description ?? ""
        event.startTime         = record.start_time ?? ""
        event.endTime           = record.end_time ?? ""
        event.location          = record.location ?? ""
        event.fee               = record.fee ?? 0
        event.userID            = record.user_id
        event.createdAt         = record.created_at

        return event
    }
    
}