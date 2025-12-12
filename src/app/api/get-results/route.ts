import { NextRequest, NextResponse } from 'next/server';
import { getResultsBySessionId } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const results = await getResultsBySessionId(sessionId);

    if (!results) {
      return NextResponse.json(
        { error: 'Results not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
