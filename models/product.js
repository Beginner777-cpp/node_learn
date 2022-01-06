// const fs = require("fs/promises");
// const db = require("../util/database");
// const path = require("path");
// const Cart = require("./cart");
// const getProductsFromFile = async () => {
//   const p = path.join(
//     path.dirname(process.mainModule.filename),
//     "data",
//     "products.json"
//   );
//   let products = [];
//   try {
//     products = JSON.parse(await fs.readFile(p));
//   } catch (error) {
//     products = [];
//   }

//   return products;
// };

// module.exports = class Product {
//   constructor(id, title, imageUrl, price, description) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   async save() {
//     db.execute(
//       "INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)",
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }

//   static async deleteById(id) {
//     const data = await getProductsFromFile();
//     const p = path.join(
//       path.dirname(process.mainModule.filename),
//       "data",
//       "products.json"
//     );
//     const product = data.find((p) => p.id == id);
//     const productIndex = data.findIndex((p) => p.id == id);
//     const newProducts = [...data];
//     newProducts.splice(productIndex, 1);
//     await fs.writeFile(p, JSON.stringify(newProducts));
//     await Cart.deleteProduct(id, product.price);
//   }
//   static async fetchAll() {
//     const data = await db.execute("SELECT * FROM products");
//     return data[0];
//   }
//   static async findById(id) {
//     const product = await db.execute("SELECT * from products WHERE id=?", [id]);
//     return product[0][0];
//   }
// };

const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

module.exports = Product;
