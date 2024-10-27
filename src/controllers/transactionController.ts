import { Request, Response } from 'express';
import { db } from '../database/db';
import { PoolConnection } from 'mysql2/promise';

// Fungsi untuk melakukan transaksi
export const createTransaction = async (req: Request, res: Response) => {
    const { customerId, productId, quantity } = req.body;
  
    let connection: PoolConnection | undefined;
    try {
      connection = await db.getConnection();
      await connection.beginTransaction();
  
      // 1. Ambil stok produk
      const [productRows]: any = await connection.execute('SELECT stock FROM products WHERE id = ? FOR UPDATE', [productId]);
      const product = productRows[0];
  
      if (!product || product.stock < quantity) {
        throw new Error('Stock not sufficient');
      }
  
      // 2. Kurangi stok produk
      await connection.execute('UPDATE products SET stock = stock - ? WHERE id = ?', [quantity, productId]);
  
      // 3. Tambahkan data ke tabel transactions
      await connection.execute('INSERT INTO transactions (customer_id, product_id, quantity) VALUES (?, ?, ?)', [customerId, productId, quantity]);
  
      // Commit transaksi
      await connection.commit();
      res.status(200).json({ message: 'Transaction completed successfully' });
  
    } catch (error: any) { // <-- Ubah di sini
      if (connection) {
        await connection.rollback(); // Jika terjadi error, rollback transaksi
      }
      res.status(500).json({ error: error.message }); // Gunakan error.message
    } finally {
      if (connection) {
        connection.release(); // Selalu release koneksi
      }
    }
  };
  

export const getSalesByCity = async (req: Request, res: Response) => {
    try {
      const [rows]: any = await db.execute(`
        SELECT c.city, SUM(t.quantity) as total_sales
        FROM customers c
        JOIN transactions t ON c.id = t.customer_id
        GROUP BY c.city
      `);
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sales by city' });
    }
  };
  export const getTopCustomers = async (req: Request, res: Response) => {
    try {
      const [rows]: any = await db.execute(`
        SELECT c.name, SUM(t.quantity) as total_purchases
        FROM customers c
        JOIN transactions t ON c.id = t.customer_id
        GROUP BY c.id
        ORDER BY total_purchases DESC
        LIMIT 10
      `);
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch top customers' });
    }
  };

  export const getAverageSalesPerDay = async (req: Request, res: Response) => {
    try {
        const [rows]: any = await db.execute(`
            SELECT DATE(transaction_date) AS date, 
                   AVG(quantity) AS average_sales
            FROM transactions
            GROUP BY DATE(transaction_date)
            ORDER BY date DESC
        `);
        res.status(200).json({ data: rows });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch average sales per day' });
    }
};

    
