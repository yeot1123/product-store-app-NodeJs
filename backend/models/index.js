const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  pool: dbConfig.pool,
});



//Test Connection
// sequelize.authenticate()
//   .then(() => {
//     console.log("✅ Connected to the database successfully.");
//   })
//   .catch(err => {
//     console.error("❌ Unable to connect to the database:", err);
//   });
  

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Shop = require("./shop.model")(sequelize, DataTypes);
db.Product = require("./product.model")(sequelize, DataTypes);

// ความสัมพันธ์: 1 ร้านมีหลายสินค้า
db.Shop.hasMany(db.Product);
db.Product.belongsTo(db.Shop);

module.exports = db;
