// Event has to be created with event id
// Thus, this interface is being introduced to ensure that the event creation process has all the necessary fields.
export interface EventInput {
    name: string;
    start_time: string;
    end_time: string;
    apply_due: string;
    meeting_point: string;
    destination: string;
    fee: number | null;
    description: string;
    type: 1 | 2 | 3 | 4 | 5;
    externalLink: string;
    img: Array<string>;
    hashtag: Array<number>;
    owner_id: string;
    created_at?: string;
}