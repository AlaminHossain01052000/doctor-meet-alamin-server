// const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// exports.processPayment = catchAsyncErrors(async (req, res, next) => {
//     const myPayment = await stripe.paymentIntents.create({
//         amount: req.body.amount,
//         currency: "inr",
//         metadata: {
//             company: "Ecommerce",
//         },
//     });

//     res
//         .status(200)
//         .json({ success: true, client_secret: myPayment.client_secret });
// });

// exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
//     res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
// });

// const stripe = require('stripe')('sk_test_51JwY7aFnvKDZKnOoETmM1JVsArI5Djz9YaHVLRQWN6d5jhponejKchYl9rg69M23Z3dfHfRIJzTX4UX9ZbpbW1rL00kdZ1CeSX');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:5000';

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//           price_data:{
//               currency:'BDT',
//               product_data:{
//                   name:paymentObj.username
//               }
//           },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}/payments-ap?success=true`,
//     cancel_url: `${YOUR_DOMAIN}/payments-ap?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });
