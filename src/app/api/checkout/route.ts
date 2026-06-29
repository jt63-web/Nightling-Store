import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface CartItem {
  slug: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

function calcDiscount(items: CartItem[]): number {
  const allUnits = items
    .flatMap((i) => Array<number>(i.qty).fill(i.price))
    .sort((a, b) => b - a);
  let discount = 0;
  for (let i = 1; i < allUnits.length; i += 2) {
    discount += Math.round(allUnits[i] * 0.1);
  }
  return discount;
}

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nightling.store';

    const lineItems = (items as CartItem[]).map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [`${baseUrl}${item.image}`],
        },
        unit_amount: item.price,
      },
      quantity: item.qty,
    }));

    const discountAmount = calcDiscount(items as CartItem[]);

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/collection`,
    };

    if (discountAmount > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: discountAmount,
        currency: 'usd',
        duration: 'once',
        name: 'Buy 1 Get 1 10% Off',
      });
      sessionParams.discounts = [{ coupon: coupon.id }];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
