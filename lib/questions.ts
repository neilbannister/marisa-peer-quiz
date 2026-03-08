export interface QuizOption {
  key: string;
  text: string;
  subtext?: string;
  scores: Record<string, number>;
}

export interface QuizQuestion {
  id: number;
  type: 'choice' | 'name' | 'email' | 'gender';
  header?: string; // shown above question, uses {name}
  question: string; // uses {name} placeholder
  subtext?: string;
  options?: QuizOption[];
  framework: string; // what Marisa framework this maps to
  personalisation: string; // how this feeds the report
}

export const questions: QuizQuestion[] = [
  // ─── QUESTION 1: CURRENT STATE ────────────────────────
  {
    id: 1,
    type: 'choice',
    question: "Before we dive in — which of these feels most like you RIGHT NOW?",
    subtext: "Go with your gut. There's no wrong answer.",
    framework: "Current emotional state + primary manifestation domain",
    personalisation: "Opens the coaching report — first line references this answer",
    options: [
      {
        key: 'A',
        text: "I'm functioning but I'm not LIVING",
        subtext: "I go through the motions, but there's this quiet emptiness underneath everything.",
        scores: { healer: 1, powerhouse: 2, freedom: 1, deep_feeler: 1, renaissance: 0, rtt_intent: 0, readiness: 2, investment: 1, pain: 2, belief_not_enough: 2, domain_career: 2, coping_performing: 3 }
      },
      {
        key: 'B',
        text: "I give and give but nobody fills MY cup",
        subtext: "I pour into everyone else and wonder when it'll be my turn.",
        scores: { healer: 2, powerhouse: 0, freedom: 0, deep_feeler: 3, renaissance: 0, rtt_intent: 1, readiness: 2, investment: 1, pain: 3, belief_not_lovable: 3, domain_relationships: 2, coping_pleasing: 3 }
      },
      {
        key: 'C',
        text: "I KNOW I'm meant for more but I can't figure out what",
        subtext: "The frustration of knowing you have potential but not being able to access it.",
        scores: { healer: 1, powerhouse: 1, freedom: 2, deep_feeler: 0, renaissance: 3, rtt_intent: 1, readiness: 3, investment: 2, pain: 2, belief_not_enough: 2, domain_purpose: 3, coping_seeking: 3 }
      },
      {
        key: 'D',
        text: "I'm exhausted from pretending everything is fine",
        subtext: "The mask is getting heavy. Something has to change.",
        scores: { healer: 0, powerhouse: 1, freedom: 1, deep_feeler: 3, renaissance: 0, rtt_intent: 0, readiness: 3, investment: 2, pain: 4, belief_not_lovable: 2, domain_health: 2, coping_performing: 2 }
      },
      {
        key: 'E',
        text: "I'm standing at a crossroads and I'm terrified of choosing wrong",
        subtext: "Big decisions feel paralysing because the stakes feel so high.",
        scores: { healer: 0, powerhouse: 2, freedom: 2, deep_feeler: 1, renaissance: 1, rtt_intent: 0, readiness: 2, investment: 1, pain: 2, belief_dont_deserve: 3, domain_career: 2, coping_freezing: 3 }
      }
    ]
  },

  // ─── QUESTION 2: CHILDHOOD WINDOW ─────────────────────
  {
    id: 2,
    type: 'choice',
    question: "Think back to when you were young. Which of these was most true in your family?",
    subtext: "This isn't about blame — it's about understanding.",
    framework: "Origin pattern — where the core limiting belief was installed",
    personalisation: "Generates the 'Where It All Began' section of coaching report",
    options: [
      {
        key: 'A',
        text: "I was the \"good one\"",
        subtext: "Responsible, helpful, never causing trouble. I earned my place by being useful.",
        scores: { healer: 2, powerhouse: 1, deep_feeler: 1, origin_parentification: 3, belief_earn_love: 3 }
      },
      {
        key: 'B',
        text: "I was the sensitive one",
        subtext: "I felt everything deeply and was told I was \"too much\" or \"too emotional.\"",
        scores: { healer: 1, deep_feeler: 3, renaissance: 1, origin_invalidation: 3, belief_something_wrong: 3 }
      },
      {
        key: 'C',
        text: "I was the invisible one",
        subtext: "My needs always came last. I learned to not ask for anything.",
        scores: { powerhouse: 1, deep_feeler: 2, origin_neglect: 3, belief_not_important: 3 }
      },
      {
        key: 'D',
        text: "I was the achiever",
        subtext: "Love felt conditional on performance. Good grades, good behaviour, good everything.",
        scores: { powerhouse: 3, freedom: 1, origin_conditional_love: 3, belief_never_enough: 3 }
      },
      {
        key: 'E',
        text: "I was the peacekeeper",
        subtext: "I absorbed everyone else's emotions to keep things calm. My feelings came last.",
        scores: { healer: 3, deep_feeler: 2, origin_enmeshment: 3, belief_feelings_dont_matter: 3 }
      }
    ]
  },

  // ─── QUESTION 3: NAME CAPTURE ─────────────────────────
  {
    id: 3,
    type: 'name',
    question: "We're about to get personal — what's your first name?",
    subtext: "We ask because your results will be genuinely personalised to YOUR answers.",
    framework: "Name capture for personalisation",
    personalisation: "Used 30+ times throughout the entire experience"
  },

  // ─── QUESTION 3b: GENDER ─────────────────────────────
  {
    id: 16,
    type: 'gender',
    header: "One more thing, {name}...",
    question: "How do you identify?",
    subtext: "This helps us personalise your results and coaching.",
    framework: "Gender for personalisation of language",
    personalisation: "Adapts all pronouns, references, and coaching language"
  },

  // ─── QUESTION 4: LIMITING BELIEF ──────────────────────
  {
    id: 4,
    type: 'choice',
    header: "Okay {name}, be honest with me...",
    question: "Which of these thoughts crosses your mind most often?",
    framework: "Core limiting belief identification — Marisa's master framework",
    personalisation: "Headline of Hidden Block section; directly quoted in report",
    options: [
      {
        key: 'A',
        text: "\"I'm not qualified/ready/experienced enough for that\"",
        scores: { powerhouse: 3, belief_not_enough_capability: 4, pain: 2 }
      },
      {
        key: 'B',
        text: "\"If people really knew me, they wouldn't like me\"",
        scores: { deep_feeler: 2, powerhouse: 1, belief_not_lovable_authentic: 4, pain: 3 }
      },
      {
        key: 'C',
        text: "\"Good things happen to other people, not to me\"",
        scores: { deep_feeler: 2, belief_dont_deserve_good: 4, pain: 3 }
      },
      {
        key: 'D',
        text: "\"I have to work twice as hard as everyone else just to keep up\"",
        scores: { powerhouse: 3, belief_not_enough_inherent: 4, pain: 2 }
      },
      {
        key: 'E',
        text: "\"What's the point of trying? It probably won't work out anyway\"",
        scores: { renaissance: 1, belief_learned_helplessness: 4, pain: 4 }
      }
    ]
  },

  // ─── QUESTION 5: BODY CHECK ───────────────────────────
  {
    id: 5,
    type: 'choice',
    header: "{name}, this one might surprise you...",
    question: "Where do you feel stress or anxiety most in your body?",
    subtext: "Your body holds clues your conscious mind misses.",
    framework: "Somatisation pattern — Marisa's mind-body connection framework",
    personalisation: "Generates 'Your Body Is Talking' section with specific body-belief link",
    options: [
      {
        key: 'A',
        text: "Chest / heart area",
        subtext: "Tightness, racing, heaviness",
        scores: { deep_feeler: 2, body_heart: 3, belief_not_lovable: 1 }
      },
      {
        key: 'B',
        text: "Stomach / gut",
        subtext: "Nausea, knots, digestive issues",
        scores: { body_gut: 3, belief_fear: 2 }
      },
      {
        key: 'C',
        text: "Throat / jaw",
        subtext: "Lump in throat, clenching, difficulty speaking up",
        scores: { powerhouse: 1, body_throat: 3, belief_not_heard: 2 }
      },
      {
        key: 'D',
        text: "Head",
        subtext: "Tension, overthinking, migraines",
        scores: { renaissance: 1, body_head: 3, belief_not_enough_control: 1 }
      },
      {
        key: 'E',
        text: "Shoulders / back",
        subtext: "Carrying weight, tension, pain",
        scores: { healer: 1, body_shoulders: 3, belief_carrying_others: 2 }
      },
      {
        key: 'F',
        text: "All over — general exhaustion",
        subtext: "Burnout, numbness, running on empty",
        scores: { deep_feeler: 2, pain: 2, body_systemic: 3, belief_depleted: 2 }
      }
    ]
  },

  // ─── QUESTION 6: RELATIONSHIP REVEAL ──────────────────
  {
    id: 6,
    type: 'choice',
    header: "{name}, let's look at your relationships...",
    question: "In your closest relationship right now, what pattern keeps showing up?",
    framework: "Interpersonal manifestation of core belief",
    personalisation: "Cross-referenced with Q2 to show childhood→adult pattern thread",
    options: [
      {
        key: 'A',
        text: "I over-give and then feel resentful",
        subtext: "It's never reciprocated the way I need.",
        scores: { healer: 2, deep_feeler: 1, rel_over_giver: 3, belief_not_lovable: 1 }
      },
      {
        key: 'B',
        text: "I avoid conflict at all costs",
        subtext: "I'd rather swallow my feelings than rock the boat.",
        scores: { powerhouse: 1, rel_conflict_avoidant: 3, belief_not_important: 2 }
      },
      {
        key: 'C',
        text: "I feel like I'm performing a role",
        subtext: "Instead of being myself, I'm playing a character.",
        scores: { powerhouse: 2, rel_masked: 3, belief_not_lovable_authentic: 2 }
      },
      {
        key: 'D',
        text: "I push people away before they can disappoint me",
        subtext: "Self-protection has become my default.",
        scores: { freedom: 1, rel_avoidant: 3, belief_fear_rejection: 2 }
      },
      {
        key: 'E',
        text: "I attract people who need \"fixing\"",
        subtext: "I'm always the strong one, the helper, the fixer.",
        scores: { healer: 3, rel_rescuer: 3, belief_earn_love: 2, rtt_intent: 1 }
      },
      {
        key: 'F',
        text: "I'm not in a close relationship right now",
        subtext: "And I tell myself I'm fine with that.",
        scores: { rel_self_protective: 3, belief_dont_deserve: 2 }
      }
    ]
  },

  // ─── QUESTION 7: MONEY MIRROR ─────────────────────────
  {
    id: 7,
    type: 'choice',
    header: "{name}, let's talk about money...",
    question: "What's your honest relationship with money?",
    subtext: "No judgment. Just truth.",
    framework: "Wealth belief identification — connects to self-worth",
    personalisation: "Informs offer routing + feeds money section of report",
    options: [
      {
        key: 'A',
        text: "I work hard but money never matches my effort",
        scores: { money_effort_not_rewarded: 3, investment: 3, belief_not_enough: 1 }
      },
      {
        key: 'B',
        text: "I feel guilty spending on myself",
        subtext: "Other people's needs always come first.",
        scores: { deep_feeler: 1, money_guilt: 3, investment: 1, belief_not_important: 1 }
      },
      {
        key: 'C',
        text: "I know I could earn more but something stops me",
        subtext: "I can't seem to ask for or charge what I'm worth.",
        scores: { powerhouse: 2, money_undervaluing: 3, investment: 3, belief_not_enough: 2 }
      },
      {
        key: 'D',
        text: "Money feels scarce and scary",
        subtext: "I'm always worried about running out.",
        scores: { money_scarcity: 3, investment: 0, belief_fear: 2 }
      },
      {
        key: 'E',
        text: "I'm comfortable but playing small financially",
        scores: { freedom: 1, money_comfort_zone: 3, investment: 4, belief_dont_deserve: 1 }
      },
      {
        key: 'F',
        text: "I can't break through my income ceiling",
        subtext: "I've tried everything but I keep hitting the same wall.",
        scores: { freedom: 1, money_ceiling: 3, investment: 4, readiness: 2 }
      }
    ]
  },

  // ─── QUESTION 8: PURPOSE PROBE ────────────────────────
  {
    id: 8,
    type: 'choice',
    header: "{name}, imagine this...",
    question: "When you picture doing work that truly lights you up — what does it FEEL like?",
    framework: "Purpose energy identification — archetype signal",
    personalisation: "Becomes the vision statement in the report",
    options: [
      {
        key: 'A',
        text: "It feels like deep connection",
        subtext: "Meaningful conversations where I help someone see themselves clearly.",
        scores: { healer: 5, rtt_intent: 3, purpose_connection: 3 }
      },
      {
        key: 'B',
        text: "It feels like freedom",
        subtext: "Working on my terms, no ceiling, no box.",
        scores: { freedom: 5, purpose_freedom: 3 }
      },
      {
        key: 'C',
        text: "It feels like impact",
        subtext: "Knowing my work is genuinely changing someone's life.",
        scores: { healer: 3, powerhouse: 2, rtt_intent: 2, purpose_impact: 3 }
      },
      {
        key: 'D',
        text: "It feels like expression",
        subtext: "Finally letting out everything I've been holding in.",
        scores: { renaissance: 5, purpose_expression: 3 }
      },
      {
        key: 'E',
        text: "It feels like confidence",
        subtext: "Standing tall and being SEEN for who I really am.",
        scores: { powerhouse: 5, purpose_visibility: 3 }
      },
      {
        key: 'F',
        text: "Honestly? I can't even picture it.",
        subtext: "That's the problem.",
        scores: { pain: 4, readiness: 3, purpose_blocked: 3 }
      }
    ]
  },

  // ─── QUESTION 9: HEALER IDENTIFIER ────────────────────
  {
    id: 9,
    type: 'choice',
    header: "{name}, I'm curious about something...",
    question: "Have you ever had this experience — someone shares a problem and you can instantly see what's REALLY going on underneath?",
    framework: "Natural therapeutic ability — RTT pipeline qualifier",
    personalisation: "Triggers special 'Born Healer' section for high scorers",
    options: [
      {
        key: 'A',
        text: "Yes, ALL the time",
        subtext: "I see patterns in people they can't see in themselves.",
        scores: { healer: 5, rtt_intent: 5, healer_ability_exceptional: 3 }
      },
      {
        key: 'B',
        text: "Yes, especially with close friends",
        subtext: "But I never know what to do with the insight.",
        scores: { healer: 3, rtt_intent: 4, healer_ability_strong: 3 }
      },
      {
        key: 'C',
        text: "Sometimes — but I don't trust my read",
        subtext: "I'm intuitive but I second-guess myself.",
        scores: { healer: 2, rtt_intent: 3, powerhouse: 1, healer_ability_suppressed: 3 }
      },
      {
        key: 'D',
        text: "Not really",
        subtext: "I'm more in my own head than reading other people.",
        scores: { renaissance: 2, healer_ability_low: 3 }
      },
      {
        key: 'E',
        text: "Yes — and people keep telling me to do something with it",
        subtext: "I've been told I should be a therapist more times than I can count.",
        scores: { healer: 5, rtt_intent: 6, healer_ability_validated: 3 }
      }
    ]
  },

  // ─── QUESTION 10: FEAR REVEAL ─────────────────────────
  {
    id: 10,
    type: 'choice',
    header: "{name}, this one takes courage...",
    question: "What scares you MOST about actually going after what you want?",
    framework: "Primary resistance pattern + objection prediction for sales",
    personalisation: "Pre-empts their objection in report AND in sales sequence",
    options: [
      {
        key: 'A',
        text: "That I'll fail and prove everyone right",
        subtext: "Including the voice in my own head.",
        scores: { powerhouse: 2, fear_failure: 4, pain: 2 }
      },
      {
        key: 'B',
        text: "That I'll succeed and everything will change",
        subtext: "Change feels terrifying, even good change.",
        scores: { fear_success: 4, readiness: 1 }
      },
      {
        key: 'C',
        text: "That people will judge me",
        subtext: "They'll think I'm being ridiculous or selfish.",
        scores: { powerhouse: 1, deep_feeler: 1, fear_judgment: 4 }
      },
      {
        key: 'D',
        text: "That I'll invest and end up right back here",
        subtext: "I've tried things before. What if this is the same?",
        scores: { fear_wasted: 4, investment: -1 }
      },
      {
        key: 'E',
        text: "That I've missed my window — it's too late",
        subtext: "Maybe the time for big changes has passed.",
        scores: { fear_too_late: 4, pain: 2 }
      }
    ]
  },

  // ─── QUESTION 11: TRANSFORMATION WINDOW ───────────────
  {
    id: 11,
    type: 'choice',
    header: "{name}, if you could wave a magic wand...",
    question: "What ONE thing would you change about your inner world?",
    framework: "Primary desire + product matching",
    personalisation: "Becomes 'Your Personalised Pathway' section of report",
    options: [
      {
        key: 'A',
        text: "I'd finally believe I'm enough",
        subtext: "Without having to prove it every single day.",
        scores: { powerhouse: 2, desire_self_worth: 4, product_iam_enough: 3 }
      },
      {
        key: 'B',
        text: "I'd trust myself to make big decisions",
        subtext: "Without second-guessing everything.",
        scores: { powerhouse: 2, freedom: 1, desire_self_trust: 4, product_confidence: 3 }
      },
      {
        key: 'C',
        text: "I'd stop caring what other people think",
        subtext: "And finally live for ME.",
        scores: { freedom: 3, desire_authenticity: 4, product_freedom: 3 }
      },
      {
        key: 'D',
        text: "I'd heal the pain I've been carrying",
        subtext: "So I could actually move forward.",
        scores: { deep_feeler: 2, desire_healing: 4, product_premium_pd: 3, investment: 2 }
      },
      {
        key: 'E',
        text: "I'd know my purpose with absolute certainty",
        subtext: "And have the courage to pursue it.",
        scores: { renaissance: 2, freedom: 1, desire_purpose: 4, product_bridge: 3, readiness: 2 }
      },
      {
        key: 'F',
        text: "I'd have the skills to help OTHERS transform",
        subtext: "That would be everything.",
        scores: { healer: 3, rtt_intent: 5, desire_help_others: 4, product_rtt: 4 }
      }
    ]
  },

  // ─── QUESTION 12: READINESS ───────────────────────────
  {
    id: 12,
    type: 'choice',
    header: "Nearly there, {name}...",
    question: "How ready do you feel to actually make a change — not \"someday\" but NOW?",
    framework: "Readiness scoring — determines report tone",
    personalisation: "Sets the tone: high readiness = direct/action, low = nurturing/belief-building",
    options: [
      {
        key: 'A',
        text: "I'm SO ready — just show me the path",
        scores: { readiness: 5, investment: 2 }
      },
      {
        key: 'B',
        text: "I'm ready but scared — I need to feel safe first",
        scores: { readiness: 3, investment: 1 }
      },
      {
        key: 'C',
        text: "I'm warming up — I need more information",
        scores: { readiness: 1 }
      },
      {
        key: 'D',
        text: "I'm curious but not sure it's possible for me",
        scores: { readiness: 0, pain: 1 }
      }
    ]
  },

  // ─── QUESTION 13: INVESTMENT SIGNAL ───────────────────
  {
    id: 13,
    type: 'choice',
    header: "{name}, imagine this scenario...",
    question: "If the RIGHT opportunity landed in front of you — one that could genuinely change your life's trajectory — what would you do?",
    framework: "Investment readiness (without asking about money directly)",
    personalisation: "Determines which price-point offer to show",
    options: [
      {
        key: 'A',
        text: "I'd go all in immediately",
        subtext: "Life's too short to wait.",
        scores: { investment: 5, readiness: 2 }
      },
      {
        key: 'B',
        text: "I'd move quickly but I'd need to understand what I'm getting",
        scores: { investment: 3, readiness: 1 }
      },
      {
        key: 'C',
        text: "I'd start small and build up as I see results",
        scores: { investment: 1 }
      },
      {
        key: 'D',
        text: "I'd need to think — I've been burned before",
        scores: { investment: -1, fear_wasted: 1 }
      }
    ]
  },

  // ─── QUESTION 14: WORK CONTEXT ────────────────────────
  {
    id: 14,
    type: 'choice',
    header: "Almost there, {name}!",
    question: "What's your current work situation?",
    framework: "Career context for personalisation and offer matching",
    personalisation: "Referenced in report; informs career-change messaging",
    options: [
      {
        key: 'A',
        text: "Employed full-time",
        scores: { context_employed: 3 }
      },
      {
        key: 'B',
        text: "Self-employed or freelancing",
        scores: { context_self_employed: 3, freedom: 1 }
      },
      {
        key: 'C',
        text: "Stay-at-home parent",
        scores: { context_parent: 3, rtt_intent: 1 }
      },
      {
        key: 'D',
        text: "In a helping profession",
        subtext: "Coaching, therapy, healthcare, teaching",
        scores: { context_helper: 3, healer: 2, rtt_intent: 2 }
      },
      {
        key: 'E',
        text: "At a crossroads",
        subtext: "In between, transitioning, or re-evaluating",
        scores: { context_crossroads: 3, readiness: 2, rtt_intent: 1 }
      },
      {
        key: 'F',
        text: "Retired or semi-retired",
        scores: { context_retired: 3 }
      }
    ]
  },

  // ─── QUESTION 15: EMAIL + AGE ─────────────────────────
  {
    id: 15,
    type: 'email',
    header: "{name}, your personalised coaching report is ready...",
    question: "Enter your email to unlock it — it takes about 60 seconds to generate because it's built from YOUR specific answers.",
    subtext: "Your report includes: your archetype breakdown, hidden belief analysis, a personalised coaching message, and your recommended next step.",
    framework: "Email capture + age for personalisation",
    personalisation: "Gates the full coaching report delivery"
  }
];
