const path = require("path");
const express = require("express");
const { router: adminRoute } = require("./routes/admin");
const shopRoute = require("./routes/shop");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

//one-to-many
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

//one-to-one
User.hasOne(Cart);
Cart.belongsTo(User);

//many-to-many
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//many-to-many
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

app.use("/admin", adminRoute);
app.use(shopRoute);

app.use(errorController.get404);

sequelize
  // .sync({ force: true })  // deletes all data on each run
  .sync()
  .then((res) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Husan",
        email: "abdigafurovhusan@gmail.com",
      });
    }
    return user;
  })
  .then((user) => {
    return user.getCart();
  })
  .then((user) => {
    if (!user) {
      return Cart.create({
        userId: 1,
      });
    }
    return user;
  })
  .then((res) => {
    app.listen(PORT, () => console.log(`Listening to the port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
