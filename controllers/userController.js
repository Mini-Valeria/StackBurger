const db = require("../config/db");

exports.syncUser = (req, res) => {

  const { name, email, google_id } = req.body;

  const findUser = "SELECT * FROM customers WHERE email = ?";

  db.query(findUser, [email], (err, result) => {

    if (err) return res.status(500).send(err);

    // Si el usuario ya existe
    if (result.length > 0) {

      return res.json({
        message: "User already exists",
        customer_id: result[0].customer_id
      });

    }

    // Si no existe lo creamos
    const insertUser =
      "INSERT INTO customers (name, email, google_id) VALUES (?, ?, ?)";

    db.query(insertUser, [name, email, google_id], (err, data) => {

      if (err) return res.status(500).send(err);

      res.json({
        message: "User created",
        customer_id: data.insertId
      });

    });

  });

};