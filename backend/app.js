const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express()
const CONFIG = require('./config/config')
const productRoutes = require('./routes/product')
const deliveryInfoRoutes = require("./routes/deliveryInfo")
app.use(cors());
mongoose
  .connect(process.env.database || CONFIG.DATBASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(
    () => {
      console.log("Connected to database");
    },
    err => {
      console.log(err);
      console.log("Connection Failed");
    }
  );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/delivery_info",deliveryInfoRoutes)
app.use("/product",productRoutes);
app.use(express.static('public'))
app.listen(CONFIG.PORT, () => {
    console.log("Server is running at",CONFIG.PORT )

})