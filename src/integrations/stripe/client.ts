import { loadStripe, type Stripe } from "@stripe/stripe-js";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.warn(
    "VITE_STRIPE_PUBLISHABLE_KEY is not set. Payment features will not work until it is configured in .env."
  );
}

let stripePromise: Promise<Stripe | null> | null = null;

// Lazily load Stripe.js once and reuse the same promise on subsequent calls.
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey ?? "");
  }
  return stripePromise;
};

export type PricingPlanId = "discovery-report" | "concierge-execution" | "legacy-protection";
