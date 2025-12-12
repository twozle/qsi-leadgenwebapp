import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { submitQuizSchema } from '@/lib/validations';
import { calculateCategoryScores, calculateMasterScore, determineTier, generateRecommendations } from '@/lib/scoring';
import { insertLead, insertQuizResponse } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = submitQuizSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { answers, leadData } = validation.data;

    const categoryScores = calculateCategoryScores(answers);
    const masterScore = calculateMasterScore(categoryScores);
    const tier = determineTier(masterScore);
    const recommendations = generateRecommendations(categoryScores);

    const sessionId = nanoid();

    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;

    const leadId = await insertLead({
      ...leadData,
      sessionId,
      ipAddress,
      userAgent,
    });

    await insertQuizResponse({
      leadId,
      answers,
      categoryScores,
      masterScore,
      tier,
      recommendations,
    });

    return NextResponse.json({
      sessionId,
      masterScore,
      tier,
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
