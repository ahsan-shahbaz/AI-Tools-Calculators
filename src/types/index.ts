export type VideoFormat = 'longform' | 'shorts';

export interface NicheInfo {
  id: string;
  name: string;
  icon: string;
  minRpm: number;
  avgRpm: number;
  maxRpm: number;
  shortsAvgRpm: number;
  description: string;
  topSponsors: string[];
}

export interface CountryTier {
  id: string;
  name: string;
  multiplier: number;
  flag: string;
  tier: number;
}

export interface CalculationResult {
  dailyViews: number;
  monthlyViews: number;
  yearlyViews: number;
  effectiveRpm: number;
  dailyEarnings: { min: number; avg: number; max: number };
  monthlyEarnings: { min: number; avg: number; max: number };
  yearlyEarnings: { min: number; avg: number; max: number };
  sponsorshipEstimate: { min: number; avg: number; max: number };
  totalPotentialMonthly: number;
}

export interface ViralIdea {
  title: string;
  hook: string;
  rpmTier: 'Ultra High' | 'High' | 'Medium';
  estimatedPotential: string;
  angle: string;
  thumbnailConcept: string;
}

export interface AIStrategyResponse {
  nicheTitle: string;
  ideas: ViralIdea[];
  monetizationTips: string[];
  rpmBoostTactics: string[];
}

export interface ToolDirectoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'Social Media' | 'Finance & Business' | 'Developer' | 'SEO & Webmaster' | 'Lifestyle' | 'Date & Time';
  icon: string;
  badge?: string;
  isLive: boolean;
}
