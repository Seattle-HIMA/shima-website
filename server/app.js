import express from 'express';
import path, { dirname } from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import nocache from 'nocache';
import cors from 'cors';
import 'dotenv/config'
import stripeLib from "stripe";
import apiRouter from './routes/routes.js';
import models from './models.js';
import { CLIENT_ORIGIN_URL, PORT, STRIPE_TEST_API_KEY } from './constants.js';

const STRIPE = stripeLib(STRIPE_TEST_API_KEY);

dotenv.config();

if (!(PORT && CLIENT_ORIGIN_URL)) {
    throw new Error("Missing required environment variables. Check docs for more info.");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.contentType("application/json; charset=utf-8");
    next();
});

app.use(nocache());

app.use(cors({
    origin: CLIENT_ORIGIN_URL, methods: ["GET"], allowedHeaders: ["Authorization", "Content-Type"], maxAge: 86400,
}));

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
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
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

            // add a message/loading page about successful payment
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