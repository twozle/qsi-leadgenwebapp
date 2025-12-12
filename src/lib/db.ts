import { sql } from '@vercel/postgres';
import { LeadData } from '@/types/lead';
import { QuizResults, TierType } from '@/types/results';
import { CategoryScores } from '@/types/quiz';

export interface InsertLeadParams extends LeadData {
  sessionId: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface InsertQuizResponseParams {
  leadId: string;
  answers: Record<string, number>;
  categoryScores: CategoryScores;
  masterScore: number;
  tier: TierType;
  recommendations: string[];
}

export async function insertLead(params: InsertLeadParams): Promise<string> {
  const result = await sql`
    INSERT INTO leads (
      session_id,
      email,
      phone,
      preferred_contact,
      business_type,
      weekly_spend_range,
      delivery_frequency,
      location_city,
      location_region,
      biggest_frustration,
      ip_address,
      user_agent
    ) VALUES (
      ${params.sessionId},
      ${params.email || null},
      ${params.phone || null},
      ${params.preferredContact},
      ${params.businessType},
      ${params.weeklySpendRange},
      ${params.deliveryFrequency},
      ${params.locationCity || null},
      ${params.locationRegion || null},
      ${params.biggestFrustration || null},
      ${params.ipAddress || null},
      ${params.userAgent || null}
    )
    RETURNING id
  `;

  return result.rows[0].id;
}

export async function insertQuizResponse(params: InsertQuizResponseParams): Promise<void> {
  await sql`
    INSERT INTO quiz_responses (
      lead_id,
      answers,
      delivery_reliability_score,
      quality_consistency_score,
      communication_support_score,
      forecasting_planning_score,
      pricing_stability_score,
      master_score,
      tier,
      recommendations
    ) VALUES (
      ${params.leadId},
      ${JSON.stringify(params.answers)},
      ${params.categoryScores.deliveryReliability},
      ${params.categoryScores.qualityConsistency},
      ${params.categoryScores.communicationSupport},
      ${params.categoryScores.forecastingPlanning},
      ${params.categoryScores.pricingStability},
      ${params.masterScore},
      ${params.tier},
      ${JSON.stringify(params.recommendations)}
    )
  `;
}

export async function getResultsBySessionId(sessionId: string): Promise<QuizResults | null> {
  const result = await sql`
    SELECT
      l.session_id,
      l.business_type,
      qr.delivery_reliability_score,
      qr.quality_consistency_score,
      qr.communication_support_score,
      qr.forecasting_planning_score,
      qr.pricing_stability_score,
      qr.master_score,
      qr.tier,
      qr.recommendations
    FROM leads l
    JOIN quiz_responses qr ON l.id = qr.lead_id
    WHERE l.session_id = ${sessionId}
    LIMIT 1
  `;

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return {
    sessionId: row.session_id,
    masterScore: row.master_score,
    tier: row.tier as TierType,
    categoryScores: {
      deliveryReliability: row.delivery_reliability_score,
      qualityConsistency: row.quality_consistency_score,
      communicationSupport: row.communication_support_score,
      forecastingPlanning: row.forecasting_planning_score,
      pricingStability: row.pricing_stability_score,
    },
    recommendations: JSON.parse(row.recommendations),
    businessType: row.business_type,
  };
}
