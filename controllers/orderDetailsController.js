const db = require("../config/db");

// Obtener todos los detalles de orden
exports.getOrderDetails = (req, res) => {
  const query = `
    SELECT od.detail_id, od.order_id, od.product_id, p.name AS product_name,
           od.quantity, od.price
    FROM order_details od
    JOIN products p ON od.product_id = p.product_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

// Crear detalle de orden
exports.createOrderDetail = (req, res) => {
  const { order_id, product_id, quantity, price } = req.body;

  const query =
    "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";

  db.query(query, [order_id, product_id, quantity, price], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        message: "Order detail created successfully",
        detailId: result.insertId
      });
    }
  });
};