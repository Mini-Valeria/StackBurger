const db = require("../config/db");

exports.getOrders = (req, res) => {
  const query = `
  SELECT 
    o.order_id,
    o.order_date,
    o.total,
    o.status_order,
    c.name,
    c.email
  FROM orders o
  JOIN customers c 
  ON o.customer_id = c.customer_id
  ORDER BY o.order_date DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

exports.createOrder = (req, res) => {
  const { customer_id, total, status_order } = req.body;

  const query = "INSERT INTO orders (customer_id, total, status_order) VALUES (?, ?, ?)";

  db.query(query, [customer_id, total, status_order], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        message: "Order created successfully",
        orderId: result.insertId
      });
    }
  });
};

const firestore = require("../config/firebase");

exports.updateOrderStatus = (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  console.log("🔥 ID recibido:", id);

  const query = "UPDATE orders SET status_order = ? WHERE order_id = ?";

  db.query(query, [status, id], async (err, result) => {

    if (err) return res.status(500).send(err);

    try {

      console.log("🔥 Entrando a Firestore...");

      const snapshot = await firestore
        .collection("orders")
        .where("order_id", "==", parseInt(id))
        .get();

      console.log("🔥 Snapshot size:", snapshot.size);

      snapshot.forEach(doc => {
        console.log("🔥 Updating doc:", doc.id);
        doc.ref.update({ status: status });
      });

      res.json({ message: "Status updated successfully" });

    } catch (error) {
      console.error("🔥 FIRESTORE ERROR:", error); // 👈 ESTE ES CLAVE
      res.status(500).send(error);
    }

  });

};

exports.deleteOrder = (req, res) => {

  const { id } = req.params;

  const deleteDetails = "DELETE FROM order_details WHERE order_id = ?";

  db.query(deleteDetails, [id], (err) => {

    if (err) return res.status(500).send(err);

    const deleteOrder = "DELETE FROM orders WHERE order_id = ?";

    db.query(deleteOrder, [id], async (err) => {

      if (err) return res.status(500).send(err);

      try {

        const snapshot = await firestore
          .collection("orders")
          .where("order_id", "==", parseInt(id))
          .get();

        snapshot.forEach(doc => {
          doc.ref.delete();
        });

        res.json({ message: "Order deleted successfully" });

      } catch (error) {
        res.status(500).send(error);
      }

    });

  });

};