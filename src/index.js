const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const homeRouter = require('./routes/homeRoutes');
app.use("/",homeRouter)

app.use(cors());
app.use(bodyParser.json());

const authRoutes=require('./routes/authRoutes.js');
app.use("/auth",authRoutes);

const userRoutes = require('./routes/userRoutes.js');
app.use("/api/users", userRoutes);

const restaurantRoutes = require('./routes/restaurantRoutes.js');
app.use("/api/restaurants", restaurantRoutes);

const orderRoutes = require('./routes/orderRoutes.js');
app.use("/api/orders", orderRoutes);

module.exports = {app};