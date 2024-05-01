import express from 'express';
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import 'dotenv/config'
import stripeLib from "stripe";

const STRIPE = stripeLib("sk_test_51P9G83ADBhgpSGaKwWNh9J3ksWg4l2GvfRKtYRMnwgKngUDwbOrgc6LlhAaONOTCznHBXefAadnye77RzMQgJyHn00W9nSer4f");


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import apiRouter from './routes/routes.js';
import models from './models.js';

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongodb middleware
app.use((req, res, next) => {
    req.models = models;
    next();
});

// webhook endpoint to handle stripe events send back
app.post("/webhook", express.raw({type: 'application/json'}), async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    const webhookSecret = 'whsec_a741a074a1aec754124f36c28168a61088cdeef376fcc367f9d5f909e2ce9891';
    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = await STRIPE.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(err);
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }

      // Extract the object from the event.
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }

    switch (eventType) {
      case 'checkout.session.completed':
        // Payment is successful and the subscription is created.
        // save info into db
        // connect customerID with logged in username
        console.log(data);
        console.log(`username: ${data.object}`)
        break;
      case 'invoice.paid':
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        break;
      case 'invoice.payment_failed':
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        break;
      default:
        // Unhandled event type
    }

    res.sendStatus(200);
});

app.use(express.json());

app.use('/routes', apiRouter);

export default app;