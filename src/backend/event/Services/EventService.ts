import Event, { DBEvent } from "../Entities/Event";

const EventService = {
    parseEvent(record: DBEvent): Event {
        if (!record || typeof record !== 'object')
            throw new Error('Invalid record provided');
        if (!record.id)
            throw new Error('id is a required field');

        const event = new Event();

        event.id = record.id;
        event.name = record.name ?? "";
        event.type = typeof record.type === 'number' ? record.type : 0;
        event.description = record.description ?? "";
        event.start_time = record.start_time ?? "";
        event.end_time = record.end_time ?? "";
        event.apply_due = record.apply_due ?? "";
        event.meeting_point = record.meeting_point ?? "";
        event.destination = record.destination ?? "";
        event.fee = typeof record.fee === 'number' ? record.fee : 0;
        event.owner_id = record.owner_id ?? "";
        event.created_at = record.created_at ?? "";
        event.img = record.img ?? [];
        event.hashtag = record.hashtag ?? [];
        event.custom_hashtag = record.custom_hashtag ?? [];
        event.externalLink = record.externalLink ?? "";

        return event;
    }
}

export default EventService;