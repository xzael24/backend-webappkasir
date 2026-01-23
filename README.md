# Backend API Documentation

This repository contains the backend API for the UAS Gabungan project. It uses **Node.js**, **Express**, and **MySQL** to manage data for Categories, Products, Customers, and Transactions.

## Public Live API

API ini sudah dideploy dan bisa diakses secara publik (tanpa perlu setup lokal) di URL berikut:

> **Base URL:** `https://backend-webappkasir-production.up.railway.app/api`

Anda bisa langsung menggunakan URL di atas untuk project frontend Anda tanpa harus menjalankan backend ini di localhost.

---

## API Endpoints

Semua endpoint di bawah ini bisa diakses dengan menggabungkan **Base URL** + **Endpoint Path**.

Contoh: `https://backend-webappkasir-production.up.railway.app/api/products`

### 1. Categories (`/categories`)

Manage product categories.

| Method   | Endpoint          | Description        | Payload (JSON)           |
| :------- | :---------------- | :----------------- | :----------------------- |
| `GET`    | `/categories`     | Get all categories | -                        |
| `POST`   | `/categories`     | Create a category  | `{ "name": "Snack" }`    |
| `PUT`    | `/categories/:id` | Update category    | `{ "name": "New Name" }` |
| `DELETE` | `/categories/:id` | Delete category    | -                        |

### 2. Products (`/products`)

Manage products inventory.

| Method   | Endpoint        | Description      | Payload (JSON)                                                        |
| :------- | :-------------- | :--------------- | :-------------------------------------------------------------------- |
| `GET`    | `/products`     | Get all products | -                                                                     |
| `POST`   | `/products`     | Add new product  | `{ "category_id": "...", "name": "...", "price": 1000, "stock": 10 }` |
| `PUT`    | `/products/:id` | Update product   | `{ "category_id": "...", "name": "...", "price": 1000, "stock": 10 }` |
| `DELETE` | `/products/:id` | Delete product   | -                                                                     |

### 3. Customers (`/customers`)

Manage customer data.

| Method   | Endpoint         | Description       | Payload (JSON)                                                                          |
| :------- | :--------------- | :---------------- | :-------------------------------------------------------------------------------------- |
| `GET`    | `/customers`     | Get all customers | -                                                                                       |
| `POST`   | `/customers`     | Add customer      | `{ "name": "...", "email": "...", "phone": "...", "address": "...", "gender_id": "L" }` |
| `PUT`    | `/customers/:id` | Update customer   | `{ "name": "...", "email": "...", "phone": "...", "address": "..." }`                   |
| `DELETE` | `/customers/:id` | Delete customer   | -                                                                                       |

### 4. Transactions (`/penjualan`)

Handle sales transactions.

| Method | Endpoint         | Description             | Payload (JSON)    |
| :----- | :--------------- | :---------------------- | :---------------- |
| `GET`  | `/penjualan`     | List all transactions   | -                 |
| `GET`  | `/penjualan/:id` | Get transaction details | -                 |
| `POST` | `/penjualan`     | Create transaction      | See example below |

**POST `/penjualan` Payload Example:**

```json
{
  "customer_id": "24090064",
  "user_id": "12345678",
  "total_amount": 150000,
  "items": [
    { "product_id": 2151,
      "quantity": 2,
      "price": 50000
    },
    { "product_id": 2187,
      "quantity": 1,
      "price": 50000 }
  ]
}
```

---

### 5. Jawaban UAS (`/uas`)

API untuk mendapatkan jawaban soal UAS no 1-10 secara langsung.

| Method | Endpoint  | Description                                            |
| :----- | :-------- | :----------------------------------------------------- |
| `GET`  | `/uas/1`  | Produk paling banyak dibeli tahun sebelumnya           |
| `GET`  | `/uas/2`  | Customer paling banyak order tahun sebelumnya          |
| `GET`  | `/uas/3`  | Customer dengan nilai order terbesar tahun sebelumnya  |
| `GET`  | `/uas/4`  | Customer dengan jumlah item terbanyak tahun sebelumnya |
| `GET`  | `/uas/5`  | 10 Produk terlaris tahun sebelumnya                    |
| `GET`  | `/uas/6`  | Profit penjualan bulanan per produk                    |
| `GET`  | `/uas/7`  | Jumlah penjualan bulanan per produk                    |
| `GET`  | `/uas/8`  | Jumlah order bulanan per customer                      |
| `GET`  | `/uas/9`  | Total nominal order bulanan per customer               |
| `GET`  | `/uas/10` | Jumlah layanan bulanan per kasir                       |

---

## Cara Konsumsi API (Example Usage)

Berikut adalah contoh kode JavaScript untuk menggunakan API Publik ini.

### 1. Mengambil Data Produk (Get Products)

```javascript
const API_URL = "https://backend-webappkasir-production.up.railway.app/api";

async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    console.log("Product List:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getProducts();
```

### 2. Melakukan Transaksi Baru (Create Transaction)

```javascript
const API_URL = "https://backend-webappkasir-production.up.railway.app/api";

async function createTransaction() {
  const transactionData = {
    customer_id: "CUST-X",
    total_amount: 100000,
    user_id: "ADMIN",
    items: [{ product_id: 101, quantity: 1, price: 100000 }],
  };

  try {
    const response = await fetch(`${API_URL}/penjualan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });
    const result = await response.json();
    console.log("Transaction Created:", result);
  } catch (error) {
    console.error("Error creating transaction:", error);
  }
}

createTransaction();
```

---

## (Optional) Menjalankan di Localhost

Jika Anda tetap ingin menjalankan backend ini di komputer sendiri:

1. **Install Dependencies**: `npm install`
2. **Setup Database**: Pastikan MySQL berjalan dan import schema database.
3. **Configure .env**: Sesuaikan `DB_HOST`, `DB_USER`, dll.
4. **Run Server**: `npm run dev`
