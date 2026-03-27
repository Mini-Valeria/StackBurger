const db = require("../config/db");

exports.getProducts = (req, res) => {
  const query = "SELECT * FROM products";

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;

  const query = "INSERT INTO products (name, price) VALUES (?, ?)";

  db.query(query, [name, price], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: "Product created successfully" });
    }
  });
};