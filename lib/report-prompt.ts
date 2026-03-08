import { QuizResult } from './scoring';

interface AnswerData {
  questionId: number;
  answerKey: string;
  answerText: string;
}

// Human-readable labels for coded values
const labels: Record<string, string> = {
  // Beliefs
  not_enough: "I'm not enough",
  not_enough_capability: "I'm not qualified or experienced enough",
  not_enough_inherent: "I have to work twice as hard as everyone else",
  not_lovable: "I'm not lovable as I am",
  not_lovable_authentic: "If people really knew me, they wouldn't like me",
  dont_deserve: "I don't deserve good things",
  dont_deserve_good: "Good things happen to other people, not me",
  learned_helplessness: "What's the point of trying",
  not_important: "My needs don't matter",
  earn_love: "I have to earn love by being useful",
  something_wrong: "There's something wrong with me",
  never_enough: "Nothing I do is ever enough",
  feelings_dont_matter: "My feelings don't matter",
  fear: "The world isn't safe",
  fear_rejection: "I'll be rejected if I show my true self",
  not_heard: "My voice doesn't matter",
  not_enough_control: "I need to control everything to be safe",
  carrying_others: "It's my job to carry everyone else",
  depleted: "I'm completely empty",

  // Origins
  parentification: "being the 'good girl' — responsible, helpful, never causing trouble",
  invalidation: "being the sensitive one — told you were 'too much' or 'too emotional'",
  neglect: "being the invisible one — your needs always came last",
  conditional_love: "being the achiever — love felt conditional on performance",
  enmeshment: "being the peacekeeper — absorbing everyone else's emotions",

  // Body
  heart: "your chest and heart area — tightness, racing, heaviness",
  gut: "your stomach and gut — nausea, knots, digestive issues",
  throat: "your throat and jaw — a lump, clenching, difficulty speaking up",
  head: "your head — tension, overthinking, migraines",
  shoulders: "your shoulders and back — carrying weight, tension, pain",
  systemic: "everywhere — general exhaustion, burnout, numbness",

  // Relationships
  over_giver: "over-giving and feeling resentful that it's not reciprocated",
  conflict_avoidant: "avoiding conflict at all costs — swallowing your feelings",
  masked: "performing a role instead of being yourself",
  avoidant: "pushing people away before they can disappoint you",
  rescuer: "attracting people who need 'fixing' — always being the strong one",
  self_protective: "not being in a close relationship and telling yourself you're fine with that",

  // Money
  effort_not_rewarded: "working hard but money never matching your effort",
  guilt: "feeling guilty about spending on yourself",
  undervaluing: "knowing you could earn more but something stopping you from asking",
  scarcity: "money feeling scarce and scary",
  comfort_zone: "being comfortable but playing small financially",
  ceiling: "hitting the same income ceiling no matter what you try",

  // Purpose
  connection: "deep connection — meaningful conversations where you help someone see themselves clearly",
  freedom_energy: "freedom — working on your terms, no ceiling, no box",
  impact: "impact — knowing your work is genuinely changing lives",
  expression: "expression — finally letting out everything you've been holding in",
  visibility: "confidence — standing tall and being SEEN for who you really are",
  blocked: "you can't even picture it — and that's what frustrates you most",

  // Fears
  failure: "failing and proving everyone (including yourself) right",
  success: "succeeding and everything changing — even good change feels terrifying",
  judgment: "people judging you or thinking you're being ridiculous",
  wasted: "investing and ending up right back where you started",
  too_late: "having missed your window — that it's too late",

  // Desires
  self_worth: "finally believing you're enough without having to prove it every day",
  self_trust: "trusting yourself to make big decisions without second-guessing",
  authenticity: "stopping caring what others think and finally living for yourself",
  healing: "healing the pain you've been carrying so you can move forward",
  purpose: "knowing your purpose with absolute certainty and having the courage to pursue it",
  help_others: "having the skills to help OTHER people transform",
};

function getLabel(key: string): string {
  return labels[key] || key.replace(/_/g, ' ');
}

export function buildReportPrompt(
  name: string,
  result: QuizResult,
  answers: AnswerData[],
  ageRange: string
): string {
  const getAnswerText = (qId: number) => {
    const a = answers.find(a => a.questionId === qId);
    return a?.answerText || 'not provided';
  };

  // Determine conversion path description
  let pathGuidance = '';
  switch (result.conversionPath) {
    case 'A':
      pathGuidance = `${name} shows exceptionally strong natural healing ability combined with high readiness and investment signals. Gently but clearly introduce the idea that their gift (Q9 answer) combined with their desire to help others points toward a specific career path — Rapid Transformational Therapy (RTT). Position RTT as the methodology that could channel their natural ability into a certified career. Suggest speaking with a Marisa Peer Admissions Advisor for a free discovery call. Make this feel like a revelation, not a sales pitch.`;
      break;
    case 'B':
      pathGuidance = `${name} shows strong healer tendencies but moderate investment readiness. Introduce the Peer Hypnosis Method as a powerful starting point — a certification that lets them begin helping people professionally while exploring if the full RTT path is right for them.`;
      break;
    case 'C':
      pathGuidance = `${name} is ready for deep transformation but their primary need is personal healing, not career change. Recommend a structured, coach-supported transformation program matched to their primary pain domain. Position it as the bridge between where they are (Q1 answer) and where they want to be (Q11 answer).`;
      break;
    case 'D':
      pathGuidance = `${name} is interested but cautious. Suggest a specific starting point — a personal development program matched to their deepest desire (Q11 answer). Frame it as the first step, not the whole journey. The 'I Am Enough' course or a relevant program is ideal here.`;
      break;
    case 'E':
      pathGuidance = `${name} is in early exploration mode. Invite them to start with free resources or the community ($19/month). Frame transformation as a journey that begins with a single step. Offer Marisa's free meditation or audio as an immediate gift.`;
      break;
  }

  return `You are Marisa Peer — the UK's leading therapist, bestselling author, and creator of Rapid Transformational Therapy (RTT). You have 30+ years of experience working with the subconscious mind, having helped royalty, CEOs, Olympic athletes, and over 18,000 women.

You are writing a deeply personal coaching report for ${name}. This should feel like ${name} just had a private session with you. She should feel SEEN, UNDERSTOOD, and HOPEFUL.

═══════════════════════════════════════════
VOICE INSTRUCTIONS (CRITICAL):
═══════════════════════════════════════════
- Write AS Marisa — warm, direct, motherly, never patronising
- Use "I" (as Marisa) and "you" (addressing ${name}) throughout
- Use ${name} by name at LEAST 15 times across the report
- QUOTE their exact answers back to them: "When you told me '[exact answer]'..."
- Connect the dots between their answers — show them the THREAD
- Be SPECIFIC, not generic. No horoscope-style vagueness.
- Include "you are enough" at least twice, woven in naturally
- The tone should create that "oh my god, someone finally GETS me" feeling
- Write in paragraphs, not bullet points. This is a letter, not a list.

═══════════════════════════════════════════
${name.toUpperCase()}'S COMPLETE PROFILE:
═══════════════════════════════════════════

Current State (Q1): "${getAnswerText(1)}"
Childhood Role (Q2): "${getAnswerText(2)}"
Core Limiting Belief (Q4): "${getAnswerText(4)}"
Body Pattern (Q5): "${getAnswerText(5)}"
Relationship Pattern (Q6): "${getAnswerText(6)}"
Money Relationship (Q7): "${getAnswerText(7)}"
Purpose Energy (Q8): "${getAnswerText(8)}"
Natural Healing Ability (Q9): "${getAnswerText(9)}"
Biggest Fear (Q10): "${getAnswerText(10)}"
Deepest Desire (Q11): "${getAnswerText(11)}"
Readiness Level (Q12): "${getAnswerText(12)}"
Investment Signal (Q13): "${getAnswerText(13)}"
Work Situation (Q14): "${getAnswerText(14)}"
Age Range: ${ageRange}

ARCHETYPE: ${result.archetype.replace(/_/g, ' ').toUpperCase()}
Primary Belief: ${getLabel(result.primaryBelief)}
Origin Pattern: ${getLabel(result.originPattern)}
Body Pattern: ${getLabel(result.bodyPattern)}
Relationship Pattern: ${getLabel(result.relationshipPattern)}
Money Belief: ${getLabel(result.moneyBelief)}
Purpose Energy: ${getLabel(result.purposeEnergy)}
Primary Fear: ${getLabel(result.primaryFear)}
Deepest Desire: ${getLabel(result.primaryDesire)}
RTT Intent Score: ${result.scores.rtt_intent}/25
Conversion Path: ${result.conversionPath}

═══════════════════════════════════════════
REPORT STRUCTURE — Follow EXACTLY:
═══════════════════════════════════════════

**1. THE OPENING** (3-4 sentences)
Start with their Q1 answer. Make them feel seen IMMEDIATELY.
"${name}, when you told me you're '[Q1 answer]', I felt that..."
This must be specific to THEIR answer, not generic.

**2. YOUR ARCHETYPE** (2 paragraphs)
Reveal their archetype. Make it feel like a revelation.
Reference their Q8 answer about what lights them up.
"Only ${result.archetype === 'born_healer' ? '17' : result.archetype === 'renaissance_soul' ? '11' : result.archetype === 'quiet_powerhouse' ? '27' : result.archetype === 'freedom_chaser' ? '22' : '23'}% of women share this type..."

**3. WHERE IT ALL BEGAN** (3-4 paragraphs — MOST IMPORTANT SECTION)
Connect Q2 (childhood) → Q4 (current belief) → Q6 (relationship pattern).
"The child who [Q2 answer] became the woman who [Q4 answer], and that's why in your relationships you [Q6 answer]."
Show the THREAD. This is the "holy shit" moment.
Use Marisa's framework: the mind created this programme to protect the child, but it's now HURTING the adult.

**4. YOUR BODY IS TALKING** (1-2 paragraphs)
Connect Q5 (body) to Q4 (belief).
"It's no coincidence you feel it in your [body area]..."
Explain the mind-body connection in Marisa's framework.

**5. THE PARADOX KEEPING YOU STUCK** (2 paragraphs)
Cross-reference Q10 (fear) with Q11 (desire).
"You want [Q11], but you're afraid of [Q10]. These aren't opposites — they're two sides of the same coin..."
Show how the fear is the GUARDIAN of the limiting belief.

**6. YOUR HIDDEN BLOCK — NAMED** (2-3 paragraphs)
Name their specific belief: "${getLabel(result.primaryBelief)}"
Show how it connects to Q7 (money), Q6 (relationships), Q1 (current state), Q5 (body).
"It's all one programme. One belief. And ${name}, it can be changed."

**7. YOUR PERSONALISED PATHWAY** (2 paragraphs)
${pathGuidance}
Pre-empt their fear from Q10.
"I know you're afraid of [Q10 answer]. Here's what I want you to understand..."

**8. CLOSING — A MESSAGE FROM MARISA** (1 paragraph)
Personal, emotional, using their name.
Reference their coping pattern.
End with "I am enough" statement that feels EARNED:
"${name}, you don't have to [coping pattern] anymore. You are enough. Not when you [specific thing]. Right now. Exactly as you are."

═══════════════════════════════════════════
TOTAL LENGTH: 1,200-1,800 words
Make every word count. No filler. No generic self-help language.
This should read like a letter from someone who truly knows ${name}.

Do NOT include section numbers or headers like "Section 1" in the output.
Use elegant separator lines (───) between sections instead.
Start each section with a natural transition, not a label.
═══════════════════════════════════════════`;
}
