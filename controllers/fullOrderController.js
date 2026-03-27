const db = require("../config/db");
const firestore = require("../config/firebase");

exports.createFullOrder = (req, res) => {
  const { customer, items } = req.body;

  const insertCustomer =
    "INSERT INTO customers (name, email, phone) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE customer_id = LAST_INSERT_ID(customer_id)";

  // MySQL
  db.query(
    insertCustomer,
    [customer.name, customer.email, customer.phone],
    (err, customerResult) => {

      if (err) return res.status(500).send(err);

      const customer_id = customerResult.insertId;

      let total = 0;

      items.forEach((item) => {
        total += item.price * item.quantity;
      });

      const insertOrder =
        "INSERT INTO orders (customer_id, total, status_order) VALUES (?, ?, ?)";

      db.query(
        insertOrder,
        [customer_id, total, "pending"],
        (err, orderResult) => {

          if (err) return res.status(500).send(err);

          const order_id = orderResult.insertId;

          const insertDetail =
            "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";

          items.forEach((item) => {

            db.query(insertDetail, [
              order_id,
              item.product_id,
              item.quantity,
              item.price
            ]);

          });

          // Firestore
          firestore.collection("orders").add({
            order_id: order_id,
            customer_id: customer_id,
            customer_name: customer.name,
            total: total,
            status: "pending",
            createdAt: new Date(),
            items: items
          });

          res.json({
            message: "Full order created successfully",
            order_id: order_id
          });

        }
      );

    }
  );


};