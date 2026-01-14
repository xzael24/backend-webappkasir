# Backend API Documentation

This repository contains the backend API for the UAS Gabungan project. It uses **Node.js**, **Express**, and **MySQL** to manage data for Categories, Products, Customers, and Transactions.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- MySQL Database running
- Database schema imported (tables: `product_categories`, `products`, `customers`, `orders`, `order_details`)

### Installation & Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Make sure your database configuration in `config/database.js` or `.env` matches your local MySQL setup.

3. **Start the Server**
   ```bash
   npm run dev
   # or
   node server.js
   ```
   The server runs on **http://localhost:3000** (default).

---

## API Endpoints

The base URL for all API endpoints is: `http://localhost:3000/api`

### 1. Categories (`/categories`)
Manage product categories.

| Method | Endpoint | Description | Payload (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/categories` | Get all categories | - |
| `POST` | `/categories` | Create a category | `{ "name": "Snack" }` |
| `PUT` | `/categories/:id` | Update category | `{ "name": "New Name" }` |
| `DELETE` | `/categories/:id` | Delete category | - |

### 2. Products (`/products`)
Manage products inventory.

| Method | Endpoint | Description | Payload (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Get all products | - |
| `POST` | `/products` | Add new product | `{ "category_id": "...", "name": "...", "price": 1000, "stock": 10 }` |
| `PUT` | `/products/:id` | Update product | `{ "category_id": "...", "name": "...", "price": 1000, "stock": 10 }` |
| `DELETE` | `/products/:id` | Delete product | - |

### 3. Customers (`/customers`)
Manage customer data.

| Method | Endpoint | Description | Payload (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/customers` | Get all customers | - |
| `POST` | `/customers` | Add customer | `{ "name": "...", "email": "...", "phone": "...", "address": "...", "gender_id": "L" }` |
| `PUT` | `/customers/:id` | Update customer | `{ "name": "...", "email": "...", "phone": "...", "address": "..." }` |
| `DELETE` | `/customers/:id` | Delete customer | - |

### 4. Transactions (`/penjualan`)
Handle sales transactions.

| Method | Endpoint | Description | Payload (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/penjualan` | List all transactions | - |
| `GET` | `/penjualan/:id` | Get transaction details | - |
| `POST` | `/penjualan` | Create transaction | See example below |

**POST `/penjualan` Payload Example:**
```json
{
  "customer_id": "CUST001",
  "total_amount": 150000,
  "user_id": "CASHIER01",
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "price": 50000
    },
    {
      "product_id": 5,
      "quantity": 1,
      "price": 50000
    }
  ]
}
```

---

## Cara Konsumsi API (Example Usage)

Berikut adalah contoh cara menggunakan API ini menggunakan JavaScript (Fetch API).

### 1. Mengambil Data Produk (Get Products)
```javascript
async function getProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        console.log('Product List:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}
getProducts();
```

### 2. Melakukan Transaksi Baru (Create Transaction)
```javascript
async function createTransaction() {
    const transactionData = {
        customer_id: "CUST-X",
        total_amount: 100000,
        user_id: "ADMIN",
        items: [
            { product_id: 101, quantity: 1, price: 100000 }
        ]
    };

    try {
        const response = await fetch('http://localhost:3000/api/penjualan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        });
        const result = await response.json();
        console.log('Transaction Created:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}
createTransaction();
```
