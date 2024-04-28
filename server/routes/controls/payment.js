import express from "express"
import stripeLib from "stripe";
const router = express.Router();

const STRIPE = stripeLib("sk_test_51P9G83ADBhgpSGaKwWNh9J3ksWg4l2GvfRKtYRMnwgKngUDwbOrgc6LlhAaONOTCznHBXefAadnye77RzMQgJyHn00W9nSer4f");

// create a checkout session
router.post('/create-checkout-session', async (req, res) => {
  const session = await STRIPE.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'student-membership',
          },
          unit_amount: 500,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3001/success',
    cancel_url: 'http://localhost:3001/cancel',
  });

  res.redirect(303, session.url);
});


router.post("/", async (req, res) => {
  const amount = 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await STRIPE.paymentIntents.create({
    amount: Math.round(amount),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

export default router

