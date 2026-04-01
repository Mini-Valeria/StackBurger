const express = require("express");
const cors = require("cors");

const firestore = require("./config/firebase");

const productsRoutes = require("./routes/productsRoutes");
const customersRoutes = require("./routes/customersRoutes");
const userRoutes = require("./routes/userRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const orderDetailsRoutes = require("./routes/orderDetailsRoutes");
const fullOrderRoutes = require("./routes/fullOrderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", productsRoutes);
app.use("/api", customersRoutes);
app.use("/api", userRoutes);
app.use("/api", ordersRoutes);
app.use("/api", orderDetailsRoutes);
app.use("/api", fullOrderRoutes);

app.get("/api", (req, res) => {
  res.send("Restaurant API running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});