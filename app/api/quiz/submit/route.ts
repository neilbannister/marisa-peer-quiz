import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// In-memory store as fallback when Supabase isn't configured
const memoryStore: Record<string, any> = {};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, ageRange, answers, result, scores } = body;

    const userId = uuidv4();

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
      const { getServerSupabase } = await import('@/lib/supabase');
      const supabase = getServerSupabase();

      // Insert user
      await supabase.from('quiz_users').insert({
        id: userId,
        first_name: name,
        email,
        age_range: ageRange,
        primary_archetype: result.archetype,
        conversion_path: result.conversionPath,
        primary_belief: result.primaryBelief,
        primary_fear: result.primaryFear,
        primary_desire: result.primaryDesire,
        body_pattern: result.bodyPattern,
        relationship_pattern: result.relationshipPattern,
        money_belief: result.moneyBelief,
        origin_pattern: result.originPattern,
        purpose_energy: result.purposeEnergy,
        healer_ability: result.healerAbility,
        rtt_intent: scores.rtt_intent || 0,
        readiness_score: scores.readiness || 0,
        investment_readiness: scores.investment || 0,
        pain_intensity: scores.pain || 0,
        healer_score: scores.healer || 0,
        powerhouse_score: scores.powerhouse || 0,
        freedom_score: scores.freedom || 0,
        deep_feeler_score: scores.deep_feeler || 0,
        renaissance_score: scores.renaissance || 0,
        email_captured: true,
      });

      // Insert individual answers
      const answerRows = answers.map((a: any) => ({
        id: uuidv4(),
        user_id: userId,
        question_number: a.questionId,
        answer_key: a.answerKey,
        answer_text: a.answerText,
      }));

      await supabase.from('quiz_answers').insert(answerRows);
    } else {
      // Fallback: store in memory
      memoryStore[userId] = { name, email, ageRange, answers, result, scores };
    }

    return NextResponse.json({ userId, success: true });
  } catch (error: any) {
    console.error('Quiz submit error:', error);
    // Still return a userId so the flow doesn't break
    const fallbackId = uuidv4();
    return NextResponse.json({ userId: fallbackId, success: false, error: error.message });
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  // Try Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    const { getServerSupabase } = await import('@/lib/supabase');
    const supabase = getServerSupabase();

    const { data: user } = await supabase
      .from('quiz_users')
      .select('*')
      .eq('id', id)
      .single();

    const { data: answers } = await supabase
      .from('quiz_answers')
      .select('*')
      .eq('user_id', id)
      .order('question_number');

    return NextResponse.json({ ...user, answers });
  }

  // Fallback: memory store
  const data = memoryStore[id];
  if (data) return NextResponse.json(data);

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
