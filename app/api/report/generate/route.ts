import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buildReportPrompt } from '@/lib/report-prompt';
import { calculateResults, QuizScores } from '@/lib/scoring';

export const maxDuration = 60; // Allow up to 60 seconds for AI generation

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        report: generateFallbackReport('friend'),
        generated: false,
        message: 'OpenAI API key not configured. Using template report.',
      });
    }

    // Fetch user data
    let userData: any = null;
    let answersData: any[] = [];

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
      const { getServerSupabase } = await import('@/lib/supabase');
      const supabase = getServerSupabase();

      const { data: user } = await supabase
        .from('quiz_users')
        .select('*')
        .eq('id', userId)
        .single();

      const { data: answers } = await supabase
        .from('quiz_answers')
        .select('*')
        .eq('user_id', userId)
        .order('question_number');

      userData = user;
      answersData = answers || [];
    }

    if (!userData) {
      return NextResponse.json({
        report: generateFallbackReport('friend'),
        generated: false,
      });
    }

    // Build the AI prompt
    const result = {
      archetype: userData.primary_archetype,
      archetypeScore: 0,
      conversionPath: userData.conversion_path,
      primaryBelief: userData.primary_belief,
      primaryFear: userData.primary_fear,
      primaryDesire: userData.primary_desire,
      bodyPattern: userData.body_pattern,
      relationshipPattern: userData.relationship_pattern,
      moneyBelief: userData.money_belief,
      originPattern: userData.origin_pattern,
      purposeEnergy: userData.purpose_energy,
      healerAbility: userData.healer_ability,
      copingStrategy: '',
      domain: '',
      scores: {
        rtt_intent: userData.rtt_intent,
        readiness: userData.readiness_score,
        investment: userData.investment_readiness,
      } as any,
    };

    const formattedAnswers = answersData.map(a => ({
      questionId: a.question_number,
      answerKey: a.answer_key,
      answerText: a.answer_text,
    }));

    const prompt = buildReportPrompt(
      userData.first_name,
      result as any,
      formattedAnswers,
      userData.age_range
    );

    // Generate with OpenAI
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are Marisa Peer, writing a personal coaching report. Your voice is warm, direct, insightful, and motherly. You have an extraordinary ability to connect seemingly unrelated pieces of someone\'s story into a coherent narrative that makes them feel deeply understood. Write in flowing paragraphs, not lists or bullet points. Use elegant separator lines (───) between sections.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 3500,
      temperature: 0.85,
    });

    const report = completion.choices[0]?.message?.content || generateFallbackReport(userData.first_name);

    // Save report to database
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
      const { getServerSupabase } = await import('@/lib/supabase');
      const supabase = getServerSupabase();
      await supabase
        .from('quiz_users')
        .update({ report_content: report, report_viewed: false })
        .eq('id', userId);
    }

    return NextResponse.json({ report, generated: true });
  } catch (error: any) {
    console.error('Report generation error:', error);
    return NextResponse.json({
      report: generateFallbackReport('friend'),
      generated: false,
      error: error.message,
    });
  }
}

function generateFallbackReport(name: string): string {
  return `${name}, thank you for taking the time to answer these questions with such honesty.

Your responses reveal something powerful — a pattern that has been quietly shaping your life, your relationships, your career, and even how you feel in your own body. And the most important thing I want you to know right now is this: none of it is your fault, and all of it can change.

───

The beliefs running your life were installed long before you had any say in the matter. They were created by a young mind trying to make sense of the world — and they served you then. They kept you safe. They helped you survive.

But ${name}, you're not that child anymore. And the programme that once protected you is now the very thing holding you back.

───

I've sat across from thousands of women who felt exactly like you do right now. Women who were functioning but not living. Women who gave everything to everyone else and had nothing left for themselves. Women who knew — deep in their bones — that they were meant for more, but couldn't figure out how to access it.

And every single one of them had the same thing in common: a belief, installed in childhood, that was running their entire adult life without their conscious awareness.

───

${name}, you are enough. Not when you achieve more. Not when you help more people. Not when you finally figure it all out. Right now. Exactly as you are.

Your full personalised coaching report, generated from your specific answers, requires the OpenAI API to be connected. Please see the setup guide to enable AI-powered report generation.

With love,
Marisa`;
}
