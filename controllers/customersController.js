const db = require("../config/db");

exports.getCustomers = (req, res) => {
  const query = "SELECT * FROM customers";

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

exports.createCustomer = (req, res) => {
  const { name, email, phone } = req.body;

  const query = "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)";

  db.query(query, [name, email, phone], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: "Customer created successfully" });
    }
  });
};