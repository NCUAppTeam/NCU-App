import { Database } from "../../../utils/database.types";

/**
 * This is a type inherited from the generated Supabase type
 */
export type DBOrder = Database['public']['Tables']['order']['Row'];

/**
 * Order entity representing the order table in the database
 */
export default class Order {
    public order_id: number = 0;
    public created_at: string = new Date().toISOString();
    public restaurant: string | null = null;
    public main: string | null = null;
    public add: string[] = [];
    public due: string | null = null;
    public order_link: string | null = null;
    public pickup: string | null = null;
    public payment: boolean = false;
    public ps: string | null = null;

    /**
     * Create a new Order instance
     * @param data Optional initialization data from database
     */
    constructor(data?: Partial<DBOrder>) {
        if (data) {
            this.order_id = data.order_id ?? this.order_id;
            this.created_at = data.created_at ?? this.created_at;
            this.restaurant = data.restaurant ?? this.restaurant;
            this.main = data.main ?? this.main;
            this.add = data.add ?? this.add;
            this.due = data.due ?? this.due;
            this.order_link = data.order_link ?? this.order_link;
            this.pickup = data.pickup ?? this.pickup;
            this.payment = data.payment ?? this.payment;
            this.ps = data.ps ?? this.ps;
        }
    }

    /**
     * Convert Order instance to database format
     * @returns Order data in database format
     */
    toDBFormat(): DBOrder {
        return {
            order_id: this.order_id,
            created_at: this.created_at,
            restaurant: this.restaurant,
            main: this.main,
            add: this.add,
            due: this.due,
            order_link: this.order_link,
            pickup: this.pickup ?? "",
            payment: this.payment,
            ps: this.ps ?? ""
        };
    }

    /**
     * Create an Order instance from database data
     * @param data Data from the database
     * @returns A new Order instance
     */
    static fromDB(data: DBOrder): Order {
        return new Order(data);
    }

    /**
     * Check if the order is valid
     * @returns True if the order is valid
     */
    isValid(): boolean {
        return !!this.restaurant && !!this.main;
    }

    /**
     * Get the time remaining until the order is due
     * @returns Time remaining in milliseconds, or null if no due date
     */
    getTimeRemaining(): number | null {
        if (!this.due) return null;
        
        const dueDate = new Date(this.due);
        const now = new Date();
        return dueDate.getTime() - now.getTime();
    }

    /**
     * Check if the order is still active (not past due date)
     * @returns True if the order is active
     */
    isActive(): boolean {
        const remaining = this.getTimeRemaining();
        return remaining === null || remaining > 0;
    }
}