import { TierType } from '@/types/results';

export interface TierInfo {
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const tierDefinitions: Record<TierType, TierInfo> = {
  unstable: {
    name: 'Unstable Supplier',
    description: 'High Operational Risk - Significant reliability issues requiring immediate attention',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
  },
  at_risk: {
    name: 'At-Risk Supplier',
    description: 'Frequent Disruptions Likely - Multiple weak points impacting operations',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
  },
  mostly_reliable: {
    name: 'Mostly Reliable Supplier',
    description: 'Occasional Weak Points - Good foundation with room for improvement',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
  },
  high_performance: {
    name: 'High-Performance Supplier',
    description: 'Strong, Competitive Advantage - Exceptional supply chain reliability',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
  },
};

export function getTierInfo(tier: TierType): TierInfo {
  return tierDefinitions[tier];
}
