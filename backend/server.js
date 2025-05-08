require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/shops", require("./routes/shop.routes"));
app.use("/api/products", require("./routes/product.routes"));






// Sync DB และเริ่ม server
db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
