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

  const readinessLevel = overallScore >= 70 ? 'High' : overallScore >= 45 ? 'Emerging' : 'Awakening';
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
  name: string
): { deepDive: string; dailyReflection: string; futureself: string } {
  const deepDive = originPattern === 'parentification'
    ? `${name}, write a letter to the little girl who learned she had to be "good" to be loved. Tell her what you wish someone had told her back then. Tell her she was already enough — without being helpful, responsible, or perfect.`
    : originPattern === 'invalidation'
    ? `${name}, write a letter to the little girl who was told she was "too much." Tell her that her sensitivity is a gift, not a flaw. Tell her that the world needs exactly the depth she carries.`
    : originPattern === 'neglect'
    ? `${name}, write a letter to the little girl whose needs always came last. Tell her that she matters. Tell her that her desires, her dreams, her feelings — they all count. They always did.`
    : originPattern === 'conditional_love'
    ? `${name}, write a letter to the little girl who believed love had to be earned through achievement. Tell her that she is loved for who she IS, not what she does. Tell her she can rest.`
    : `${name}, write a letter to the little girl who absorbed everyone else's pain to keep the peace. Tell her it was never her job to hold the family together. Tell her she's allowed to put herself first.`;

  const dailyReflection = archetype === 'born_healer'
    ? "Today, instead of asking 'How can I help?' — ask yourself: 'What do I need right now?' Write whatever comes up, without filtering or judging."
    : archetype === 'quiet_powerhouse'
    ? "Write about one moment today where you held back, dimmed your light, or didn't speak up. What would you have said or done if you fully believed you were enough?"
    : archetype === 'freedom_chaser'
    ? "Describe your ideal Tuesday in vivid detail — not a holiday, but an ordinary day in the life you actually want. What does freedom look like in the mundane?"
    : archetype === 'deep_feeler'
    ? "What emotion have you been carrying today that isn't yours? Write it down, name whose it is, and then write: 'I release what is not mine to carry.'"
    : "List three things you started and didn't finish this year. For each one, write whether you stopped because it wasn't right for you — or because you were afraid.";

  const futureself = `Close your eyes for 60 seconds and imagine yourself one year from today, ${name}. The version of you who made the brave choice. Who did the inner work. Who finally stepped into her calling. Now open your eyes and write her a letter that starts: "Dear Future ${name}, I'm writing to tell you that today I decided..."`;

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
      context: "Based on your Born Healer profile, this training shows you exactly what RTT is and how women like you are using it to build thriving careers.",
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
      description: "Stories of women who transformed their lives at 40, 50, and 60+.",
      youtubeId: "LNHBMFCzznE",
      duration: "8 min",
      context: "You said you fear it's too late. These women prove otherwise.",
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
// PRODUCT PRESCRIPTIONS (framed as coaching advice)
// ─────────────────────────────────────────────────

export interface ProductPrescription {
  tag: string; // e.g., "YOUR #1 RECOMMENDATION"
  name: string;
  price: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaUrl: string;
  urgency?: string;
}

export function getProductPrescription(
  conversionPath: string,
  archetype: Archetype,
  primaryDesire: string,
  name: string
): { primary: ProductPrescription; secondary?: ProductPrescription } {

  const prescriptions: Record<string, ProductPrescription> = {
    rtt_integrated: {
      tag: "MARISA'S RECOMMENDATION FOR YOU",
      name: "RTT Integrated Certification",
      price: "Speak with an advisor about investment options",
      description: `${name}, based on everything your quiz revealed — your natural healing ability, your desire to help others, and your readiness for change — I believe RTT Integrated is the path you've been searching for. It's not just a certification. It's the vehicle for your calling.`,
      benefits: [
        "Become a certified RTT practitioner in months, not years",
        "Learn the exact methodology used on royalty, CEOs, and Olympic athletes",
        "Build a practice that gives you financial freedom AND deep purpose",
        "Join 18,000+ graduates who are transforming lives worldwide",
        "Includes business training to help you attract clients from day one",
      ],
      ctaText: "Book Your Free Discovery Call",
      ctaUrl: "https://go.applyrtt.com/integrated-v-app",
      urgency: "Free 30-minute call with a Marisa Peer Admissions Advisor",
    },
    peer_hypnosis: {
      tag: "YOUR STARTING POINT",
      name: "Peer Hypnosis Method Certification",
      price: "$2,950",
      description: `${name}, you have the natural empathy and insight to start helping people now. The Peer Hypnosis Method gives you a powerful, certified toolkit — and it's the perfect first step to see if this is your calling.`,
      benefits: [
        "Certification with a personal development angle",
        "Learn foundational hypnosis techniques from Marisa Peer",
        "Start practising with friends, family, or first clients",
        "A stepping stone to the full RTT certification if you choose",
      ],
      ctaText: "Learn More About Peer Hypnosis",
      ctaUrl: "https://marisapeer.com/rtt-training-courses/",
    },
    premium_confidence: {
      tag: "YOUR TRANSFORMATION PROGRAMME",
      name: "Confidence & Self-Worth Programme",
      price: "$3,000 – $6,000",
      description: `${name}, your quiz reveals that before anything else changes — your career, your relationships, your income — this inner work needs to happen. This isn't a course. It's a 90-day guided transformation with a dedicated RTT-trained coach.`,
      benefits: [
        "Dedicated RTT coach guiding your transformation",
        "90-180 day structured programme",
        "Root cause work on the specific beliefs your quiz identified",
        "Measurable, lasting change — not temporary motivation",
      ],
      ctaText: "Book a Free Consultation",
      ctaUrl: "https://marisapeer.com",
    },
    iam_enough: {
      tag: "START HERE",
      name: "I Am Enough Course",
      price: "$297 – $497",
      description: `Everything your quiz revealed traces back to one belief, ${name}. This course was designed specifically to rewire it. Over 1 million people have been impacted by the I Am Enough movement.`,
      benefits: [
        "Marisa's signature programme for rewiring your core belief",
        "Self-paced but deeply guided",
        "Includes powerful hypnotherapy audio sessions",
        "The foundation for everything that comes next",
      ],
      ctaText: "Start I Am Enough",
      ctaUrl: "https://marisapeer.com/iamenoughcourse/",
    },
    community: {
      tag: "YOUR FIRST STEP",
      name: "All Access Transformation Pass",
      price: "$19/month",
      description: `${name}, transformation is a journey. For less than the price of a coffee a week, you get Marisa's complete library of 90+ programmes plus the AI companion that delivers her guidance 24/7.`,
      benefits: [
        "90+ personal development programmes",
        "\"Marisa in Your Pocket\" AI companion",
        "Supportive community of women on the same journey",
        "New content and live sessions every month",
        "Cancel anytime",
      ],
      ctaText: "Start for $19/month",
      ctaUrl: "https://marisapeer.com",
    },
  };

  let primary: ProductPrescription;
  let secondary: ProductPrescription | undefined;

  switch (conversionPath) {
    case 'A':
      primary = prescriptions.rtt_integrated;
      secondary = prescriptions.iam_enough;
      break;
    case 'B':
      primary = prescriptions.peer_hypnosis;
      secondary = prescriptions.iam_enough;
      break;
    case 'C':
      primary = prescriptions.premium_confidence;
      secondary = prescriptions.community;
      break;
    case 'D':
      primary = prescriptions.iam_enough;
      secondary = prescriptions.community;
      break;
    default:
      primary = prescriptions.community;
      break;
  }

  return { primary, secondary };
}
