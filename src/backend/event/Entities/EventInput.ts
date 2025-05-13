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
    link: string;
}