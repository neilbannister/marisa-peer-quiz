export interface QuizScores {
  // Archetype scores
  healer: number;
  powerhouse: number;
  freedom: number;
  deep_feeler: number;
  renaissance: number;

  // Conversion scores
  rtt_intent: number;
  readiness: number;
  investment: number;
  pain: number;

  // Belief types (highest = primary)
  belief_not_enough: number;
  belief_not_enough_capability: number;
  belief_not_enough_inherent: number;
  belief_not_lovable: number;
  belief_not_lovable_authentic: number;
  belief_dont_deserve: number;
  belief_dont_deserve_good: number;
  belief_learned_helplessness: number;
  belief_not_important: number;
  belief_earn_love: number;
  belief_something_wrong: number;
  belief_never_enough: number;
  belief_feelings_dont_matter: number;
  belief_fear: number;
  belief_fear_rejection: number;
  belief_not_heard: number;
  belief_not_enough_control: number;
  belief_carrying_others: number;
  belief_depleted: number;

  // Origin patterns
  origin_parentification: number;
  origin_invalidation: number;
  origin_neglect: number;
  origin_conditional_love: number;
  origin_enmeshment: number;

  // Body patterns
  body_heart: number;
  body_gut: number;
  body_throat: number;
  body_head: number;
  body_shoulders: number;
  body_systemic: number;

  // Relationship patterns
  rel_over_giver: number;
  rel_conflict_avoidant: number;
  rel_masked: number;
  rel_avoidant: number;
  rel_rescuer: number;
  rel_self_protective: number;

  // Money beliefs
  money_effort_not_rewarded: number;
  money_guilt: number;
  money_undervaluing: number;
  money_scarcity: number;
  money_comfort_zone: number;
  money_ceiling: number;

  // Purpose energy
  purpose_connection: number;
  purpose_freedom: number;
  purpose_impact: number;
  purpose_expression: number;
  purpose_visibility: number;
  purpose_blocked: number;

  // Healer ability
  healer_ability_exceptional: number;
  healer_ability_strong: number;
  healer_ability_suppressed: number;
  healer_ability_low: number;
  healer_ability_validated: number;

  // Fears
  fear_failure: number;
  fear_success: number;
  fear_judgment: number;
  fear_wasted: number;
  fear_too_late: number;

  // Desires
  desire_self_worth: number;
  desire_self_trust: number;
  desire_authenticity: number;
  desire_healing: number;
  desire_purpose: number;
  desire_help_others: number;

  // Products
  product_iam_enough: number;
  product_confidence: number;
  product_freedom: number;
  product_premium_pd: number;
  product_bridge: number;
  product_rtt: number;

  // Domain
  domain_career: number;
  domain_relationships: number;
  domain_health: number;
  domain_purpose: number;

  // Coping
  coping_performing: number;
  coping_pleasing: number;
  coping_seeking: number;
  coping_freezing: number;

  // Context
  context_employed: number;
  context_self_employed: number;
  context_parent: number;
  context_helper: number;
  context_crossroads: number;
  context_retired: number;
}

export type Archetype = 'born_healer' | 'quiet_powerhouse' | 'freedom_chaser' | 'deep_feeler' | 'renaissance_soul';
export type ConversionPath = 'A' | 'B' | 'C' | 'D' | 'E';

export interface QuizResult {
  archetype: Archetype;
  archetypeScore: number;
  conversionPath: ConversionPath;
  primaryBelief: string;
  primaryFear: string;
  primaryDesire: string;
  bodyPattern: string;
  relationshipPattern: string;
  moneyBelief: string;
  originPattern: string;
  purposeEnergy: string;
  healerAbility: string;
  copingStrategy: string;
  domain: string;
  scores: QuizScores;
}

export function createEmptyScores(): QuizScores {
  const keys: (keyof QuizScores)[] = [
    'healer', 'powerhouse', 'freedom', 'deep_feeler', 'renaissance',
    'rtt_intent', 'readiness', 'investment', 'pain',
    'belief_not_enough', 'belief_not_enough_capability', 'belief_not_enough_inherent',
    'belief_not_lovable', 'belief_not_lovable_authentic', 'belief_dont_deserve',
    'belief_dont_deserve_good', 'belief_learned_helplessness', 'belief_not_important',
    'belief_earn_love', 'belief_something_wrong', 'belief_never_enough',
    'belief_feelings_dont_matter', 'belief_fear', 'belief_fear_rejection',
    'belief_not_heard', 'belief_not_enough_control', 'belief_carrying_others',
    'belief_depleted',
    'origin_parentification', 'origin_invalidation', 'origin_neglect',
    'origin_conditional_love', 'origin_enmeshment',
    'body_heart', 'body_gut', 'body_throat', 'body_head', 'body_shoulders', 'body_systemic',
    'rel_over_giver', 'rel_conflict_avoidant', 'rel_masked', 'rel_avoidant',
    'rel_rescuer', 'rel_self_protective',
    'money_effort_not_rewarded', 'money_guilt', 'money_undervaluing',
    'money_scarcity', 'money_comfort_zone', 'money_ceiling',
    'purpose_connection', 'purpose_freedom', 'purpose_impact',
    'purpose_expression', 'purpose_visibility', 'purpose_blocked',
    'healer_ability_exceptional', 'healer_ability_strong', 'healer_ability_suppressed',
    'healer_ability_low', 'healer_ability_validated',
    'fear_failure', 'fear_success', 'fear_judgment', 'fear_wasted', 'fear_too_late',
    'desire_self_worth', 'desire_self_trust', 'desire_authenticity',
    'desire_healing', 'desire_purpose', 'desire_help_others',
    'product_iam_enough', 'product_confidence', 'product_freedom',
    'product_premium_pd', 'product_bridge', 'product_rtt',
    'domain_career', 'domain_relationships', 'domain_health', 'domain_purpose',
    'coping_performing', 'coping_pleasing', 'coping_seeking', 'coping_freezing',
    'context_employed', 'context_self_employed', 'context_parent',
    'context_helper', 'context_crossroads', 'context_retired',
  ];
  const scores = {} as QuizScores;
  keys.forEach(k => scores[k] = 0);
  return scores;
}

function getHighest(obj: Record<string, number>, prefix: string): string {
  let best = '';
  let max = -1;
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith(prefix) && v > max) {
      max = v;
      best = k.replace(prefix, '');
    }
  }
  return best || 'unknown';
}

export function calculateResults(scores: QuizScores): QuizResult {
  // Determine archetype
  const archetypeMap: Record<string, Archetype> = {
    healer: 'born_healer',
    powerhouse: 'quiet_powerhouse',
    freedom: 'freedom_chaser',
    deep_feeler: 'deep_feeler',
    renaissance: 'renaissance_soul',
  };
  const archetypeScores = {
    healer: scores.healer,
    powerhouse: scores.powerhouse,
    freedom: scores.freedom,
    deep_feeler: scores.deep_feeler,
    renaissance: scores.renaissance,
  };
  // Priority order for ties: healer > freedom > powerhouse > deep_feeler > renaissance
  const priority: (keyof typeof archetypeScores)[] = ['healer', 'freedom', 'powerhouse', 'deep_feeler', 'renaissance'];
  let topArchKey = priority[0];
  let topScore = archetypeScores[topArchKey];
  for (const key of priority) {
    if (archetypeScores[key] > topScore) {
      topScore = archetypeScores[key];
      topArchKey = key;
    }
  }

  // Determine conversion path
  let conversionPath: ConversionPath;
  if (scores.rtt_intent >= 12 && scores.investment >= 3) {
    conversionPath = 'A'; // RTT Certification
  } else if (scores.rtt_intent >= 8 && scores.investment >= 1) {
    conversionPath = 'B'; // Peer Hypnosis Method
  } else if (scores.investment >= 4 && scores.readiness >= 6) {
    conversionPath = 'C'; // Premium PD
  } else if (scores.investment >= 1 && scores.readiness >= 3) {
    conversionPath = 'D'; // Bridge Product
  } else {
    conversionPath = 'E'; // Community / Free
  }

  return {
    archetype: archetypeMap[topArchKey],
    archetypeScore: topScore,
    conversionPath,
    primaryBelief: getHighest(scores as unknown as Record<string, number>, 'belief_'),
    primaryFear: getHighest(scores as unknown as Record<string, number>, 'fear_'),
    primaryDesire: getHighest(scores as unknown as Record<string, number>, 'desire_'),
    bodyPattern: getHighest(scores as unknown as Record<string, number>, 'body_'),
    relationshipPattern: getHighest(scores as unknown as Record<string, number>, 'rel_'),
    moneyBelief: getHighest(scores as unknown as Record<string, number>, 'money_'),
    originPattern: getHighest(scores as unknown as Record<string, number>, 'origin_'),
    purposeEnergy: getHighest(scores as unknown as Record<string, number>, 'purpose_'),
    healerAbility: getHighest(scores as unknown as Record<string, number>, 'healer_ability_'),
    copingStrategy: getHighest(scores as unknown as Record<string, number>, 'coping_'),
    domain: getHighest(scores as unknown as Record<string, number>, 'domain_'),
    scores,
  };
}
