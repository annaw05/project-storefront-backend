import Client from '../database';

export type Order = {
    id?: number;
    user_id: number;
    order_status: boolean;
};

export class OrderStore {
    
    async index(): Promise<Order[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';

            const result=await conn.query(sql);
            
            conn.release();
            
            return result.rows;
        } catch (error) {
            throw new Error(`unable to get orders: ${error}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';

            const result=await conn.query(sql,[id]);
            
            conn.release();
            
            return result.rows[0];
        } catch (error) {
            throw new Error(`unable to get order with ${id}: ${error}`);
        }
    }
    
    async create(o: Order): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (user_id, order_status) VALUES ($1, $2) RETURNING *';

            const result=await conn.query(sql, [o.user_id, o.order_status]);
            const order = result.rows[0];
            conn.release();
            
            return order;
        } catch (error) {
            throw new Error(`unable to create order: ${error}`);
        }
    }

    async closeOrderStatus(id: number): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'UPDATE orders SET order_status="true" WHERE id=($1) RETURNING *';

            const result=await conn.query(sql,[id]);
            const order = result.rows[0];
            conn.release();
            
            return order;
        } catch (error) {
            throw new Error(`unable to close order status: ${error}`);
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';

            const result=await conn.query(sql,[id]);
            const order=result.rows[0]
            conn.release();
            
            return order ;
        } catch (error) {
            throw new Error(`unable to delete order: ${error}`);
        }
    }


    //- Current Order by user (args: user id)[token required]: '/order-by-user/:user-id' [GET]

    async orderByUser(user_id: number): Promise<Order[]> {
        try {
            //@ts-ignore: 
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';

            const result=await conn.query(sql,[user_id]);
            
            conn.release();
            
            return result.rows;
        } catch (error) {
            throw new Error(`unable to find order by user ${user_id}: ${error}`);
        }
    }

    //- [OPTIONAL] Completed Orders by user (args: user id)[token required]: '/completed-orders/:user-id' [GET]
    
    async completedOrderByUser(user_id: number): Promise<Order[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND order_status="true"';

            const result=await conn.query(sql,[user_id]);
            
            conn.release();
            
            return result.rows;
        } catch (error) {
            throw new Error(`unable to find completed orders by user ${user_id}: ${error}`);
        }
    }

    async addProduct(quantity: number, order_id: number, product_id: number):Promise<Order>{
        try{
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
            
            const result=await conn.query(sql,[quantity, order_id, product_id]);
            const order=result.rows[0]
            conn.release();
            
            return order ;
        } catch (error){
            throw new Error(`unable to add product ${product_id} to the order ${order_id}: ${error}`);
        }
    }


}