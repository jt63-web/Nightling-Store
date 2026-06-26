import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Nightling — Silicone Night Lights for Kids';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF8F0',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Cloud SVG */}
        <svg viewBox="0 0 120 100" width="220" height="180" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="60" rx="48" ry="34" fill="#FFFBF0" stroke="#FFD78E" strokeWidth="2" />
          <circle cx="28" cy="46" r="22" fill="#FFFBF0" stroke="#FFD78E" strokeWidth="2" />
          <circle cx="60" cy="34" r="26" fill="#FFFBF0" stroke="#FFD78E" strokeWidth="2" />
          <circle cx="93" cy="46" r="20" fill="#FFFBF0" stroke="#FFD78E" strokeWidth="2" />
        </svg>

        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            color: '#1F2A44',
            letterSpacing: '-0.02em',
            marginTop: 20,
          }}
        >
          nightling
        </div>
        <div
          style={{
            fontSize: 26,
            color: '#3A4663',
            marginTop: 12,
            opacity: 0.7,
          }}
        >
          Silicone Night Lights for Kids
        </div>
      </div>
    ),
    { ...size }
  );
}
