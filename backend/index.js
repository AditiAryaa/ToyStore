const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Stripe = require("stripe");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

console.log("Heyyyy.....");
const PORT = 8000;

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connect to Database"))
  .catch((err) => console.log(err));

// schema

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});
//
const userModel = mongoose.model("user", userSchema);
// api

app.get("/", (req, res) => {
  res.send("server is running");
});

// signup Api
app.post("/signup", async (req, res) => {
  const { email } = req.body;

  const result = await userModel.findOne({ email: email });

  if (result) {
    res.send({ message: "Email is already registered", alert: false });
  } else {
    const data = userModel(req.body);
    const save = data.save();
    res.send({ message: "successfulyy sign up", alert: true });
  }
});

// login Api
app.post("/login", async (req, res) => {
  const { email } = req.body;
  const result = await userModel.findOne({ email: email });
  if (result) {
    const dataSend = {
      _id: result._id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      image: result.image,
    };
    res.send({ message: "Login is successful", alert: true, data: dataSend });
  } else {
    res.send({
      message: "Email is not available , please Signin ",
      alert: false,
    });
  }
});

// product section

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", schemaProduct);

//save product in database
// api
app.post("/uploadProduct", async (req, res) => {
  const data = await productModel(req.body);
  const save = data.save();
  res.send({ message: "Upload successfully" });
});

//
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

// payment getway
console.log(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/checkout-payment", async (req, res) => {
  console.log(req.body);

  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1PFvcJSCn1vOHr6fFYWJ1Y7J" }],

      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session.id);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message);
  }
});

// server is running
app.listen(PORT, () => {
  console.log("server is running at port : " + PORT);
});
