import db from '../config/database.js';

export const getUas1 = (req, res) => {
    const sql = `
        SELECT
            P.PRODUCT_NAME,
            TopSold.TotalQty
        FROM products P
        JOIN (
            SELECT OD.PRODUCT_ID, SUM(OD.QTY) as TotalQty
            FROM order_details OD
            JOIN orders O ON OD.ORDER_ID = O.ORDER_ID
            WHERE YEAR(O.ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY OD.PRODUCT_ID
            ORDER BY TotalQty DESC
            LIMIT 1
        ) TopSold ON P.PRODUCT_ID = TopSold.PRODUCT_ID;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const getUas2 = (req, res) => {
    const sql = `
        SELECT
            C.CUST_NAME,
            TopOrder.JumlahOrder
        FROM customers C
        JOIN (
            SELECT CUST_ID, COUNT(ORDER_ID) as JumlahOrder
            FROM orders
            WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY CUST_ID
            ORDER BY JumlahOrder DESC
            LIMIT 1
        ) TopOrder ON C.CUST_ID = TopOrder.CUST_ID;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const getUas3 = (req, res) => {
    const sql = `
        SELECT
            C.CUST_NAME,
            O.TOTAL as NominalOrder
        FROM customers C
        JOIN orders O ON C.CUST_ID = O.CUST_ID
        WHERE O.TOTAL = (
            SELECT MAX(TOTAL)
            FROM orders
            WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
        )
        AND YEAR(O.ORDER_DATE) = YEAR(CURDATE()) - 1;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const getUas4 = (req, res) => {
    const sql = `
        SELECT
            C.CUST_NAME,
            TopItem.TotalItems
        FROM customers C
        JOIN (
            SELECT O.CUST_ID, SUM(OD.QTY) as TotalItems
            FROM orders O
            JOIN order_details OD ON O.ORDER_ID = OD.ORDER_ID
            WHERE YEAR(O.ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY O.CUST_ID
            ORDER BY TotalItems DESC
            LIMIT 1
        ) TopItem ON C.CUST_ID = TopItem.CUST_ID;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const getUas5 = (req, res) => {
    const sql = `
        SELECT
            P.PRODUCT_NAME,
            SoldData.TotalQty
        FROM products P
        JOIN (
            SELECT OD.PRODUCT_ID, SUM(OD.QTY) as TotalQty
            FROM order_details OD
            JOIN orders O ON OD.ORDER_ID = O.ORDER_ID
            WHERE YEAR(O.ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY OD.PRODUCT_ID
            ORDER BY TotalQty DESC
            LIMIT 10
        ) SoldData ON P.PRODUCT_ID = SoldData.PRODUCT_ID;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const getUas6 = (req, res) => {
    const sql = `
        SELECT
            P.PRODUCT_NAME,
            MonthlyStats.Bulan,
            MonthlyStats.Revenue
        FROM products P
        JOIN (
            SELECT
                OD.PRODUCT_ID,
                MONTH(O.ORDER_DATE) as Bulan,
                SUM(OD.QTY * OD.PRICE) as Revenue
            FROM order_details OD
            JOIN orders O ON OD.ORDER_ID = O.ORDER_ID
            WHERE YEAR(O.ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY OD.PRODUCT_ID, MONTH(O.ORDER_DATE)
        ) MonthlyStats ON P.PRODUCT_ID = MonthlyStats.PRODUCT_ID
        ORDER BY P.PRODUCT_NAME, MonthlyStats.Bulan;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const getUas7 = (req, res) => {
    const sql = `
        SELECT
            P.PRODUCT_NAME,
            MonthlyStats.Bulan,
            MonthlyStats.JumlahTerjual
        FROM products P
        JOIN (
            SELECT
                OD.PRODUCT_ID,
                MONTH(O.ORDER_DATE) as Bulan,
                SUM(OD.QTY) as JumlahTerjual
            FROM order_details OD
            JOIN orders O ON OD.ORDER_ID = O.ORDER_ID
            WHERE YEAR(O.ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY OD.PRODUCT_ID, MONTH(O.ORDER_DATE)
        ) MonthlyStats ON P.PRODUCT_ID = MonthlyStats.PRODUCT_ID
        ORDER BY P.PRODUCT_NAME, MonthlyStats.Bulan;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const getUas8 = (req, res) => {
    const sql = `
        SELECT
            C.CUST_NAME,
            CustStats.Bulan,
            CustStats.JumlahOrder
        FROM customers C
        JOIN (
            SELECT
                CUST_ID,
                MONTH(ORDER_DATE) as Bulan,
                COUNT(ORDER_ID) as JumlahOrder
            FROM orders
            WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY CUST_ID, MONTH(ORDER_DATE)
        ) CustStats ON C.CUST_ID = CustStats.CUST_ID
        ORDER BY C.CUST_NAME, CustStats.Bulan;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const getUas9 = (req, res) => {
    const sql = `
        SELECT
            C.CUST_NAME,
            CustStats.Bulan,
            CustStats.TotalNominal
        FROM customers C
        JOIN (
            SELECT
                CUST_ID,
                MONTH(ORDER_DATE) as Bulan,
                SUM(TOTAL) as TotalNominal
            FROM orders
            WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY CUST_ID, MONTH(ORDER_DATE)
        ) CustStats ON C.CUST_ID = CustStats.CUST_ID
        ORDER BY C.CUST_NAME, CustStats.Bulan;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const getUas10 = (req, res) => {
    const sql = `
        SELECT
            K.USERNAME as Nama_Kasir,
            CashierStats.Bulan,
            CashierStats.JumlahLayanan
        FROM cashiers K
        JOIN (
            SELECT
                USER_ID,
                MONTH(ORDER_DATE) as Bulan,
                COUNT(ORDER_ID) as JumlahLayanan
            FROM orders
            WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY USER_ID, MONTH(ORDER_DATE)
        ) CashierStats ON K.USER_ID = CashierStats.USER_ID
        ORDER BY K.USERNAME, CashierStats.Bulan;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
