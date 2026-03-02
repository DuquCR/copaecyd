import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export const INSCRIPTION_PRICE = Number(
  process.env.INSCRIPTION_PRICE_CENTS || "15000"
);
