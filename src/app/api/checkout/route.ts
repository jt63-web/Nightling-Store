import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Stripe is not yet configured — return a stub response.
    // Replace this block with real Stripe Checkout session creation:
    //
    //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' });
    //   const session = await stripe.checkout.sessions.create({ ... });
    //   return NextResponse.json({ url: session.url });

    const stubSessionId = `cs_stub_${Date.now()}`;
    return NextResponse.json({
      url: `/success?session_id=${stubSessionId}`,
      stub: true,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
