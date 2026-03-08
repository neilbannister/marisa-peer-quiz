import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'What Were You Actually Born To Do? | Marisa Peer',
  description: 'Take this 3-minute assessment based on Marisa Peer\'s 30+ years of working with the subconscious mind — and finally discover your true calling.',
  openGraph: {
    title: 'What Were You Actually Born To Do?',
    description: 'A 3-minute assessment that reveals your hidden blocks and true calling. Based on Marisa Peer\'s 30+ years of subconscious mind research.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-cream">
        {children}
      </body>
    </html>
  );
}
