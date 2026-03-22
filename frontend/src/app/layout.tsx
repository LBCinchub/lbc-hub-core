import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LBC Hub — Diamond Standard',
  description:
    'The unified ecosystem for Social connection, Marketplace innovation, AI-powered Travel, and Riding services.',
  keywords: ['luxury', 'diamond', 'marketplace', 'social', 'solana', 'web3'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
