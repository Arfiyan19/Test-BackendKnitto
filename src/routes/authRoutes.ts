import { Router } from 'express';
import { 
    loginWithEmailPassword, 
    loginWithOAuth 
} from '../controllers/authController';
import { 
    getProvinces, 
    getRegencies, 
    getDistricts, 
    getVillages 
} from '../controllers/externalApiController';
import { 
    createProduct, 
    getProducts, 
    updateProduct, 
    deleteProduct 
} from '../controllers/productController';
import { 
    createTransaction, 
    getTopCustomers, 
    getSalesByCity ,
    getAverageSalesPerDay
} from '../controllers/transactionController';
import { verifyToken } from '../middlewares/authMiddleware';

export const authRoutes = Router();
// Route untuk login dengan email dan password
authRoutes.post('/login', loginWithEmailPassword);
// Route untuk login dengan OAuth
authRoutes.post('/login/oauth', loginWithOAuth);

authRoutes.get('/provinces', verifyToken, getProvinces);
authRoutes.get('/regencies/:provinceCode', verifyToken, getRegencies);
authRoutes.get('/districts/:regencyCode', verifyToken, getDistricts);
authRoutes.get('/villages/:districtCode', verifyToken, getVillages);

// Route untuk CRUD Produk
authRoutes.post('/products', verifyToken, createProduct); // Create
authRoutes.get('/products', verifyToken, getProducts); // Read
authRoutes.put('/products/:id', verifyToken, updateProduct); // Update
authRoutes.delete('/products/:id', verifyToken, deleteProduct); // Delete

// Route untuk transaksi
authRoutes.post('/transactions', verifyToken, createTransaction); // Create transaction

// Route untuk laporan
authRoutes.get('/top-customers', verifyToken, getTopCustomers);
authRoutes.get('/sales-by-city', verifyToken, getSalesByCity);
authRoutes.get('/average-sales-per-day', verifyToken, getAverageSalesPerDay); 

// Route sederhana untuk cek status API
authRoutes.get('/', (req, res) => {
  res.send('Welcome, API running');
});
