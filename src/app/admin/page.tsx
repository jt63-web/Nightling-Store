'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DailyPoint { date: string; revenue: number; orders: number }
interface Product { name: string; revenue: number; orders: number }
interface LineItem { name: string; quantity: number; amount: number }
interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  country: string;
  amount: number;
  created: number;
  lineItems: LineItem[];
}
interface Stats {
  totalRevenue: number;
  totalOrders: number;
  aov: number;
  baseCurrency: string;
  dailyData: DailyPoint[];
  topProducts: Product[];
  recentOrders: Order[];
  byCountry: Record<string, number>;
}

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'GBP', symbol: '£' },
  { code: 'EUR', symbol: '€' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'NZD', symbol: 'NZ$' },
];

const PRESETS = [
  { key: 'today',     label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: '7d',        label: '7 Days' },
  { key: '30d',       label: '30 Days' },
  { key: 'thisWeek',  label: 'This Week' },
  { key: 'thisMonth', label: 'This Month' },
  { key: 'allTime',   label: 'All Time' },
  { key: 'custom',    label: 'Custom' },
];

const BG     = '#0F1623';
const CARD   = '#1A2336';
const BORDER = '#2A3550';
const TEXT   = '#E8EAF0';
const MUTED  = '#8892A4';
const ACCENT = '#FFB957';

function buildDateRange(preset: string, customFrom: string, customTo: string) {
  const now = new Date();
  const fmt = (d: Date) => d.toISOString().split('T')[0];
  if (preset === 'today') return { from: fmt(now), to: fmt(now) };
  if (preset === 'yesterday') {
    const y = new Date(now); y.setDate(y.getDate() - 1);
    return { from: fmt(y), to: fmt(y) };
  }
  if (preset === '7d') {
    const s = new Date(now); s.setDate(s.getDate() - 6);
    return { from: fmt(s), to: fmt(now) };
  }
  if (preset === '30d') {
    const s = new Date(now); s.setDate(s.getDate() - 29);
    return { from: fmt(s), to: fmt(now) };
  }
  if (preset === 'thisWeek') {
    const s = new Date(now); s.setDate(s.getDate() - s.getDay());
    return { from: fmt(s), to: fmt(now) };
  }
  if (preset === 'thisMonth') {
    return { from: fmt(new Date(now.getFullYear(), now.getMonth(), 1)), to: fmt(now) };
  }
  if (preset === 'allTime') return { from: '', to: '' };
  return { from: customFrom, to: customTo };
}

function timeAgo(ts: number): string {
  const diff = Date.now() / 1000 - ts;
  if (diff < 60)    return `${Math.floor(diff)}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function Pill({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 11px', borderRadius: 8, fontSize: 11, fontWeight: 700,
        whiteSpace: 'nowrap', border: 'none', cursor: 'pointer', flexShrink: 0,
        backgroundColor: active ? ACCENT : CARD,
        color: active ? '#1F2A44' : MUTED,
      }}
    >
      {children}
    </button>
  );
}

export default function AdminPage() {
  const [password, setPassword]         = useState('');
  const [authed, setAuthed]             = useState(false);
  const [stats, setStats]               = useState<Stats | null>(null);
  const [loading, setLoading]           = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError]               = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [chartMetric, setChartMetric]   = useState<'revenue' | 'orders'>('revenue');
  const [preset, setPreset]             = useState('7d');
  const [customFrom, setCustomFrom]     = useState('');
  const [customTo, setCustomTo]         = useState('');
  const [displayCurrency, setDisplayCurrency] = useState('AUD');
  const [rates, setRates]               = useState<Record<string, number>>({ USD: 1 });
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const savedPw   = useRef('');
  const skipFirst = useRef(true);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((d: { rates?: Record<string, number> }) => { if (d.rates) setRates(d.rates); })
      .catch(() => {});
  }, []);

  const doFetch = useCallback(async (pset: string, cfrom: string, cto: string): Promise<Stats | null> => {
    const { from, to } = buildDateRange(pset, cfrom, cto);
    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to)   params.set('to', to);
    const url = `/api/admin/stats${params.toString() ? '?' + params : ''}`;
    const res = await fetch(url, { headers: { 'x-admin-password': savedPw.current } });
    if (!res.ok) return null;
    return res.json() as Promise<Stats>;
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError('');
    savedPw.current = password;
    const data = await doFetch(preset, customFrom, customTo);
    setLoading(false);
    if (!data) { setError('Incorrect password'); return; }
    setStats(data);
    setLastRefreshed(new Date());
    skipFirst.current = true;
    setAuthed(true);
  }

  useEffect(() => {
    if (!authed) return;
    if (skipFirst.current) { skipFirst.current = false; return; }
    setChartLoading(true);
    doFetch(preset, customFrom, customTo).then((data) => {
      if (data) { setStats(data); setLastRefreshed(new Date()); }
      setChartLoading(false);
    });
  }, [preset, customFrom, customTo, authed, doFetch]);

  useEffect(() => {
    if (!authed) return;
    const id = setInterval(async () => {
      const data = await doFetch(preset, customFrom, customTo);
      if (data) { setStats(data); setLastRefreshed(new Date()); }
    }, 30_000);
    return () => clearInterval(id);
  }, [authed, preset, customFrom, customTo, doFetch]);

  const currInfo    = CURRENCIES.find((c) => c.code === displayCurrency) ?? CURRENCIES[0];
  const displayRate = rates[displayCurrency] ?? 1;
  const baseRate    = rates[stats?.baseCurrency ?? 'USD'] ?? 1;

  function cvt(cents: number): string {
    const amount = (cents / 100) / baseRate * displayRate;
    return `${currInfo.symbol}${amount.toFixed(2)}`;
  }
  function cvtBase(dollars: number): number {
    return parseFloat((dollars / baseRate * displayRate).toFixed(2));
  }

  // ── Login screen ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', backgroundColor: BG,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          <p style={{ color: ACCENT, fontSize: 34, textAlign: 'center', marginBottom: 6 }}>✦</p>
          <h1 style={{ color: TEXT, fontSize: 22, fontWeight: 700, textAlign: 'center', margin: '0 0 4px' }}>
            Nightling
          </h1>
          <p style={{ color: MUTED, fontSize: 13, textAlign: 'center', margin: '0 0 28px' }}>
            Admin Dashboard
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              style={{
                display: 'block', width: '100%', padding: '12px 16px', borderRadius: 12,
                backgroundColor: CARD, border: `1px solid ${error ? ACCENT : BORDER}`,
                color: TEXT, fontSize: 15, outline: 'none',
                boxSizing: 'border-box', marginBottom: 10,
              }}
            />
            {error && <p style={{ color: ACCENT, fontSize: 13, margin: '0 0 10px' }}>{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              style={{
                display: 'block', width: '100%', padding: '12px 16px', borderRadius: 12,
                backgroundColor: ACCENT, color: '#1F2A44', fontSize: 15, fontWeight: 700,
                border: 'none', cursor: loading || !password ? 'not-allowed' : 'pointer',
                opacity: loading || !password ? 0.6 : 1,
              }}
            >
              {loading ? 'Checking…' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ────────────────────────────────────────────────────────────────
  const chartData = (stats?.dailyData ?? []).map((d) => ({ ...d, revenue: cvtBase(d.revenue) }));
  const uniqueCountries = Object.keys(stats?.byCountry ?? {}).length;
  const countryEntries  = Object.entries(stats?.byCountry ?? {}).sort(([, a], [, b]) => b - a).slice(0, 8);

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', backgroundColor: BG, color: TEXT }}>

      {/* Admin header */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 40,
        backgroundColor: CARD, borderBottom: `1px solid ${BORDER}`,
        padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ color: TEXT, fontWeight: 700, fontSize: 15 }}>
          <span style={{ color: ACCENT }}>✦</span> Nightling Admin
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {lastRefreshed && (
            <span style={{ color: MUTED, fontSize: 11 }}>
              Updated {lastRefreshed.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={() => {
              setChartLoading(true);
              doFetch(preset, customFrom, customTo).then((data) => {
                if (data) { setStats(data); setLastRefreshed(new Date()); }
                setChartLoading(false);
              });
            }}
            style={{
              backgroundColor: 'transparent', border: `1px solid ${BORDER}`,
              color: TEXT, borderRadius: 8, padding: '5px 12px', fontSize: 12, cursor: 'pointer',
            }}
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Controls bar */}
      <div style={{
        position: 'sticky', top: 117, zIndex: 30,
        backgroundColor: BG, borderBottom: `1px solid ${BORDER}`, padding: '10px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, overflow: 'hidden' }}>
          <span style={{ color: MUTED, fontSize: 11, flexShrink: 0 }}>CCY</span>
          <div style={{ display: 'flex', gap: 5, overflowX: 'auto' }}>
            {CURRENCIES.map((c) => (
              <Pill key={c.code} active={displayCurrency === c.code} onClick={() => setDisplayCurrency(c.code)}>
                {c.code}
              </Pill>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
          <span style={{ color: MUTED, fontSize: 11, flexShrink: 0 }}>DATE</span>
          <div style={{ display: 'flex', gap: 5, overflowX: 'auto' }}>
            {PRESETS.map((p) => (
              <Pill key={p.key} active={preset === p.key} onClick={() => setPreset(p.key)}>
                {p.label}
              </Pill>
            ))}
          </div>
        </div>
        {preset === 'custom' && (
          <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
            <input
              type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)}
              style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, color: TEXT, borderRadius: 8, padding: '4px 8px', fontSize: 12 }}
            />
            <span style={{ color: MUTED }}>to</span>
            <input
              type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)}
              style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, color: TEXT, borderRadius: 8, padding: '4px 8px', fontSize: 12 }}
            />
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '24px 20px',
        opacity: chartLoading ? 0.4 : 1, transition: 'opacity 0.2s',
        pointerEvents: chartLoading ? 'none' : 'auto',
      }}>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '💰', label: 'Revenue',   value: cvt(stats?.totalRevenue ?? 0) },
            { icon: '📦', label: 'Orders',    value: String(stats?.totalOrders ?? 0) },
            { icon: '🧾', label: 'Avg Order', value: cvt(stats?.aov ?? 0) },
            { icon: '🌍', label: 'Countries', value: String(uniqueCountries) },
          ].map((card) => (
            <div key={card.label} style={{
              backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px',
            }}>
              <p style={{ color: MUTED, fontSize: 12, margin: '0 0 6px' }}>{card.icon} {card.label}</p>
              <p style={{ color: TEXT, fontSize: 26, fontWeight: 700, margin: 0 }}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Line chart */}
        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <p style={{ color: TEXT, fontWeight: 600, fontSize: 14, margin: 0 }}>
              {chartMetric === 'revenue' ? 'Revenue over time' : 'Orders over time'}
            </p>
            <div style={{ display: 'flex', gap: 6 }}>
              {(['revenue', 'orders'] as const).map((m) => (
                <Pill key={m} active={chartMetric === m} onClick={() => setChartMetric(m)}>
                  {m === 'revenue' ? 'Revenue' : 'Orders'}
                </Pill>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
              <XAxis
                dataKey="date" stroke={MUTED} tick={{ fontSize: 10, fill: MUTED }}
                interval={Math.max(0, Math.floor(chartData.length / 8) - 1)}
              />
              <YAxis
                stroke={MUTED} tick={{ fontSize: 10, fill: MUTED }}
                tickFormatter={(v: number) => chartMetric === 'revenue' ? `${currInfo.symbol}${v}` : String(v)}
              />
              <Tooltip
                contentStyle={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, color: TEXT }}
                labelStyle={{ color: MUTED }}
                formatter={(value) => {
                  const v = Number(value);
                  if (chartMetric === 'revenue') return [`${currInfo.symbol}${v.toFixed(2)}`, 'Revenue'];
                  return [v, 'Orders'];
                }}
              />
              <Line
                type="monotone" dataKey={chartMetric}
                stroke={ACCENT} strokeWidth={2.5} dot={chartData.length <= 7}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 3-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>

          {/* Top products */}
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
            <p style={{ color: TEXT, fontWeight: 600, fontSize: 14, margin: '0 0 14px' }}>Top Products</p>
            {(stats?.topProducts ?? []).length === 0 ? (
              <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>No data yet</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(stats?.topProducts ?? []).map((p, i) => (
                  <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      <span style={{ color: ACCENT, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>#{i + 1}</span>
                      <span style={{ color: TEXT, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                    </div>
                    <span style={{ color: MUTED, fontSize: 12, flexShrink: 0 }}>{cvt(p.revenue)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Orders bar chart */}
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
            <p style={{ color: TEXT, fontWeight: 600, fontSize: 14, margin: '0 0 14px' }}>Orders by Day</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={chartData.length > 14 ? chartData.slice(-14) : chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis dataKey="date" stroke={MUTED} tick={{ fontSize: 9, fill: MUTED }} />
                <YAxis stroke={MUTED} tick={{ fontSize: 9, fill: MUTED }} />
                <Tooltip contentStyle={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, color: TEXT }} />
                <Bar dataKey="orders" fill={ACCENT} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by country */}
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
            <p style={{ color: TEXT, fontWeight: 600, fontSize: 14, margin: '0 0 14px' }}>Revenue by Country</p>
            {countryEntries.length === 0 ? (
              <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>No data yet</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {countryEntries.map(([country, amount]) => (
                  <div key={country} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: TEXT, fontSize: 12 }}>{country}</span>
                    <span style={{ color: MUTED, fontSize: 12 }}>{cvt(amount)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent orders */}
        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
          <p style={{ color: TEXT, fontWeight: 600, fontSize: 14, margin: '0 0 14px' }}>Recent Orders</p>
          {(stats?.recentOrders ?? []).length === 0 ? (
            <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>No orders yet</p>
          ) : (
            <div>
              {(stats?.recentOrders ?? []).map((order) => (
                <div key={order.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    style={{
                      width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 8px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <p style={{ color: TEXT, fontSize: 13, fontWeight: 600, margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {order.customerName}
                      </p>
                      <p style={{ color: MUTED, fontSize: 11, margin: 0 }}>
                        {order.email}{order.country !== '—' ? ` · ${order.country}` : ''}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                      <p style={{ color: ACCENT, fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>{cvt(order.amount)}</p>
                      <p style={{ color: MUTED, fontSize: 11, margin: 0 }}>{timeAgo(order.created)}</p>
                    </div>
                  </button>
                  {expandedOrder === order.id && (
                    <div style={{ margin: '0 8px 10px', padding: '10px 12px', backgroundColor: BG, borderRadius: 8 }}>
                      {order.phone && (
                        <p style={{ color: MUTED, fontSize: 12, margin: '0 0 8px' }}>
                          {'📞'} {order.phone}
                        </p>
                      )}
                      {order.lineItems.map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ color: MUTED, fontSize: 12 }}>{item.name} &times; {item.quantity}</span>
                          <span style={{ color: MUTED, fontSize: 12 }}>{cvt(item.amount)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
