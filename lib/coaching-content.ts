import { Archetype } from './scoring';

// ─────────────────────────────────────────────────
// TRANSFORMATION SCORE SYSTEM
// ─────────────────────────────────────────────────

export interface ScoreDimension {
  label: string;
  score: number; // 0-100
  color: string;
  insight: string; // personalised one-liner
}

export function calculateTransformationScores(
  scores: any,
  archetype: Archetype
): {
  overallScore: number;
  dimensions: ScoreDimension[];
  readinessLevel: string;
  readinessEmoji: string;
} {
  // Self-Worth Score: inverse of pain + belief scores (higher pain = lower self-worth)
  const beliefTotal = (scores.belief_not_enough || 0) + (scores.belief_not_lovable || 0) +
    (scores.belief_not_enough_capability || 0) + (scores.belief_not_enough_inherent || 0) +
    (scores.belief_not_lovable_authentic || 0) + (scores.belief_dont_deserve || 0) +
    (scores.belief_dont_deserve_good || 0) + (scores.belief_learned_helplessness || 0);
  const selfWorthScore = Math.max(15, Math.min(85, 85 - (beliefTotal * 6)));

  // Emotional Awareness: based on body pattern + deep feeler scores
  const bodyAwareness = (scores.body_heart || 0) + (scores.body_gut || 0) +
    (scores.body_throat || 0) + (scores.body_shoulders || 0) + (scores.body_head || 0);
  const emotionalScore = Math.max(30, Math.min(92, 45 + (scores.deep_feeler || 0) * 4 + bodyAwareness * 5));

  // Purpose Clarity: based on purpose energy + readiness
  const purposeClarity = scores.purpose_blocked ? 25 :
    Math.max(20, Math.min(88, 30 + (scores.readiness || 0) * 6 + (scores.rtt_intent || 0) * 2));

  // Healer Potential: based on healer scores
  const healerPotential = Math.max(15, Math.min(95, 20 + (scores.healer || 0) * 5 +
    (scores.healer_ability_exceptional || 0) * 10 + (scores.healer_ability_validated || 0) * 12 +
    (scores.healer_ability_strong || 0) * 7));

  // Relationship Health: inverse of relationship pattern intensity
  const relTotal = (scores.rel_over_giver || 0) + (scores.rel_conflict_avoidant || 0) +
    (scores.rel_masked || 0) + (scores.rel_avoidant || 0) + (scores.rel_rescuer || 0);
  const relationshipScore = Math.max(20, Math.min(80, 75 - (relTotal * 8)));

  // Abundance Readiness: based on money beliefs + investment readiness
  const moneyBlock = (scores.money_scarcity || 0) + (scores.money_guilt || 0);
  const abundanceScore = Math.max(15, Math.min(85, 40 + (scores.investment || 0) * 5 - moneyBlock * 8));

  const dimensions: ScoreDimension[] = [
    {
      label: 'Self-Worth',
      score: selfWorthScore,
      color: '#C9A96E',
      insight: selfWorthScore < 40 ? "This is your biggest area for breakthrough — and it's the root of everything else." :
        selfWorthScore < 60 ? "You're aware of your worth intellectually, but your subconscious hasn't caught up yet." :
        "You have a foundation here. The work now is making it unshakeable.",
    },
    {
      label: 'Emotional Awareness',
      score: emotionalScore,
      color: '#D4A0A0',
      insight: emotionalScore > 70 ? "Your emotional depth is a genuine gift. The question is: are you using it, or is it using you?" :
        "You've been taught to suppress what you feel. Reconnecting with your emotions is where the healing starts.",
    },
    {
      label: 'Purpose Clarity',
      score: purposeClarity,
      color: '#5B6ABF',
      insight: purposeClarity < 40 ? "You're searching — and that search itself is meaningful. Clarity comes from action, not thinking." :
        purposeClarity < 65 ? "You have a sense of direction. What's missing is the conviction to follow it." :
        "You know what you want. The only thing between you and it is permission.",
    },
    {
      label: 'Healer Potential',
      score: healerPotential,
      color: '#2D6A4F',
      insight: healerPotential > 70 ? "This is exceptionally high. You have a natural therapeutic instinct that most people can't learn." :
        healerPotential > 45 ? "You have empathy and insight that could be developed into something powerful." :
        "Your strengths lie in other areas — and that's equally valuable.",
    },
    {
      label: 'Relationship Health',
      score: relationshipScore,
      color: '#E8927C',
      insight: relationshipScore < 40 ? "Your relationship patterns are a mirror of the childhood beliefs you're carrying." :
        "There's room to deepen your connections — starting with the relationship you have with yourself.",
    },
    {
      label: 'Abundance Readiness',
      score: abundanceScore,
      color: '#8B7355',
      insight: abundanceScore < 40 ? "Money blocks are almost always self-worth blocks in disguise." :
        "You're closer to a financial breakthrough than you think. The block isn't external — it's internal.",
    },
  ];

  const overallScore = Math.round(
    dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length
  );

  const readinessLevel = overallScore >= 70 ? 'Strong' : overallScore >= 45 ? 'Emerging' : 'Hidden';
  const readinessEmoji = overallScore >= 70 ? '🔥' : overallScore >= 45 ? '✨' : '🌱';

  return { overallScore, dimensions, readinessLevel, readinessEmoji };
}


// ─────────────────────────────────────────────────
// PERSONALISED AFFIRMATIONS
// ─────────────────────────────────────────────────

export function getAffirmations(
  primaryBelief: string,
  archetype: Archetype,
  name: string
): { morning: string[]; mirror: string[]; emergency: string[] } {
  const beliefAffirmations: Record<string, string[]> = {
    not_enough_capability: [
      "I am qualified by my life experience, my empathy, and my willingness to grow.",
      "I don't need permission to step into my power. I give it to myself.",
      "My value is not measured by my credentials. It's measured by my courage.",
    ],
    not_lovable_authentic: [
      "The real me is not too much. The real me is exactly enough.",
      "I release the need to perform for love. I am lovable as I am.",
      "The people who matter will love the unfiltered version of me.",
    ],
    dont_deserve_good: [
      "I am allowed to receive. Good things are not for other people — they are for me too.",
      "I release the belief that I must earn every good thing that comes to me.",
      "I deserve joy, success, and abundance — not because I've earned it, but because I exist.",
    ],
    not_enough_inherent: [
      "I am enough. Not when I do more. Not when I achieve more. Right now.",
      "I release the need to prove my worth through exhaustion.",
      "My value is inherent. It does not increase with effort or decrease with rest.",
    ],
    learned_helplessness: [
      "My past does not dictate my future. Every moment is a new beginning.",
      "I have more power than I've allowed myself to believe.",
      "One small step forward is enough. I don't need to see the whole path.",
    ],
    not_important: [
      "My needs matter. My voice matters. I matter.",
      "I am allowed to take up space. I am allowed to be seen.",
      "Putting myself first is not selfish. It is necessary.",
    ],
    earn_love: [
      "I am loved for who I am, not for what I do.",
      "I release the need to be useful to be valued.",
      "My worth is not a performance. It is a birthright.",
    ],
  };

  // Get belief-specific affirmations or fallback
  const specific = beliefAffirmations[primaryBelief] || beliefAffirmations.not_enough_capability;

  const archetypeAffirmations: Record<Archetype, string[]> = {
    born_healer: [
      "My gift for understanding people is rare and valuable.",
      "I am ready to turn my natural ability into my life's work.",
      "Healing others is not a sacrifice — it is my calling and my freedom.",
    ],
    quiet_powerhouse: [
      "I have permission to be visible. I have permission to shine.",
      "My voice deserves to be heard. My ideas deserve to take up space.",
      "I am not too much and I am not too little. I am exactly right.",
    ],
    freedom_chaser: [
      "I was not built for a box. I was built for a life I design.",
      "My desire for freedom is not irresponsible. It is my compass.",
      "I trust myself to build something extraordinary on my own terms.",
    ],
    deep_feeler: [
      "My sensitivity is my superpower, not my weakness.",
      "I am allowed to feel deeply AND protect my energy.",
      "My emotions are messengers, not enemies.",
    ],
    renaissance_soul: [
      "I am not scattered. I am a visionary seeking my vehicle.",
      "My many interests are a sign of my depth, not my lack of focus.",
      "The right path will use ALL of who I am.",
    ],
  };

  return {
    morning: [
      `I, ${name}, am enough. Exactly as I am. Right now.`,
      ...specific.slice(0, 2),
    ],
    mirror: [
      ...archetypeAffirmations[archetype].slice(0, 2),
      "I am enough. I have always been enough.",
    ],
    emergency: [
      "This feeling is temporary. I am safe. I am enough.",
      specific[0],
      "I choose to believe in myself, even when it's hard.",
    ],
  };
}


// ─────────────────────────────────────────────────
// JOURNAL PROMPTS
// ─────────────────────────────────────────────────

export function getJournalPrompts(
  primaryBelief: string,
  originPattern: string,
  archetype: Archetype,
  name: string,
  gender: string = 'female'
): { deepDive: string; dailyReflection: string; futureself: string } {
  const child = gender === 'male' ? 'little boy' : gender === 'non_binary' ? 'younger self' : 'little girl';
  const pronoun = gender === 'male' ? 'he' : gender === 'non_binary' ? 'they' : 'she';
  const possessive = gender === 'male' ? 'his' : gender === 'non_binary' ? 'their' : 'her';
  const objective = gender === 'male' ? 'him' : gender === 'non_binary' ? 'them' : 'her';
  const was = gender === 'non_binary' ? 'were' : 'was';

  const deepDive = originPattern === 'parentification'
    ? `${name}, write a letter to the ${child} who learned ${pronoun} had to be "good" to be loved. Tell ${objective} what you wish someone had told ${objective} back then. Tell ${objective} ${pronoun} ${was} already enough — without being helpful, responsible, or perfect.`
    : originPattern === 'invalidation'
    ? `${name}, write a letter to the ${child} who was told ${pronoun} ${was} "too much." Tell ${objective} that ${possessive} sensitivity is a gift, not a flaw. Tell ${objective} that the world needs exactly the depth ${pronoun} carries.`
    : originPattern === 'neglect'
    ? `${name}, write a letter to the ${child} whose needs always came last. Tell ${objective} that ${pronoun} matters. Tell ${objective} that ${possessive} desires, ${possessive} dreams, ${possessive} feelings — they all count. They always did.`
    : originPattern === 'conditional_love'
    ? `${name}, write a letter to the ${child} who believed love had to be earned through achievement. Tell ${objective} that ${pronoun} is loved for who ${pronoun} IS, not what ${pronoun} does. Tell ${objective} ${pronoun} can rest.`
    : `${name}, write a letter to the ${child} who absorbed everyone else's pain to keep the peace. Tell ${objective} it was never ${possessive} job to hold the family together. Tell ${objective} ${pronoun}'s allowed to put ${objective}self first.`;

  const dailyReflection = archetype === 'born_healer'
    ? "Today, instead of asking 'How can I help?' — ask yourself: 'What do I need right now?' Write whatever comes up, without filtering or judging."
    : archetype === 'quiet_powerhouse'
    ? "Write about one moment today where you held back, dimmed your light, or didn't speak up. What would you have said or done if you fully believed you were enough?"
    : archetype === 'freedom_chaser'
    ? "Describe your ideal Tuesday in vivid detail — not a holiday, but an ordinary day in the life you actually want. What does freedom look like in the mundane?"
    : archetype === 'deep_feeler'
    ? "What emotion have you been carrying today that isn't yours? Write it down, name whose it is, and then write: 'I release what is not mine to carry.'"
    : "List three things you started and didn't finish this year. For each one, write whether you stopped because it wasn't right for you — or because you were afraid.";

  const futureself = `Close your eyes for 60 seconds and imagine yourself one year from today, ${name}. The version of you who made the brave choice. Who did the inner work. Who finally stepped into ${possessive} calling. Now open your eyes and write ${objective}self a letter that starts: "Dear Future ${name}, I'm writing to tell you that today I decided..."`;

  return { deepDive, dailyReflection, futureself };
}


// ─────────────────────────────────────────────────
// VIDEO MAPPING (Marisa Peer YouTube/Content)
// ─────────────────────────────────────────────────

export interface VideoRecommendation {
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  context: string; // why this video was chosen for them
}

export function getRecommendedVideos(
  archetype: Archetype,
  primaryBelief: string,
  primaryFear: string,
  conversionPath: string
): { mainVideo: VideoRecommendation; supportVideos: VideoRecommendation[] } {

  // Main video: matched to archetype + conversion path
  const mainVideos: Record<string, VideoRecommendation> = {
    // RTT path — show the career opportunity
    A_born_healer: {
      title: "How I Trained 18,000 Therapists to Change Lives",
      description: "Marisa explains how RTT works and why natural healers make the best practitioners.",
      youtubeId: "jGvfSYMg5GI", // Replace with actual RTT training overview video ID
      duration: "18 min",
      context: "Based on your Born Healer profile, this training shows you exactly what RTT is and how people like you are using it to build thriving careers.",
    },
    A_default: {
      title: "Could You Be a Rapid Transformational Therapist?",
      description: "Discover if you have the natural qualities Marisa looks for in her practitioners.",
      youtubeId: "jGvfSYMg5GI",
      duration: "12 min",
      context: "Your quiz results show strong healer potential. This video explains the RTT career path.",
    },
    // Premium PD path
    C_default: {
      title: "The One Belief That Changes Everything",
      description: "Marisa reveals the single belief at the root of every struggle she's seen in 30 years.",
      youtubeId: "lw3NyPWoLSo",
      duration: "15 min",
      context: "This is the belief your quiz results point to. Watch this and you'll understand why everything in your life connects back to one moment.",
    },
    // Bridge/Community path
    D_default: {
      title: "I Am Enough — The Talk That Changed Millions of Lives",
      description: "Marisa's most-watched talk on the belief that holds us all back.",
      youtubeId: "lw3NyPWoLSo",
      duration: "20 min",
      context: "This talk addresses the exact pattern your quiz revealed. Over 20 million people have watched it — and many say it changed their lives.",
    },
    E_default: {
      title: "You Are Enough — A Guided Session with Marisa Peer",
      description: "Experience a taste of Marisa's transformational work in this free session.",
      youtubeId: "lw3NyPWoLSo",
      duration: "25 min",
      context: "This free session is the perfect starting point based on your results.",
    },
  };

  // Select main video
  const specificKey = `${conversionPath}_${archetype}`;
  const defaultKey = `${conversionPath}_default`;
  const mainVideo = mainVideos[specificKey] || mainVideos[defaultKey] || mainVideos.D_default;

  // Support videos: matched to belief + fear
  const beliefVideos: Record<string, VideoRecommendation> = {
    not_enough_capability: {
      title: "Why You Feel Like a Fraud (And How to Stop)",
      description: "Marisa breaks down imposter syndrome and where it really comes from.",
      youtubeId: "LNHBMFCzznE",
      duration: "12 min",
      context: "You said you don't feel qualified enough. This video explains exactly why — and how to rewire it.",
    },
    not_lovable_authentic: {
      title: "How to Stop Wearing a Mask and Start Being You",
      description: "Why we hide our true selves and how to finally show up authentically.",
      youtubeId: "LNHBMFCzznE",
      duration: "14 min",
      context: "You told me you worry people wouldn't like the real you. Marisa addresses this exact belief.",
    },
    dont_deserve_good: {
      title: "Why You Self-Sabotage (And How to Stop)",
      description: "The subconscious reason you push good things away.",
      youtubeId: "LNHBMFCzznE",
      duration: "16 min",
      context: "Your belief that good things happen to other people is a form of self-sabotage. This explains why.",
    },
  };

  const fearVideos: Record<string, VideoRecommendation> = {
    failure: {
      title: "Rewire Your Fear of Failure in 10 Minutes",
      description: "A powerful reframe that changes how your mind processes risk.",
      youtubeId: "LNHBMFCzznE",
      duration: "10 min",
      context: "You said your biggest fear is failing. This session helps rewire that.",
    },
    too_late: {
      title: "It's Never Too Late — Proof from Real Transformations",
      description: "Stories of people who transformed their lives at 40, 50, and 60+.",
      youtubeId: "LNHBMFCzznE",
      duration: "8 min",
      context: "You said you fear it's too late. These stories prove otherwise.",
    },
    judgment: {
      title: "How to Stop Caring What People Think",
      description: "Marisa's most practical tools for releasing the fear of judgment.",
      youtubeId: "LNHBMFCzznE",
      duration: "11 min",
      context: "Your fear of being judged is directly connected to your childhood pattern. This helps.",
    },
  };

  const supportVideos: VideoRecommendation[] = [];
  if (beliefVideos[primaryBelief]) supportVideos.push(beliefVideos[primaryBelief]);
  if (fearVideos[primaryFear]) supportVideos.push(fearVideos[primaryFear]);

  // Add a general one if we don't have enough
  if (supportVideos.length < 2) {
    supportVideos.push({
      title: "The 5 Rules of the Mind That Control Your Life",
      description: "Understanding these rules is the first step to changing your life.",
      youtubeId: "lw3NyPWoLSo",
      duration: "15 min",
      context: "These rules explain why your subconscious patterns have been so hard to break.",
    });
  }

  return { mainVideo, supportVideos };
}


// ─────────────────────────────────────────────────
// PRODUCT PRESCRIPTIONS (deeply personal sell)
// ─────────────────────────────────────────────────

export interface ProductPrescription {
  tag: string;
  name: string;
  price: string;
  whyYou: string;        // personalised "why this is for YOU" paragraph
  description: string;   // what the product is
  benefits: string[];
  proofPoint: string;    // social proof or credibility line
  ctaText: string;
  ctaUrl: string;
  urgency?: string;
}

// Human-readable labels for building personal copy
export const beliefLabels: Record<string, string> = {
  not_enough_capability: "you don't feel qualified enough",
  not_enough_inherent: "you're not inherently enough",
  not_lovable_authentic: "people won't love the real you",
  dont_deserve_good: "you don't deserve good things",
  learned_helplessness: "nothing you do will change things",
  not_important: "your needs don't matter",
  earn_love: "you have to earn love through what you do",
};

const fearLabels: Record<string, string> = {
  failure: "failing and proving your inner critic right",
  too_late: "it being too late to change your life",
  judgment: "being judged by the people around you",
  rejection: "being rejected if you show who you really are",
  not_good_enough: "not being good enough to pull this off",
  abandonment: "being left behind if you change",
  success: "actually succeeding and not knowing how to handle it",
};

const desireLabels: Record<string, string> = {
  self_worth: "to finally feel like you are enough",
  freedom: "to build a life on your own terms",
  purpose: "to find work that actually means something",
  connection: "to have deeper, more authentic relationships",
  healing: "to heal the wounds you've been carrying",
  confidence: "to walk into any room and feel like you belong",
  impact: "to make a real difference in other people's lives",
};

const originLabels: Record<string, string> = {
  parentification: "being the responsible one in your family — the child who had to grow up too fast",
  invalidation: "being told you were too much, too sensitive, too emotional",
  neglect: "having your needs consistently come last",
  conditional_love: "learning that love was something you had to earn through achievement",
  absorbed_pain: "absorbing everyone else's pain to keep the peace",
};

export function getProductPrescription(
  conversionPath: string,
  archetype: Archetype,
  primaryDesire: string,
  primaryBelief: string,
  primaryFear: string,
  originPattern: string,
  name: string,
  gender: string = 'female'
): { primary: ProductPrescription; secondary?: ProductPrescription } {

  const belief = beliefLabels[primaryBelief] || "you're not enough";
  const fear = fearLabels[primaryFear] || "failing";
  const desire = desireLabels[primaryDesire] || "to feel like you are enough";
  const origin = originLabels[originPattern] || "childhood experiences that shaped your beliefs";
  const child = gender === 'male' ? 'little boy' : gender === 'non_binary' ? 'younger self' : 'little girl';
  const women = gender === 'male' ? 'men' : gender === 'non_binary' ? 'people' : 'women';
  const womenCap = gender === 'male' ? 'Men' : gender === 'non_binary' ? 'People' : 'Women';

  // ═══════════════════════════════════════════════
  // PATH A: RTT INTEGRATED CERTIFICATION
  // ═══════════════════════════════════════════════
  const rttIntegrated: ProductPrescription = {
    tag: "MARISA'S #1 RECOMMENDATION FOR YOU",
    name: "RTT Integrated Certification",
    price: "",
    whyYou: `${name}, let me be direct with you. Your quiz didn't just reveal your archetype — it revealed something I rarely see this clearly. You scored exceptionally high on healer potential. That instinct you have — the one where people always come to you with their problems, where you can feel what someone needs before they say it — that's not just empathy. That's a therapeutic gift.\n\nYour deepest desire is ${desire}. And here's what I've learned after 30 years: the fastest way to heal yourself is to learn how to heal others. Every single belief your quiz uncovered — the feeling that ${belief}, the fear of ${fear}, the pattern that started with ${origin} — RTT was built to resolve exactly these patterns. Not in years of talk therapy. In sessions.\n\nYou wouldn't just be getting a certification. You'd be getting the tools to rewire your OWN mind first — and then build a career doing the same for others.`,
    description: "RTT Integrated is Marisa Peer's flagship certification — the same methodology she's used on royalty, Olympic athletes, and CEOs. It trains you to become a certified Rapid Transformational Therapist with a full client practice.",
    benefits: [
      "Become a certified RTT practitioner — trained by Marisa Peer herself",
      "Learn to resolve issues like anxiety, depression, and limiting beliefs in 1-3 sessions (not months or years)",
      "Includes full business training so you can attract paying clients from day one",
      "Work from anywhere — build a practice around your life, not the other way around",
      "Join a global community of 18,000+ graduates who are changing lives in 80+ countries",
      "The average RTT practitioner charges $250-500 per session",
    ],
    proofPoint: `Over 18,000 ${women} have qualified as RTT practitioners. Many left careers they hated and now earn a full-time income doing work that gives them goosebumps every single day.`,
    ctaText: "Book Your Free Discovery Call",
    ctaUrl: "https://go.applyrtt.com/integrated-v-app",
    urgency: "A free 30-minute call with a Marisa Peer Admissions Advisor — no pressure, just clarity on whether this is right for you.",
  };

  // ═══════════════════════════════════════════════
  // PATH B: PEER HYPNOSIS METHOD
  // ═══════════════════════════════════════════════
  const peerHypnosis: ProductPrescription = {
    tag: "THE PERFECT FIRST STEP FOR YOU",
    name: "Peer Hypnosis Method Certification",
    price: "$2,950",
    whyYou: `${name}, your quiz revealed something interesting. You have genuine healer potential — that ability to sense what people need, to hold space, to make others feel safe. But I also noticed something else: a hesitation. A part of you that isn't sure you're ready for the full leap yet.\n\nThat hesitation? It's connected to the belief that ${belief}. It's the same pattern that started with ${origin}. And here's the beautiful thing — the Peer Hypnosis Method doesn't just teach you to help others. The first person you'll practise on is yourself.\n\nYou told me your biggest fear is ${fear}. This programme is designed so you can test your calling without the pressure of a massive commitment. Think of it as dipping your toes in — except the water is warm, and most ${women} who start here end up diving in completely.`,
    description: "The Peer Hypnosis Method is a certified training that gives you foundational hypnotherapy skills — enough to start helping friends, family, and even your first paying clients.",
    benefits: [
      "A recognised certification you can use immediately",
      "Learn Marisa's core techniques for rewiring beliefs at the subconscious level",
      "Start practising with people you know — and see real results",
      "Designed as a stepping stone — many graduates go on to full RTT certification",
      "Self-paced learning that fits around your current life",
      "Fraction of the investment of the full certification — with real, tangible skills",
    ],
    proofPoint: `Most ${women} who complete the Peer Hypnosis Method say it changed their life before they ever used it on anyone else — because the first mind you rewire is your own.`,
    ctaText: "Learn More About Peer Hypnosis",
    ctaUrl: "https://marisapeer.com/rtt-training-courses/",
  };

  // ═══════════════════════════════════════════════
  // PATH C: PREMIUM CONFIDENCE PROGRAMME
  // ═══════════════════════════════════════════════
  const premiumConfidence: ProductPrescription = {
    tag: "YOUR PERSONALISED TRANSFORMATION",
    name: "Confidence & Self-Worth Programme",
    price: "",
    whyYou: `${name}, I want to be honest with you about what your quiz revealed. Your scores show a pattern I see often in ${women} who are highly capable on the outside but deeply struggling on the inside. The belief that ${belief} isn't just an idea you carry — it's running your entire life. It's why you ${primaryFear === 'failure' ? "hold yourself back from the things you actually want" : primaryFear === 'judgment' ? "dim your light so others feel comfortable" : primaryFear === 'too_late' ? "keep telling yourself the window has closed" : "can't seem to break free from the same cycles"}.\n\nThis pattern started with ${origin}. And here's what I need you to understand: no amount of self-help books, affirmations, or willpower is going to shift something that was installed in your subconscious before you were 7 years old. You need someone trained in root cause therapy to go in and rewire it.\n\nThis programme pairs you with a dedicated RTT-trained coach who will work with you one-on-one over 90 days. They'll target the exact beliefs your quiz identified — not generic "confidence building." Targeted, surgical, permanent change.`,
    description: "A 90-180 day guided transformation with a certified RTT practitioner, working one-on-one on the specific beliefs and patterns your quiz identified.",
    benefits: [
      "A dedicated RTT-trained coach matched to your specific needs",
      "Root cause work on the exact belief your quiz identified: that " + belief,
      "Personalised hypnotherapy recordings you'll use between sessions",
      "90-180 day structured programme — long enough for real, lasting change",
      "Addresses the pattern from its origin — not just the symptoms",
      "Most clients report a fundamental shift within the first 3 sessions",
    ],
    proofPoint: "Marisa's methodology has been proven in clinical studies to create lasting change in 1-3 sessions. This programme gives you multiple sessions focused entirely on YOUR specific patterns.",
    ctaText: "Book a Free Consultation",
    ctaUrl: "https://marisapeer.com",
  };

  // ═══════════════════════════════════════════════
  // PATH D: I AM ENOUGH COURSE
  // ═══════════════════════════════════════════════
  const iamEnough: ProductPrescription = {
    tag: "START HERE — THIS WAS MADE FOR YOU",
    name: "I Am Enough Course",
    price: "$297 – $497",
    whyYou: `${name}, I want you to read this carefully. Every single thing your quiz revealed — the belief that ${belief}, the fear of ${fear}, the pattern that began with ${origin}, even your desire ${desire} — all of it traces back to one root belief: "I am not enough."\n\nI didn't design this course for everyone. I designed it for ${women} exactly like you. ${womenCap} who are smart enough to know something is holding them back, but who've never been able to name it — let alone fix it. ${womenCap} who've tried journaling, therapy, self-help books, and still feel stuck in the same loop.\n\nThe I Am Enough course doesn't just teach you to think differently. It uses hypnotherapy to rewire the belief at its source — in your subconscious mind, where it was installed during ${origin}. Over 1 million people have been impacted by this movement. And most of them started exactly where you are right now.`,
    description: "Marisa Peer's signature self-paced programme that uses hypnotherapy to permanently rewire the core belief that drives almost every struggle: 'I am not enough.'",
    benefits: [
      "Directly targets the #1 belief your quiz identified: that " + belief,
      "Includes powerful hypnotherapy audio sessions you can use for life",
      "Self-paced — do it on your own time, in your own space",
      "Uses the same RTT methodology used by royalty, athletes, and CEOs",
      "Most people report feeling different within the first session",
      "The foundation Marisa recommends before any other programme",
    ],
    proofPoint: "Over 1 million people have been part of the I Am Enough movement. It's the single programme Marisa recommends as a starting point for almost everyone — because until this belief changes, nothing else can.",
    ctaText: "Start I Am Enough",
    ctaUrl: "https://marisapeer.com/iamenoughcourse/",
  };

  // ═══════════════════════════════════════════════
  // PATH E: COMMUNITY / ALL ACCESS
  // ═══════════════════════════════════════════════
  const community: ProductPrescription = {
    tag: "YOUR FIRST STEP",
    name: "All Access Transformation Pass",
    price: "$19/month",
    whyYou: `${name}, I know what it's like to feel like you want to change but not know where to start. Your quiz revealed the belief that ${belief}, and a fear of ${fear}. Those are real. And they didn't come from nowhere — they started with ${origin}.\n\nThe good news? You don't have to figure this out alone, and you don't have to make a massive commitment to begin. The All Access Pass gives you Marisa's entire library of 90+ programmes — including specific work on ${primaryDesire === 'self_worth' ? 'self-worth and the "not enough" belief' : primaryDesire === 'confidence' ? 'confidence, self-doubt, and imposter syndrome' : primaryDesire === 'freedom' ? 'breaking free from the patterns that keep you stuck' : primaryDesire === 'purpose' ? 'finding your calling and stepping into it' : 'the exact patterns your quiz revealed'}.\n\nPlus you get the "Marisa in Your Pocket" AI companion — it's like having Marisa's guidance available 24/7, whenever that inner critic gets loud. For less than the price of a coffee a week, you get access to everything. And you can cancel anytime.`,
    description: `Full access to Marisa Peer's complete library of 90+ personal development programmes, plus the AI coaching companion and a supportive community of ${women} on the same journey.`,
    benefits: [
      "90+ programmes covering confidence, relationships, money, health, and career",
      "Specific programmes that address your belief that " + belief,
      "\"Marisa in Your Pocket\" AI companion for guidance whenever you need it",
      `A community of ${women} who understand exactly what you're going through`,
      "New content and live sessions added every month",
      "Cancel anytime — no lock-in, no risk",
    ],
    proofPoint: `Thousands of ${women} use the All Access Pass as their daily companion for transformation. Most say it's the best investment they've ever made in themselves — and at $19/month, it's the most accessible way to start.`,
    ctaText: "Start for $19/month",
    ctaUrl: "https://marisapeer.com",
  };

  let primary: ProductPrescription;
  let secondary: ProductPrescription | undefined;

  switch (conversionPath) {
    case 'A':
      primary = rttIntegrated;
      secondary = iamEnough;
      break;
    case 'B':
      primary = peerHypnosis;
      secondary = iamEnough;
      break;
    case 'C':
      primary = premiumConfidence;
      secondary = community;
      break;
    case 'D':
      primary = iamEnough;
      secondary = community;
      break;
    default:
      primary = community;
      break;
  }

  return { primary, secondary };
}
