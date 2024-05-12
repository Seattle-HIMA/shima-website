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
import sessions from 'express-session';
import { CLIENT_ORIGIN_URL, PORT, STRIPE_TEST_API_KEY, STRIPE_TEST_WEBHOOK_SECRET, SESSION_SECRET } from './constants.js';
import { stat } from 'fs';


let apiKey = STRIPE_TEST_API_KEY
const STRIPE = stripeLib(apiKey);

dotenv.config();

if (!(PORT && CLIENT_ORIGIN_URL)) {
    throw new Error("Missing required environment variables. Check docs for more info.");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: oneDay,
      },
    resave: false
}));

app.use((req, res, next) => {
    res.contentType("application/json; charset=utf-8");
    next();
});

app.use(nocache());

app.use(cors({
    origin: CLIENT_ORIGIN_URL, methods: ["GET"], allowedHeaders: ["Authorization", "Content-Type"], maxAge: 86400
}));

// mongodb middleware
app.use((req, res, next) => {
    req.models = models;
    next();
});

let endDate;

// webhook endpoint to handle stripe events send back
app.post("/webhook", express.raw({type: 'application/json'}), async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    const webhookSecret = STRIPE_TEST_WEBHOOK_SECRET;
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

    let subscription;
    let status;
    // Handle the event
        if (eventType === 'customer.subscription.updated') {
            subscription = data.object;
            console.log(subscription);

            if(subscription.status === 'active') {
                endDate = subscription['current_period_end'];
            }
            // Then define and call a method to handle the subscription update.
            // handleSubscriptionUpdated(subscription);
        }
        if (eventType === 'checkout.session.completed') {
            subscription = data.object;
            status = subscription;
            let user = subscription.metadata;
            console.log(endDate);
            console.log("what");
            console.log(user);
            let saveData = {
                membershipType: user.product,
                expireDate: endDate
            }

            console.log(saveData);

            let updated = await models.User.findOneAndUpdate({email: user.email}, saveData, {new: true});

            console.log('after updating')
            console.log(updated);
            // Then define and call a method to handle the subscription trial ending.
            // handleSubscriptionTrialEnding(subscription);
        }
    //   case 'customer.subscription.deleted':
    //     subscription = data.object;
    //     status = subscription.status;
    //     console.log(`Subscription status is ${status}.`);
    //     // Then define and call a method to handle the subscription deleted.
    //     // handleSubscriptionDeleted(subscriptionDeleted);
    //     break;
    // Unexpected event type
    // Return a 200 response to acknowledge receipt of the event
    res.send("ok");
});

app.use(express.json());

app.use('/routes', apiRouter);

export default app;