'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { archetypes } from '@/lib/archetypes';
import { Archetype } from '@/lib/scoring';
import {
  calculateTransformationScores,
  getAffirmations,
  getJournalPrompts,
  getRecommendedVideos,
  getProductPrescription,
  beliefLabels,
  ScoreDimension,
} from '@/lib/coaching-content';

// ─── SCORE BAR COMPONENT ────────────────────────
function ScoreBar({ dimension, delay }: { dimension: ScoreDimension; delay: number }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), delay * 1000); }, [delay]);

  return (
    <div className="mb-5">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm font-medium text-brand-dark">{dimension.label}</span>
        <span className="text-lg font-bold" style={{ color: dimension.color }}>{dimension.score}%</span>
      </div>
      <div className="h-3 bg-brand-dark/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: dimension.color }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${dimension.score}%` : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
      <p className="text-xs text-brand-dark/50 mt-1 italic">{dimension.insight}</p>
    </div>
  );
}

// ─── SECTION WRAPPER ────────────────────────────
function Section({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className={`mb-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl p-6 md:p-8 border border-brand-dark/5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold mb-3">{text}</p>
  );
}

// ─── MAIN RESULTS PAGE ──────────────────────────
function ResultsContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const archetypeKey = (searchParams.get('archetype') || 'quiet_powerhouse') as Archetype;
  const nameParam = searchParams.get('name') || '';

  const [phase, setPhase] = useState<'analyzing' | 'ready'>('analyzing');
  const [userData, setUserData] = useState<any>(null);
  const [report, setReport] = useState('');
  const [activeAffirmation, setActiveAffirmation] = useState<'morning' | 'mirror' | 'emergency'>('morning');
  const [expandedFear, setExpandedFear] = useState(false);

  const archetype = archetypes[archetypeKey] || archetypes.quiet_powerhouse;
  const name = userData?.first_name || userData?.name || nameParam || 'friend';

  // Build mock scores for demo if no data
  const scores = userData?.scores || userData || {
    healer: 8, powerhouse: 12, freedom: 6, deep_feeler: 10, renaissance: 4,
    rtt_intent: 8, readiness: 6, investment: 4, pain: 6,
    belief_not_enough: 4, belief_not_enough_capability: 6, belief_not_lovable: 2,
    body_heart: 3, body_shoulders: 0, deep_feeler: 10,
    rel_over_giver: 3, money_undervaluing: 3,
    purpose_blocked: 0,
    healer_ability_strong: 3,
  };

  const primaryBelief = userData?.primary_belief || userData?.result?.primaryBelief || 'not_enough_capability';
  const primaryFear = userData?.primary_fear || userData?.result?.primaryFear || 'failure';
  const primaryDesire = userData?.primary_desire || userData?.result?.primaryDesire || 'self_worth';
  const originPattern = userData?.origin_pattern || userData?.result?.originPattern || 'parentification';
  const conversionPath = userData?.conversion_path || userData?.result?.conversionPath || 'D';

  // Calculate everything
  const transformationScores = calculateTransformationScores(scores, archetypeKey);
  const affirmations = getAffirmations(primaryBelief, archetypeKey, name);
  const journal = getJournalPrompts(primaryBelief, originPattern, archetypeKey, name);
  const videos = getRecommendedVideos(archetypeKey, primaryBelief, primaryFear, conversionPath);
  const products = getProductPrescription(conversionPath, archetypeKey, primaryDesire, primaryBelief, primaryFear, originPattern, name);

  // Fetch user data
  useEffect(() => {
    if (userId) {
      fetch(`/api/quiz/submit?id=${userId}`)
        .then(r => r.json())
        .then(data => setUserData(data))
        .catch(() => {});
    }
  }, [userId]);

  // Generate AI report in background
  useEffect(() => {
    if (userId && phase === 'ready') {
      fetch('/api/report/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
        .then(r => r.json())
        .then(data => setReport(data.report || ''))
        .catch(() => {});
    }
  }, [userId, phase]);

  // Analyzing timing
  useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 3500);
    return () => clearTimeout(t);
  }, []);

  // Share handler
  const handleShare = async () => {
    const text = archetype.shareText;
    const url = typeof window !== 'undefined' ? window.location.origin : '';
    if (navigator.share) {
      try { await navigator.share({ title: 'What Were You Born To Do?', text, url }); } catch {}
    } else {
      navigator.clipboard.writeText(`${text}\n\n${url}`);
    }
  };

  // ─── ANALYZING SCREEN ───
  if (phase === 'analyzing') {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center px-4">
        <motion.div className="text-center max-w-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="w-20 h-20 mx-auto mb-8 rounded-full border-[3px] border-brand-gold/20 border-t-brand-gold"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          />
          <h2 className="text-2xl font-serif text-brand-dark mb-4">Discovering what {name} was born to do...</h2>
          <div className="space-y-3 text-sm text-brand-dark/40">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Mapping your subconscious belief patterns...
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              Calculating your readiness profile...
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
              Generating personalised coaching...
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
              Selecting your recommended training...
            </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── MAIN RESULTS DASHBOARD ───
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* ━━━ HEADER ━━━ */}
      <div className="bg-brand-dark text-brand-cream py-5 px-4 text-center sticky top-0 z-50">
        <p className="text-brand-gold tracking-[0.3em] uppercase text-[9px]">Marisa Peer</p>
        <p className="text-xs opacity-60 mt-0.5">{name}'s Personalised Results</p>
      </div>

      <div className="max-w-xl mx-auto px-4 py-8">

        {/* ━━━ 1. ARCHETYPE REVEAL ━━━ */}
        <Section>
          <motion.div
            className={`bg-gradient-to-br ${archetype.colorBg} rounded-3xl p-8 text-center relative overflow-hidden`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="absolute top-3 right-3 text-5xl opacity-5" style={{ color: archetype.color }}>
              {archetype.emoji}
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-4">Your True Calling Type</p>
            <h1 className="text-3xl md:text-4xl font-serif mb-2" style={{ color: archetype.color }}>
              {archetype.name}
            </h1>
            <p className="text-base italic text-brand-dark/60 mb-4">"{archetype.tagline}"</p>
            <p className="text-sm text-brand-dark/50">
              Only <strong>{archetype.percentage}</strong> of women share this archetype
            </p>
            <button onClick={handleShare}
              className="mt-5 inline-flex items-center gap-2 bg-white/80 text-brand-dark text-xs font-medium px-4 py-2 rounded-full hover:bg-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              Share My Result
            </button>
          </motion.div>
        </Section>

        {/* ━━━ 2. WHAT YOU WERE BORN TO DO ━━━ */}
        <Section delay={0.1}>
          <SectionCard>
            <SectionLabel text="What You Were Actually Born To Do" />

            {/* The answer — how they show up, not a job title */}
            <p className="text-brand-dark text-[15px] leading-[1.8] mb-4">
              {archetype.bornToDo}
            </p>

            {/* How they naturally help people */}
            <div className="bg-gradient-to-r from-brand-gold/5 to-brand-gold/10 rounded-xl p-5 mb-4 border border-brand-gold/10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold/80 mb-2 font-semibold">How You Naturally Help People</p>
              <p className="text-brand-dark/70 text-sm leading-relaxed">
                {archetype.howYouHelp}
              </p>
            </div>

            {/* What stepping into it looks like */}
            <div className="bg-brand-dark/3 rounded-xl p-5 mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-dark/30 mb-2 font-semibold">What Stepping Into This Looks Like</p>
              <p className="text-brand-dark/70 text-sm leading-relaxed">
                {archetype.howToStepIn}
              </p>
            </div>
          </SectionCard>
        </Section>

        {/* ━━━ 2b. YOUR READINESS PROFILE ━━━ */}
        <Section delay={0.15}>
          <SectionCard>
            <SectionLabel text={`${name}'s Readiness Profile`} />

            {/* Readiness gauge */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#f0e6d3" strokeWidth="10" />
                  <motion.circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke={archetype.color} strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - transformationScores.overallScore / 100) }}
                    transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-brand-dark">{transformationScores.overallScore}</span>
                  <span className="text-[9px] text-brand-dark/40">/ 100</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-brand-dark/70 leading-relaxed">
                  {transformationScores.overallScore < 45
                    ? `You know what you were born to do, ${name} — but right now, there are subconscious blocks stopping you from fully stepping into it. That's not a flaw. It's the starting point.`
                    : transformationScores.overallScore < 70
                    ? `You're closer than you think, ${name}. The gap between where you are and where you're meant to be isn't talent or intelligence — it's the beliefs holding you back. And those can be rewired.`
                    : `${name}, you're ready. You know who you are, you know what you want, and the only thing standing between you and it is taking the next step.`}
                </p>
              </div>
            </div>

            {/* Dimension breakdowns */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-dark/30 mb-4">What's Driving Your Score</p>
            <div>
              {transformationScores.dimensions.map((dim, i) => (
                <ScoreBar key={dim.label} dimension={dim} delay={0.8 + i * 0.2} />
              ))}
            </div>
          </SectionCard>
        </Section>

        {/* ━━━ 3. YOUR RECOMMENDED TRAINING (VIDEO) ━━━ */}
        <Section delay={0.15}>
          <SectionCard>
            <SectionLabel text={`${name}, watch this first`} />
            <h3 className="font-serif text-xl text-brand-dark mb-2">{videos.mainVideo.title}</h3>
            <p className="text-xs text-brand-dark/40 mb-4 italic">{videos.mainVideo.context}</p>

            {/* YouTube Embed */}
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${videos.mainVideo.youtubeId}?rel=0`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={videos.mainVideo.title}
              />
            </div>

            <p className="text-sm text-brand-dark/60">{videos.mainVideo.description}</p>
            <p className="text-xs text-brand-dark/30 mt-2">{videos.mainVideo.duration}</p>

            {/* Mini CTA after video */}
            <div className="mt-5 pt-5 border-t border-brand-dark/5">
              <p className="text-xs text-brand-dark/40 mb-2">
                {conversionPath === 'A'
                  ? `${name}, this video explains the method — but RTT goes far deeper than anything on YouTube. Your quiz showed healer potential that most people don't have.`
                  : conversionPath === 'B'
                  ? `${name}, this is Marisa's public teaching. The Peer Hypnosis Method teaches you the techniques she actually uses in sessions — starting with your own mind.`
                  : conversionPath === 'C'
                  ? `${name}, watching is one thing. But the belief that ${beliefLabels[primaryBelief] || "you're not enough"} won't shift from a video alone. It needs root cause work.`
                  : `${name}, this talk has changed millions of lives. But imagine having Marisa's full methodology working on the specific pattern your quiz revealed.`}
              </p>
              <a href={products.primary.ctaUrl} target="_blank" rel="noopener noreferrer"
                className="text-brand-gold text-xs font-semibold hover:underline">
                {products.primary.ctaText} →
              </a>
            </div>
          </SectionCard>
        </Section>

        {/* ━━━ 4. YOUR PERSONALISED AFFIRMATIONS ━━━ */}
        <Section delay={0.2}>
          <SectionCard>
            <SectionLabel text="Your Power Affirmations" />
            <p className="text-sm text-brand-dark/50 mb-5">
              These aren't generic. They were selected for YOUR specific belief pattern. Say them out loud — your subconscious is listening.
            </p>

            {/* Tab switcher */}
            <div className="flex gap-2 mb-5">
              {(['morning', 'mirror', 'emergency'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveAffirmation(tab)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                    activeAffirmation === tab
                      ? 'bg-brand-dark text-brand-cream'
                      : 'bg-brand-dark/5 text-brand-dark/50 hover:bg-brand-dark/10'
                  }`}
                >
                  {tab === 'morning' ? '☀️ Morning' : tab === 'mirror' ? '🪞 Mirror Work' : '🆘 When Triggered'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeAffirmation}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {affirmations[activeAffirmation].map((aff, i) => (
                  <div key={i} className="bg-gradient-to-r from-brand-gold/5 to-brand-gold/10 rounded-xl p-4 border border-brand-gold/10">
                    <p className="text-brand-dark font-medium text-[15px] leading-snug italic">
                      "{aff}"
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <p className="text-[11px] text-brand-dark/30 mt-4">
              Tip: Screenshot these and set them as your phone wallpaper. Repetition is how the subconscious learns.
            </p>
          </SectionCard>
        </Section>

        {/* ━━━ 5. YOUR JOURNAL PROMPT ━━━ */}
        <Section delay={0.25}>
          <SectionCard className="bg-gradient-to-br from-white to-amber-50/50">
            <SectionLabel text="Your Breakthrough Journal Prompt" />
            <p className="text-sm text-brand-dark/50 mb-4">
              Marisa says: "What you don't make conscious controls you." This prompt is designed to surface the specific pattern your quiz revealed.
            </p>
            <div className="bg-white rounded-xl p-5 border border-brand-gold/15 mb-4">
              <p className="text-brand-dark text-[15px] leading-relaxed">
                {journal.deepDive}
              </p>
            </div>
            <details className="group">
              <summary className="text-xs text-brand-gold font-medium cursor-pointer hover:underline">
                + Two more journal prompts for this week
              </summary>
              <div className="mt-3 space-y-3">
                <div className="bg-white/70 rounded-lg p-4 border border-brand-dark/5">
                  <p className="text-[10px] uppercase tracking-wider text-brand-dark/30 mb-1">Daily Reflection</p>
                  <p className="text-sm text-brand-dark/70">{journal.dailyReflection}</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4 border border-brand-dark/5">
                  <p className="text-[10px] uppercase tracking-wider text-brand-dark/30 mb-1">Letter to Future {name}</p>
                  <p className="text-sm text-brand-dark/70">{journal.futureself}</p>
                </div>
              </div>
            </details>
          </SectionCard>
        </Section>

        {/* ━━━ MINI CTA 1: After journal ━━━ */}
        <Section delay={0.27}>
          <div className="bg-brand-dark/5 rounded-2xl p-5 text-center">
            <p className="text-sm text-brand-dark/60 mb-2">
              {name}, journaling surfaces what's hidden — but it can't rewire it. The belief that {beliefLabels[primaryBelief] || "you're not enough"} was installed before you could spell your own name. Shifting it requires subconscious work.
            </p>
            <a href={products.primary.ctaUrl} target="_blank" rel="noopener noreferrer"
              className="text-brand-gold text-sm font-semibold hover:underline">
              {products.primary.ctaText} →
            </a>
          </div>
        </Section>

        {/* ━━━ 6. AI COACHING REPORT (full, not condensed) ━━━ */}
        {report && (
          <Section delay={0.3}>
            <SectionCard>
              <SectionLabel text="Your Personal Message from Marisa" />
              <div className="report-content">
                {report.split('\n\n').map((para, i) => {
                  if (para.trim().startsWith('───') || para.trim() === '---') {
                    return <hr key={i} className="my-6 border-brand-dark/10" />;
                  }
                  return (
                    <p key={i} className="text-brand-dark/70 text-[15px] leading-[1.8] mb-4">{para}</p>
                  );
                })}
              </div>
              <p className="text-right mt-6 text-sm italic text-brand-dark/40">— Marisa x</p>

              {/* CTA within the message */}
              <div className="mt-6 pt-6 border-t border-brand-dark/5 text-center">
                <p className="text-sm text-brand-dark/50 mb-3">
                  {name}, reading this message is awareness. But awareness alone won't rewire a belief that's been running your life since childhood. The next step is action.
                </p>
                <a href={products.primary.ctaUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-brand-dark text-brand-cream text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-plum transition-colors">
                  {products.primary.ctaText}
                </a>
              </div>
            </SectionCard>
          </Section>
        )}

        {/* ━━━ 7. SUPPORT VIDEOS ━━━ */}
        <Section delay={0.35}>
          <SectionLabel text="Selected for your specific results" />
          <div className="space-y-4">
            {videos.supportVideos.map((video, i) => (
              <SectionCard key={i}>
                <div className="flex gap-4 items-start">
                  <div className="w-32 h-20 flex-shrink-0 bg-brand-dark/5 rounded-lg overflow-hidden relative">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[8px] border-l-brand-dark border-y-[5px] border-y-transparent ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href={`https://youtube.com/watch?v=${video.youtubeId}`}
                       target="_blank" rel="noopener noreferrer"
                       className="font-medium text-sm text-brand-dark hover:text-brand-gold transition-colors">
                      {video.title}
                    </a>
                    <p className="text-xs text-brand-dark/40 mt-0.5">{video.duration}</p>
                    <p className="text-xs text-brand-dark/50 mt-1 italic">{video.context}</p>
                  </div>
                </div>
              </SectionCard>
            ))}
          </div>

          {/* Mini CTA after support videos */}
          <div className="mt-4 bg-gradient-to-r from-brand-gold/5 to-brand-gold/10 rounded-2xl p-5 text-center border border-brand-gold/10">
            <p className="text-sm text-brand-dark/70 mb-1 font-medium">
              {name}, you've watched the videos. You've read the insights. You know the pattern.
            </p>
            <p className="text-xs text-brand-dark/40 mb-3">
              The question isn't whether this is true — you already feel it. The question is what you do next.
            </p>
            <a href={products.primary.ctaUrl} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-brand-gold text-brand-dark text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-amber-400 transition-colors">
              {products.primary.ctaText}
            </a>
          </div>
        </Section>

        {/* ━━━ 8. PRODUCT PRESCRIPTION (THE SELL) ━━━ */}
        <Section delay={0.4}>
          {/* "Why this is for YOU" personal letter */}
          <SectionCard className="mb-4">
            <SectionLabel text={`${name}, read this before you go`} />
            <div className="space-y-4">
              {products.primary.whyYou.split('\n\n').map((para, i) => (
                <p key={i} className="text-brand-dark/70 text-[15px] leading-[1.8]">{para}</p>
              ))}
            </div>
          </SectionCard>

          {/* The product card */}
          <div className="bg-brand-dark rounded-3xl p-6 md:p-8 text-brand-cream relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <p className="text-brand-gold text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">
                {products.primary.tag}
              </p>
              <h3 className="font-serif text-2xl text-brand-cream mb-2">
                {products.primary.name}
              </h3>
              <p className="text-brand-cream/50 text-xs mb-4">{products.primary.price}</p>
              <p className="text-brand-cream/70 text-sm leading-relaxed mb-6">
                {products.primary.description}
              </p>

              <div className="space-y-2.5 mb-6">
                {products.primary.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-brand-gold text-sm mt-0.5">✓</span>
                    <span className="text-brand-cream/70 text-sm leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="bg-brand-cream/5 rounded-xl p-4 mb-6 border border-brand-cream/10">
                <p className="text-brand-cream/50 text-xs leading-relaxed italic">
                  {products.primary.proofPoint}
                </p>
              </div>

              <a href={products.primary.ctaUrl} target="_blank" rel="noopener noreferrer"
                className="block w-full bg-brand-gold text-brand-dark text-center px-6 py-4 rounded-full font-semibold text-base hover:bg-amber-400 transition-colors">
                {products.primary.ctaText}
              </a>
              {products.primary.urgency && (
                <p className="text-center text-brand-cream/30 text-xs mt-3">{products.primary.urgency}</p>
              )}
            </div>
          </div>

          {/* Secondary offer */}
          {products.secondary && (
            <div className="mt-4 bg-white rounded-2xl p-5 border border-brand-dark/5 text-center">
              <p className="text-xs text-brand-dark/40 mb-2">Or start here:</p>
              <p className="font-medium text-sm text-brand-dark mb-1">{products.secondary.name}</p>
              <p className="text-xs text-brand-dark/40 mb-3">{products.secondary.price}</p>
              <a href={products.secondary.ctaUrl} target="_blank" rel="noopener noreferrer"
                className="text-brand-gold text-sm font-medium hover:underline">
                {products.secondary.ctaText} →
              </a>
            </div>
          )}
        </Section>

        {/* ━━━ 9. SHARE / VIRAL SECTION ━━━ */}
        <Section delay={0.45}>
          <SectionCard className="text-center">
            <p className="font-serif text-lg text-brand-dark mb-2">
              Know someone who needs to take this?
            </p>
            <p className="text-sm text-brand-dark/40 mb-4">
              Send them their own personalised assessment.
            </p>
            <button onClick={handleShare}
              className="bg-brand-dark text-brand-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-plum transition-colors">
              Share the Quiz
            </button>
          </SectionCard>
        </Section>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-[10px] text-brand-dark/20 tracking-[0.15em] uppercase">
            Marisa Peer &middot; Rapid Transformational Therapy &middot; marisapeer.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-cream" />}>
      <ResultsContent />
    </Suspense>
  );
}
