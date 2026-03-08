'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { archetypes } from '@/lib/archetypes';
import { Archetype } from '@/lib/scoring';

interface ConversionCTA {
  headline: string;
  body: string;
  buttonText: string;
  buttonUrl: string;
  secondaryText?: string;
  secondaryUrl?: string;
}

const conversionCTAs: Record<string, ConversionCTA> = {
  A: {
    headline: "Your gift is rare. RTT is how you use it.",
    body: "Your results show something I've seen in fewer than 1 in 5 women: a natural therapeutic instinct combined with the desire to help others transform. I created Rapid Transformational Therapy specifically so women like you could turn this gift into a certified career.",
    buttonText: "Book a Free Discovery Call",
    buttonUrl: "https://go.applyrtt.com/integrated-v-app",
    secondaryText: "Not ready for a call? Start with I Am Enough",
    secondaryUrl: "https://marisapeer.com/iamenoughcourse/",
  },
  B: {
    headline: "Start helping people — sooner than you think.",
    body: "Your natural ability to understand people is clear from your answers. The Peer Hypnosis Method lets you begin helping others professionally with a powerful, certified approach — without needing years of training.",
    buttonText: "Learn About Peer Hypnosis Method",
    buttonUrl: "https://marisapeer.com/rtt-training-courses/",
    secondaryText: "Or explore I Am Enough first",
    secondaryUrl: "https://marisapeer.com/iamenoughcourse/",
  },
  C: {
    headline: "Your transformation starts with the right support.",
    body: "Based on your answers, a guided, coach-supported programme matched to your specific needs would create the breakthrough you're looking for. This isn't a course you watch alone — it's a 90-180 day transformation with a dedicated practitioner by your side.",
    buttonText: "Explore Premium Programs",
    buttonUrl: "https://marisapeer.com",
    secondaryText: "Start with a personal development programme",
    secondaryUrl: "https://marisapeer.com",
  },
  D: {
    headline: "Your first step doesn't have to be a giant leap.",
    body: "I've selected a starting point specifically matched to what you told me matters most. This is the bridge between where you are right now and where your answers tell me you want to be.",
    buttonText: "See Your Recommended Programme",
    buttonUrl: "https://marisapeer.com",
    secondaryText: "Get the All Access Pass — 90+ programs for $19/month",
    secondaryUrl: "https://marisapeer.com",
  },
  E: {
    headline: "Every transformation begins with a single step.",
    body: "The best place to start is inside our community. For $19 a month, you get access to 90+ personal development programmes, daily transformation content, and a supportive community of women on the same journey.",
    buttonText: "Join the Community — $19/month",
    buttonUrl: "https://marisapeer.com",
    secondaryText: "Start free: download a guided meditation from Marisa",
    secondaryUrl: "https://marisapeer.com/meditate/",
  },
};

export default function ReportPage() {
  const params = useParams();
  const userId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [archetype, setArchetype] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userRes = await fetch(`/api/quiz/submit?id=${userId}`);
        const user = await userRes.json();
        setUserData(user);

        if (user.primary_archetype) {
          setArchetype(archetypes[user.primary_archetype as Archetype]);
        }

        // Check if report already exists
        if (user.report_content) {
          setReport(user.report_content);
          setLoading(false);
          return;
        }

        // Generate report
        const reportRes = await fetch('/api/report/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        const reportData = await reportRes.json();
        setReport(reportData.report);
      } catch (err) {
        setReport('Unable to load your report. Please try refreshing the page.');
      }
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  const name = userData?.first_name || userData?.name || 'friend';
  const conversionPath = userData?.conversion_path || userData?.result?.conversionPath || 'E';
  const cta = conversionCTAs[conversionPath] || conversionCTAs.E;

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-dark text-brand-cream py-6 px-4 text-center">
        <p className="text-brand-gold tracking-[0.3em] uppercase text-[10px] mb-1">
          Marisa Peer
        </p>
        <p className="text-sm opacity-70">
          {name}'s Personalised Coaching Report
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Loading state */}
        {loading && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-12 h-12 mx-auto mb-6 border-2 border-brand-gold/30 border-t-brand-gold rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            />
            <h2 className="text-xl font-serif text-brand-dark mb-2">
              Crafting {name}'s personal report...
            </h2>
            <p className="text-sm text-brand-dark/40">
              This takes about 30 seconds because it's being written specifically for your answers.
            </p>
          </motion.div>
        )}

        {/* Report content */}
        {!loading && report && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Archetype badge */}
            {archetype && (
              <div className="text-center mb-10">
                <div className={`inline-block bg-gradient-to-br ${archetype.colorBg} rounded-2xl px-6 py-4`}>
                  <p className="text-xs uppercase tracking-[0.2em] opacity-50 mb-1">Your Archetype</p>
                  <p className="font-serif text-lg" style={{ color: archetype.color }}>
                    {archetype.name}
                  </p>
                </div>
              </div>
            )}

            {/* The report */}
            <div className="report-content prose prose-lg max-w-none">
              {report.split('\n\n').map((paragraph, i) => {
                // Handle separator lines
                if (paragraph.trim().startsWith('───') || paragraph.trim() === '---') {
                  return <hr key={i} />;
                }
                return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * Math.min(i, 10) }}
                    className="text-brand-dark/80 leading-relaxed text-[15px] md:text-base"
                  >
                    {paragraph}
                  </motion.p>
                );
              })}
            </div>

            {/* Signature */}
            <div className="mt-10 pt-6 border-t border-brand-dark/10 text-center">
              <p className="text-brand-dark/40 italic text-sm">With love,</p>
              <p className="font-serif text-brand-dark text-lg mt-1">Marisa Peer</p>
            </div>

            {/* ─── CONVERSION CTA ─── */}
            <motion.div
              className="mt-16 bg-white rounded-3xl p-8 md:p-10 border border-brand-dark/5 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h3 className="font-serif text-2xl text-brand-dark mb-4">
                {cta.headline}
              </h3>
              <p className="text-brand-dark/60 leading-relaxed mb-8">
                {cta.body}
              </p>

              <a
                href={cta.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-brand-dark text-brand-cream text-center px-8 py-4 rounded-full
                           font-medium text-lg hover:bg-brand-plum transition-colors"
              >
                {cta.buttonText}
              </a>

              {cta.secondaryText && (
                <a
                  href={cta.secondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-center text-sm text-brand-dark/40 hover:text-brand-gold transition-colors"
                >
                  {cta.secondaryText} →
                </a>
              )}
            </motion.div>

            {/* Share section */}
            <div className="mt-10 text-center">
              <p className="text-sm text-brand-dark/40 mb-3">
                Know someone who needs to take this quiz?
              </p>
              <button
                onClick={() => {
                  const text = `This quiz told me more about myself than years of therapy. Take it — it's free.`;
                  const url = typeof window !== 'undefined' ? window.location.origin : '';
                  if (navigator.share) {
                    navigator.share({ title: 'What Were You Born To Do?', text, url });
                  } else {
                    navigator.clipboard.writeText(`${text}\n\n${url}`);
                    alert('Link copied!');
                  }
                }}
                className="inline-flex items-center gap-2 text-brand-gold text-sm font-medium hover:underline"
              >
                Share the quiz →
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
