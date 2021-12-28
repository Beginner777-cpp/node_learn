const path = require("path");
const express = require("express");
const { router: adminRoute } = require("./routes/admin");
const shopRoute = require("./routes/shop");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoute);
app.use(shopRoute);

app.use("/", (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Listening to the port ${PORT}`));
