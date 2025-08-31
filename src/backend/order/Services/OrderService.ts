
import Order, { DBOrder } from "../Entities/Order";

const OrderService = {

    /**
     * Convert a order from default Supabase type to Order entity
     * 
     * @param   {DBOrder} record   - The record retrieved from Supabase
     * @returns {Order}            - Converted order entity
     * 
     * @author Susan Chen (@1989ONCE)
     */
     parseOrder(record: DBOrder) : Order {
         if (!record || typeof record !== 'object')
             throw new Error('Invalid record provided')

         if (!record.order_id)
             throw new Error('order_id is a required field')

         const order             = new Order()

         order.order_id          = record.order_id
         order.created_at        = record.created_at
         order.due               = record.due
         order.main              = record.main
         order.add               = record.add ?? []
         order.restaurant        = record.restaurant
         order.order_link        = record.order_link ?? "no link provided"
         order.pickup            = record.pickup ?? null
         order.payment           = record.payment ?? false
         order.ps                = record.ps ?? null

         return order
     },
     
     /**
      * Format the time remaining until the order due date
      * 
      * @param dueDate - The due date of the order
      * @returns {string} - Formatted time remaining string
      */
     formatTimeRemaining(dueDate: string | null): string {
         if (!dueDate) return '沒有設定截止時間';
         
         try {
             const due = new Date(dueDate);
             const now = new Date();
             const diffMs = due.getTime() - now.getTime();
             
             if (diffMs <= 0) return '已截止';
             
             const diffMins = Math.floor(diffMs / 60000);
             const hours = Math.floor(diffMins / 60);
             const mins = diffMins % 60;
             
             if (hours > 0) {
                 return `剩餘 ${hours} 小時 ${mins} 分鐘`;
             } else {
                 return `剩餘 ${mins} 分鐘`;
             }
         } catch (e) {
             return '時間格式錯誤';
         }
     },
     
     /**
      * Get user's student ID by their UUID
      * 
      * @param userId - The user UUID
      * @returns {Promise<string>} - The user's student ID or UUID if not found
      */
     async getUserStudentId(userId: string): Promise<string> {
         try {
             const { supabase } = await import('../../../utils/supabase');
             
             const { data, error } = await supabase
                 .from('members')
                 .select('studentId')
                 .eq('uuid', userId)
                 .single();
                 
             if (error || !data || !data.studentId) {
                 console.error('Error getting user student ID:', error);
                 return userId; // Return the UUID if we couldn't get the student ID
             }
             
             return data.studentId;
         } catch (e) {
             console.error('Exception getting user student ID:', e);
             return userId; // Return the UUID as fallback
         }
     }
     
 }

 export default OrderService