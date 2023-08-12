const express = require("express");
const connectDb = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const notFound = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./api/user/user.routes");
const itemRoutes = require("./api/item/item.routes");
const laundryRoutes = require("./api/laundry/laundry.routes");
const basketRoutes = require("./api/basket/basket.routes");
const reviewRoutes = require("./api/review/review.routes");
const receiptRoutes = require("./api/receipt/receipt.routes");
const serviceRoutes = require("./api/service/service.routes");
const adressRoutes = require("./api/adress/adress.routes")
const config = require("./config/keys");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const app = express();

app.use(cors());
connectDb();
app.use(express.json());
app.use(morgan("dev"));

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use(jwtStrategy);

// Everything with the word temp is a placeholder that you'll change in accordance with your project
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/user", userRoutes);
app.use("/item", itemRoutes);
app.use("/laundry", laundryRoutes);
app.use("/basket", basketRoutes);
app.use("/review", reviewRoutes);
app.use("/receipt", receiptRoutes);
app.use("/service", serviceRoutes);
app.use("/adress", adressRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on PORT:${PORT}`);
});

module.exports = app;
