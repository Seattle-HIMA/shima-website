import express from "express"
import stripeLib from "stripe";
const router = express.Router();

const STRIPE = stripeLib("sk_test_51P9G83ADBhgpSGaKwWNh9J3ksWg4l2GvfRKtYRMnwgKngUDwbOrgc6LlhAaONOTCznHBXefAadnye77RzMQgJyHn00W9nSer4f");
const endpointSecret = "whsec_a741a074a1aec754124f36c28168a61088cdeef376fcc367f9d5f909e2ce9891";

// list of "products" (memberships and workshops)
const student = await STRIPE.products.create({
  name: 'Student membership',
});

const professional = await STRIPE.products.create({
  name: 'Professional membership',
});

// prices for each product
const studentPrice = await STRIPE.prices.create({
  currency: 'usd',
  product: student.id,
  unit_amount: 1000,
  recurring: {
    interval: 'year',
  }
});

const profPrice = await STRIPE.prices.create({
  currency: 'usd',
  product: professional.id,
  unit_amount: 2500,
  recurring: {
    interval: 'year',
  }
});

// retrieve products' price id
router.get('/get-product-id', (req, res) => {
  res.json({"student_id": studentPrice.id, "prof_id": profPrice.id});
});

// create a checkout session for subscription (membership)
router.post('/create-checkout-session', async (req, res) => {
  const { id } = req.body;

  const session = await STRIPE.checkout.sessions.create({
    line_items: [
      {
        price: id,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: 'Membership?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'Membership'
  });

  res.json({url: session.url});
});

// create a checkout session for one time payment
router.post('/workshop-checkout-session', async (req, res) => {
  const productId = req.body.id;

  const session = await STRIPE.checkout.sessions.create({
    line_items: [
      {
        price: productId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: '/Membership',
    cancel_url: '/Membership',
  });

  res.json({url: session.url});
});

export default router