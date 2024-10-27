import { Request, Response } from 'express';
import { db } from '../database/db';
import { PoolConnection } from 'mysql2/promise';

// Fungsi untuk membuat produk
export const createProduct = async (req: Request, res: Response) => {
  const { name, selling_price, stock } = req.body;

  try {
    await db.execute('INSERT INTO products (name, selling_price, stock) VALUES (?, ?, ?)', [name, selling_price, stock]);
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error: any) { // Menambahkan tipe any untuk error
    res.status(500).json({ error: error.message });
  }
};
// Fungsi untuk mendapatkan produk
export const getProducts = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.execute('SELECT * FROM products');
    res.status(200).json(rows);
  } catch (error: any) { // Menambahkan tipe any untuk error
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk memperbarui produk
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, selling_price, stock } = req.body;
  try {
    await db.execute('UPDATE products SET name = ?, selling_price = ?, stock = ? WHERE id = ?', [name, selling_price, stock, id]);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error: any) { // Menambahkan tipe any untuk error
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk menghapus produk
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM products WHERE id = ?', [id]);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error: any) { // Menambahkan tipe any untuk error
    res.status(500).json({ error: error.message });
  }
};
