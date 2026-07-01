import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const password = req.headers.get('x-admin-password');
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const fromTs = from ? Math.floor(new Date(from).getTime() / 1000) : undefined;
  const toTs = to ? Math.floor(new Date(to + 'T23:59:59').getTime() / 1000) : undefined;

  const listParams: Stripe.Checkout.SessionListParams = {
    limit: 100,
    expand: ['data.line_items'],
  };

  if (fromTs || toTs) {
    const range: Stripe.RangeQueryParam = {};
    if (fromTs) range.gte = fromTs;
    if (toTs) range.lte = toTs;
    listParams.created = range;
  }

  try {
    const sessions = await stripe.checkout.sessions.list(listParams);
    const paid = (sessions.data as Stripe.Checkout.Session[]).filter((s) => s.payment_status === 'paid');

    const totalRevenue = paid.reduce((sum, s) => sum + (s.amount_total ?? 0), 0);
    const totalOrders = paid.length;
    const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    // Daily data — fill every date in range so 0-order days still appear
    const startDate = from
      ? new Date(from)
      : paid.length > 0
        ? new Date(Math.min(...paid.map((s) => s.created)) * 1000)
        : new Date(Date.now() - 6 * 86_400_000);
    const endDate = to ? new Date(to) : new Date();

    const dailyMap = new Map<string, { revenue: number; orders: number }>();
    const cur = new Date(startDate);
    while (cur <= endDate) {
      dailyMap.set(cur.toISOString().split('T')[0], { revenue: 0, orders: 0 });
      cur.setDate(cur.getDate() + 1);
    }
    for (const s of paid) {
      const date = new Date(s.created * 1000).toISOString().split('T')[0];
      const existing = dailyMap.get(date) ?? { revenue: 0, orders: 0 };
      dailyMap.set(date, {
        revenue: existing.revenue + (s.amount_total ?? 0) / 100,
        orders: existing.orders + 1,
      });
    }
    const dailyData = Array.from(dailyMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({ date, ...data }));

    // Top products
    const productMap = new Map<string, { revenue: number; orders: number }>();
    for (const s of paid) {
      for (const item of s.line_items?.data ?? []) {
        const name = item.description ?? 'Product';
        const existing = productMap.get(name) ?? { revenue: 0, orders: 0 };
        productMap.set(name, {
          revenue: existing.revenue + (item.amount_total ?? 0),
          orders: existing.orders + (item.quantity ?? 1),
        });
      }
    }
    const topProducts = Array.from(productMap.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Recent orders
    const recentOrders = paid.slice(0, 30).map((s) => ({
      id: s.id,
      customerName: s.customer_details?.name ?? 'Unknown',
      email: s.customer_details?.email ?? '',
      phone: s.customer_details?.phone ?? '',
      country: s.customer_details?.address?.country ?? '—',
      amount: s.amount_total ?? 0,
      created: s.created,
      lineItems: (s.line_items?.data ?? []).map((i) => ({
        name: i.description ?? 'Product',
        quantity: i.quantity ?? 1,
        amount: i.amount_total ?? 0,
      })),
    }));

    // Revenue by country
    const byCountry: Record<string, number> = {};
    for (const s of paid) {
      const country = s.customer_details?.address?.country ?? 'Unknown';
      byCountry[country] = (byCountry[country] ?? 0) + (s.amount_total ?? 0);
    }

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      aov,
      baseCurrency: 'USD',
      dailyData,
      topProducts,
      recentOrders,
      byCountry,
      pageViews: 0,
      addToCarts: 0,
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
