

module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("shop", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Shop;
};
