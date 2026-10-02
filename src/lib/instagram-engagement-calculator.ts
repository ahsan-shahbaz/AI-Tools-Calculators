import { InstagramEngagementInputs, InstagramEngagementResult } from '@/types/social-tools';

export function calculateInstagramEngagementRate(inputs: InstagramEngagementInputs): InstagramEngagementResult {
  const { followers, avgLikes, avgComments, avgShares, postsPerMonth } = inputs;

  const totalEngagementsPerPost = avgLikes + avgComments + (avgShares * 2);
  const engagementRate = followers > 0 ? Number(((totalEngagementsPerPost / followers) * 100).toFixed(2)) : 0;
  const monthlyEngagements = totalEngagementsPerPost * postsPerMonth;

  let qualityScore = 0;
  if (engagementRate >= 8) qualityScore = 95;
  else if (engagementRate >= 5) qualityScore = 82;
  else if (engagementRate >= 3) qualityScore = 68;
  else if (engagementRate >= 1.5) qualityScore = 52;
  else qualityScore = 38;

  let audienceTier = 'Emerging';
  if (engagementRate >= 8) audienceTier = 'Highly Engaged';
  else if (engagementRate >= 5) audienceTier = 'Strong Community';
  else if (engagementRate >= 3) audienceTier = 'Growing Audience';

  return {
    engagementRate,
    totalEngagementsPerPost: Math.round(totalEngagementsPerPost),
    monthlyEngagements: Math.round(monthlyEngagements),
    qualityScore,
    audienceTier
  };
}
