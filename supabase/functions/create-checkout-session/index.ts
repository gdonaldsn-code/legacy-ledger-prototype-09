// Supabase Edge Function: create-checkout-session
//
// Creates a Stripe Checkout Session for one of Legacy Ledger's three pricing
// plans. Runs server-side so the Stripe secret key never reaches the client.
//
// Deploy with:
//   npx supabase functions deploy create-checkout-session
//
// Requires the STRIPE_SECRET_KEY secret to be set first (never commit this key):
//   npx supabase secrets set STRIPE_SECRET_KEY=sk_test_...
//
// SUPABASE_URL and SUPABASE_ANON_KEY are injected automatically by the
// Supabase Edge Functions runtime — no need to set those manually.

import Stripe from "npm:stripe@17";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type PlanId = "discovery-report" | "concierge-execution" | "legacy-protection";

// Mirrors the plans shown in src/components/PricingSection.tsx. Prices are
// defined here (not as pre-created Stripe Price objects) so the plan list
// stays a single source of truth in the app code.
const PLANS: Record<
  PlanId,
  { name: string; description: string; amount: number; mode: "payment" | "subscription" }
> = {
  "discovery-report": {
    name: "AI Discovery Report",
    description: "One-time automated estate account discovery scan",
    amount: 29900,
    mode: "payment",
  },
  "concierge-execution": {
    name: "Concierge Execution",
    description: "Full-service estate account closure and asset recovery",
    amount: 69900,
    mode: "payment",
  },
  "legacy-protection": {
    name: "Legacy Protection",
    description: "Ongoing digital estate planning and monitoring",
    amount: 700, // $7/month — midpoint of the advertised $5-10 range
    mode: "subscription",
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured for this Supabase project.");
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { planId, origin } = (await req.json()) as { planId: PlanId; origin: string };
    const plan = PLANS[planId];
    if (!plan) {
      return new Response(JSON.stringify({ error: "Unknown plan" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" });

    const session = await stripe.checkout.sessions.create({
      mode: plan.mode,
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: { user_id: user.id, plan_id: planId },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: plan.name, description: plan.description },
            unit_amount: plan.amount,
            ...(plan.mode === "subscription" ? { recurring: { interval: "month" } } : {}),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?checkout=success`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
