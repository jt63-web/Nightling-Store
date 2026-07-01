import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const session = event.data.object as Stripe.Checkout.Session;

    const full = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items'],
    });

    const name    = full.customer_details?.name ?? 'Customer';
    const email   = full.customer_details?.email ?? '';
    const phone   = full.customer_details?.phone ?? '';
    const country = full.customer_details?.address?.country ?? '';
    const total   = ((full.amount_total ?? 0) / 100).toFixed(2);

    const itemsHtml = (full.line_items?.data ?? [])
      .map((i) => `<tr>
        <td style="padding:6px 0;color:#333;">${i.description} &times; ${i.quantity ?? 1}</td>
        <td style="padding:6px 0;color:#333;text-align:right;">$${((i.amount_total ?? 0) / 100).toFixed(2)}</td>
      </tr>`)
      .join('');

    await resend.emails.send({
      from: 'Nightling Orders <onboarding@resend.dev>',
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New order from ${name} — $${total} USD`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#fff;padding:32px;">
          <p style="font-size:28px;margin:0 0 4px;">✦</p>
          <h2 style="margin:0 0 24px;color:#1F2A44;font-size:20px;">New Nightling Order</h2>

          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr><td style="color:#888;padding:4px 0;width:100px;">Customer</td><td style="color:#1F2A44;font-weight:600;">${name}</td></tr>
            <tr><td style="color:#888;padding:4px 0;">Email</td><td style="color:#1F2A44;">${email}</td></tr>
            ${phone   ? `<tr><td style="color:#888;padding:4px 0;">Phone</td><td style="color:#1F2A44;">${phone}</td></tr>` : ''}
            ${country ? `<tr><td style="color:#888;padding:4px 0;">Country</td><td style="color:#1F2A44;">${country}</td></tr>` : ''}
          </table>

          <table style="width:100%;border-collapse:collapse;border-top:1px solid #eee;border-bottom:1px solid #eee;margin-bottom:20px;">
            ${itemsHtml}
            <tr>
              <td style="padding:10px 0;font-weight:700;color:#1F2A44;">Total</td>
              <td style="padding:10px 0;font-weight:700;color:#FFB957;text-align:right;">$${total} USD</td>
            </tr>
          </table>

          <a href="https://dashboard.stripe.com/payments" style="display:inline-block;background:#1F2A44;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:13px;">View in Stripe</a>

          <p style="margin-top:24px;font-size:11px;color:#aaa;">Nightling &bull; nightling.store</p>
        </div>
      `,
    });
  }

  return NextResponse.json({ received: true });
}
