import ErrorHandler from "../../../utils/ErrorHandler";
import { supabase } from "../../../utils/supabase";

import Order, { DBOrder } from '../Entities/Order';
import OrderService from '../Services/OrderService';


const ORDER_TABLE_NAME = "order"


export default class OrderController {

    /**
     * Get an array of active orders that haven't passed their due date
     * 
     * @returns {Array<Order>} - Array of active orders
     * 
     * @author Susan Chen. (@1989ONCE)
     */
    public async getActiveOrders(): Promise<Array<Order> | null> {
        const now = new Date().toISOString();

        const query = supabase
            .from(ORDER_TABLE_NAME)
            .select('*')
            .order('due', { ascending: true })
            .gt('due', now); // Only orders where due > now

        const { data, error } = await query;

        if (error) {
            ErrorHandler.handleSupabaseError(error);
            return null;
        }

        const orders: Array<Order> = [];

        data.forEach((record: DBOrder) => {
            orders.push(
                OrderService.parseOrder(record)
            );
        });

        return orders;
    }

    /**
     * Join an existing order by adding the user to the 'add' array
     * 
     * @param orderId - ID of the order to join
     * @param userId - ID of the user joining the order
     * @returns {Order | null} - The updated order or null if failed
     */
    public async joinOrder(orderId: number, userId: string): Promise<Order | null> {
        try {
            // First get the current order to access the current 'add' array
            const { data: currentOrder, error: getError } = await supabase
                .from(ORDER_TABLE_NAME)
                .select('*')
                .eq('order_id', orderId)
                .single();

            if (getError) {
                ErrorHandler.handleSupabaseError(getError);
                return null;
            }

            // Make sure the order exists and due date hasn't passed
            if (!currentOrder) {
                console.error('Order not found');
                return null;
            }

            const now = new Date();
            const dueDate = currentOrder.due ? new Date(currentOrder.due) : null;
            if (dueDate && dueDate <= now) {
                console.error('Order due date has passed');
                return null;
            }

            // Check if user is already in the add array or is the order creator
            const currentAddArray = currentOrder.add || [];
            if (currentAddArray.includes(userId)) {
                console.error('User has already joined this order');
                return OrderService.parseOrder(currentOrder);
            }
            
            if (currentOrder.main === userId) {
                console.error('User is the creator of this order');
                return OrderService.parseOrder(currentOrder);
            }

            // Prepare the updated 'add' array
            const updatedAddArray = [...currentAddArray, userId];

            // Update the order with the new 'add' array
            const { data: updatedOrder, error: updateError } = await supabase
                .from(ORDER_TABLE_NAME)
                .update({ add: updatedAddArray })
                .eq('order_id', orderId)
                .select('*')
                .single();

            if (updateError) {
                ErrorHandler.handleSupabaseError(updateError);
                return null;
            }

            return OrderService.parseOrder(updatedOrder);
        } catch (error) {
            console.error('Error joining order:', error);
            return null;
        }
    }

    /**
     * Create a new order
     * 
     * @param order - Order details to create
     * @returns {Order | null} - The created order or null if failed
     */
    public async createOrder(order: Partial<Order>): Promise<Order | null> {
        try {
            if (!order.restaurant || !order.main || !order.due) {
                console.error('Missing required fields for order creation');
                return null;
            }

            const orderData = {
                restaurant: order.restaurant,
                main: order.main,
                due: order.due,
                created_at: new Date().toISOString(),
                add: order.add || [],
                order_link: order.order_link || null,
                pickup: order.pickup || "",
                ps: order.ps || "",
                payment: order.payment || false
            };

            const { data, error } = await supabase
                .from(ORDER_TABLE_NAME)
                .insert(orderData)
                .select('*')
                .single();

            if (error) {
                ErrorHandler.handleSupabaseError(error);
                return null;
            }

            return OrderService.parseOrder(data);
        } catch (error) {
            console.error('Error creating order:', error);
            return null;
        }
    }

    /**
     * Get orders created by a specific user
     * 
     * @param userId - ID of the user who created the orders
     * @returns {Array<Order>} - Array of orders created by the user
     */
    public async getUserCreatedOrders(userId: string): Promise<Array<Order> | null> {
        try {
            const { data, error } = await supabase
                .from(ORDER_TABLE_NAME)
                .select('*')
                .eq('main', userId)
                .order('due', { ascending: true });

            if (error) {
                ErrorHandler.handleSupabaseError(error);
                return null;
            }

            const orders: Array<Order> = [];
            data.forEach((record: DBOrder) => {
                orders.push(OrderService.parseOrder(record));
            });

            return orders;
        } catch (error) {
            console.error('Error getting user created orders:', error);
            return null;
        }
    }

    /**
     * Get orders that a user has joined (where user ID is in the 'add' array)
     * 
     * @param userId - ID of the user who joined the orders
     * @returns {Array<Order>} - Array of orders the user has joined
     */
    public async getUserJoinedOrders(userId: string): Promise<Array<Order> | null> {
        try {
            const now = new Date().toISOString();
            
            // First get all active orders
            const { data, error } = await supabase
                .from(ORDER_TABLE_NAME)
                .select('*')
                .gt('due', now)
                .order('due', { ascending: true });

            if (error) {
                ErrorHandler.handleSupabaseError(error);
                return null;
            }

            // Filter orders where the user ID is in the 'add' array
            const joinedOrders: Array<Order> = [];
            data.forEach((record: DBOrder) => {
                if (record.add && record.add.includes(userId)) {
                    joinedOrders.push(OrderService.parseOrder(record));
                }
            });

            return joinedOrders;
        } catch (error) {
            console.error('Error getting user joined orders:', error);
            return null;
        }
    }
}