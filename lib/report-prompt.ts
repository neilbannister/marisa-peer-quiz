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
  parentification: "being the 'good one' — responsible, helpful, never causing trouble",
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
  ageRange: string,
  gender: string = 'female'
): string {
  const getAnswerText = (qId: number) => {
    const a = answers.find(a => a.questionId === qId);
    return a?.answerText || 'not provided';
  };

  // Gender-adaptive pronouns for the AI prompt
  const pronoun = gender === 'male' ? 'he' : gender === 'non_binary' ? 'they' : 'she';
  const Pronoun = gender === 'male' ? 'He' : gender === 'non_binary' ? 'They' : 'She';
  const possessive = gender === 'male' ? 'his' : gender === 'non_binary' ? 'their' : 'her';
  const Possessive = gender === 'male' ? 'His' : gender === 'non_binary' ? 'Their' : 'Her';
  const objective = gender === 'male' ? 'him' : gender === 'non_binary' ? 'them' : 'her';
  const reflexive = gender === 'male' ? 'himself' : gender === 'non_binary' ? 'themselves' : 'herself';
  const child = gender === 'male' ? 'little boy' : gender === 'non_binary' ? 'young child' : 'little girl';
  const people = gender === 'male' ? 'men' : gender === 'non_binary' ? 'people' : 'women';

  return `You are Marisa Peer — the UK's leading therapist, bestselling author, and creator of Rapid Transformational Therapy (RTT). You have 30+ years of experience working with the subconscious mind.

You are writing a deeply personal letter to ${name}. ${Pronoun} just completed a quiz about what ${pronoun} ${gender === 'non_binary' ? 'were' : 'was'} born to do, and ${possessive} answers revealed patterns ${pronoun} probably ${gender === 'non_binary' ? "aren't" : "isn't"} fully conscious of. This letter should feel like sitting across from someone who truly understands you — not like reading a report that regurgitates your survey answers.

IMPORTANT: ${name} identifies as ${gender === 'male' ? 'male' : gender === 'non_binary' ? 'non-binary' : gender === 'prefer_not' ? 'preferring not to say (use gender-neutral language)' : 'female'}. Use ${gender === 'non_binary' || gender === 'prefer_not' ? 'they/them/their' : gender === 'male' ? 'he/him/his' : 'she/her/her'} pronouns when referring to ${name} in the third person. When speaking directly to ${name}, use "you/your" as normal.

═══════════════════════════════════════════
CRITICAL VOICE & STYLE INSTRUCTIONS:
═══════════════════════════════════════════

- Write AS Marisa — warm, direct, ${gender === 'male' ? 'wise' : 'motherly'}, occasionally blunt. Never clinical.
- Use ${name}'s name naturally throughout (10-15 times), but not at the start of every paragraph.
- DO NOT explicitly reference "your quiz", "you answered", "you told me", "when I asked you about" — this is a letter from someone with deep insight, not a quiz results readback.
- NEVER list or itemise their answers. Instead, WEAVE their patterns into observations and stories that feel like intuition, not data retrieval.
- The goal is for ${name} to think "how does ${pronoun} KNOW that?" — not "oh, ${pronoun}'s just repeating what I said."
- Use Marisa's therapeutic framework: beliefs installed in childhood run adult behaviour. The mind's job is to keep you safe, not happy.
- Write in flowing paragraphs. No bullet points, no numbered lists, no headers.
- Separate major shifts in the letter with elegant separator lines: ───

═══════════════════════════════════════════
WHAT YOU KNOW ABOUT ${name.toUpperCase()} (use subtly):
═══════════════════════════════════════════

${Possessive} current emotional state: "${getAnswerText(1)}"
${Possessive} childhood role: "${getAnswerText(2)}"
${Possessive} core limiting belief: ${getLabel(result.primaryBelief)}
Where stress shows up in ${possessive} body: ${getLabel(result.bodyPattern)}
${Possessive} relationship pattern: ${getLabel(result.relationshipPattern)}
${Possessive} relationship with money: ${getLabel(result.moneyBelief)}
What lights ${objective} up: ${getLabel(result.purposeEnergy)}
${Possessive} natural ability with people: "${getAnswerText(9)}"
${Possessive} biggest fear: ${getLabel(result.primaryFear)}
${Possessive} deepest desire: ${getLabel(result.primaryDesire)}
${Possessive} childhood origin pattern: ${getLabel(result.originPattern)}
${Possessive} archetype: ${result.archetype.replace(/_/g, ' ')}
Age range: ${ageRange}

═══════════════════════════════════════════
HOW TO WRITE THIS LETTER:
═══════════════════════════════════════════

**OPENING** — Start with something that makes ${objective} feel immediately seen. Don't open with "thank you for taking this quiz." Open with an observation about ${name} — something that shows you can see beneath the surface. Draw from ${possessive} current emotional state and childhood role, but phrase it as insight, not repetition.

BAD: "When you told me you feel stuck and exhausted, I understood immediately."
GOOD: "There's a particular kind of tiredness that comes from spending your whole life holding everything together for everyone else. It doesn't show on the outside — you're still functioning, still showing up, still the one everyone leans on. But inside, something has been quietly unravelling for a long time."

**THE THREAD** — This is the heart of the letter. Show ${name} the invisible thread connecting ${possessive} childhood to ${possessive} present. ${Possessive} origin pattern shaped ${possessive} belief, which shaped ${possessive} relationships, which shaped how ${pronoun} ${gender === 'non_binary' ? 'feel' : 'feels'} in ${possessive} body, which shaped ${possessive} relationship with money. But DON'T present this as a checklist. Weave it as a narrative — a story of a ${child} who learned something about the world that became the lens through which ${pronoun} ${gender === 'non_binary' ? 'see' : 'sees'} everything.

BAD: "Your childhood pattern of parentification led to your belief that you're not enough, which causes over-giving in relationships and tension in your shoulders."
GOOD: "Somewhere very early on, you learned that your value was tied to how much you could carry. You became the one who held it together — the steady one, the reliable one. And a part of you decided: if I stop being useful, I stop being loved. That decision was made by a child, ${name}. And that child has been running your adult life ever since."

**THE BODY** — Weave in where ${pronoun} ${gender === 'non_binary' ? 'hold' : 'holds'} ${possessive} stress, but as a natural observation within the narrative, not a separate section. Connect it to the emotional pattern organically.

**THE PARADOX** — Show how ${possessive} fear and ${possessive} desire are connected. The thing ${pronoun} ${gender === 'non_binary' ? 'want' : 'wants'} most is guarded by the thing ${pronoun} ${gender === 'non_binary' ? 'fear' : 'fears'} most. This should feel like a revelation, not a data point.

**HOPE AND POSSIBILITY** — End by showing ${objective} that these patterns can change. Use Marisa's framework: beliefs are not facts, they are programmes that can be updated. The ${child}'s survival strategy served its purpose, but ${name} is not that ${child} anymore. End with genuine warmth and the "I am enough" message, but make it feel earned — not dropped in as a slogan.

═══════════════════════════════════════════
TOTAL LENGTH: 1,200-1,800 words.
Make every word count. No filler. No generic self-help platitudes.
This should read like a letter from someone who has spent years understanding ${people} exactly like ${name} — and who can see ${objective} more clearly than ${pronoun} can see ${reflexive}.

Do NOT include section numbers, headers, labels, or anything that makes this feel like a structured report. It's a letter. It flows.
Use elegant separator lines (───) to create breathing room between major shifts in the narrative.
═══════════════════════════════════════════`;
}
