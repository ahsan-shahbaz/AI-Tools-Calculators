export interface ShortsEarningsInputs {
  dailyShortViews: number;
  avgCpm: number;
  videosPerWeek: number;
  revenueShare: number;
  retentionBonus: number;
}

export interface ShortsEarningsResult {
  monthlyViews: number;
  monthlyEarnings: number;
  dailyEarnings: number;
  earningsPerVideo: number;
  annualEarnings: number;
  effectiveCpm: number;
}

export interface TikTokBrandDealInputs {
  followers: number;
  engagementRate: number;
  avgViewsPerPost: number;
  nicheMultiplier: number;
  postsPerMonth: number;
  packageType: 'starter' | 'standard' | 'premium';
}

export interface TikTokBrandDealResult {
  baseRate: number;
  estimatedRate: number;
  monthlyPotential: number;
  packageLabel: string;
  engagementTier: string;
}

export interface InstagramEngagementInputs {
  followers: number;
  avgLikes: number;
  avgComments: number;
  avgShares: number;
  postsPerMonth: number;
}

export interface InstagramEngagementResult {
  engagementRate: number;
  totalEngagementsPerPost: number;
  monthlyEngagements: number;
  qualityScore: number;
  audienceTier: string;
}

export interface PatreonEarningsInputs {
  paidMembers: number;
  averageMonthlyPledge: number;
  estimatedFeePercent: number;
  otherMonthlyCosts: number;
}

export interface PatreonEarningsResult {
  paidMembers: number;
  grossMonthlyPledges: number;
  estimatedFees: number;
  otherMonthlyCosts: number;
  estimatedMonthlyNet: number;
  projectedAnnualNet: number;
  estimatedNetPerMember: number;
  netMarginPercent: number;
}
