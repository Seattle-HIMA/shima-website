import express from "express"
import stripeLib from "stripe";
import { CLIENT_ORIGIN_URL, STRIPE_TEST_API_KEY } from '../../constants.js';

const router = express.Router();

const STRIPE = stripeLib(STRIPE_TEST_API_KEY);
const REDIRECTURL = CLIENT_ORIGIN_URL + '/Membership';
const SUCCESSURL = CLIENT_ORIGIN_URL + '/Payment-Success';

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
    const {id, email, type} = req.body;

    req.session.email = email;

    const session = await STRIPE.checkout.sessions.create({
        line_items: [
            {
                price: id,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: SUCCESSURL + `?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: REDIRECTURL,
        metadata: {
            email: email,
            product: type
        }
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
        success_url: REDIRECTURL,
        cancel_url: REDIRECTURL
    });

    res.json({url: session.url});
});

export default router;