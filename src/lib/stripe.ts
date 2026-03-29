import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey)
  : null;

export const APP_URL = process.env.APP_URL ?? "http://localhost:3000";
