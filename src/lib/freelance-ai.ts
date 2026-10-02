import { FreelanceRolePreset, AIProjectProposal, ProjectTaskItem } from '@/types/freelance';

export async function generateProjectProposal(
  projectPrompt: string,
  role: FreelanceRolePreset,
  hourlyRate: number
): Promise<AIProjectProposal> {
  // Simulate AI reasoning latency for good UX
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Determine complexity based on prompt length and keywords
  const promptLower = projectPrompt.toLowerCase();
  let estimatedBaseHours = 28;

  if (promptLower.includes('ecommerce') || promptLower.includes('stripe') || promptLower.includes('complex') || promptLower.includes('full') || promptLower.includes('app')) {
    estimatedBaseHours = 45;
  } else if (promptLower.includes('simple') || promptLower.includes('audit') || promptLower.includes('single') || promptLower.includes('1 page')) {
    estimatedBaseHours = 16;
  } else if (promptLower.includes('redesign') || promptLower.includes('sequence') || promptLower.includes('campaign')) {
    estimatedBaseHours = 32;
  }

  // Derive task hours
  const discoveryHours = Math.max(Math.round(estimatedBaseHours * 0.15), 2);
  const coreProductionHours = Math.max(Math.round(estimatedBaseHours * 0.55), 8);
  const revisionHours = Math.max(Math.round(estimatedBaseHours * 0.18), 3);
  const deploymentHours = Math.max(Math.round(estimatedBaseHours * 0.12), 2);
  const totalHours = discoveryHours + coreProductionHours + revisionHours + deploymentHours;

  const tasks: ProjectTaskItem[] = [
    {
      task: 'Phase 1: Discovery, Architecture & Initial Setup',
      hours: discoveryHours,
      description: 'Requirements breakdown, asset collection, client kickoff call, and milestone timeline setup.'
    },
    {
      task: `Phase 2: Core ${role.category} Production & Implementation`,
      hours: coreProductionHours,
      description: `Execution of main deliverables outlined in project brief: "${projectPrompt.slice(0, 80)}...".`
    },
    {
      task: 'Phase 3: Iteration, Feedback & Revisions',
      hours: revisionHours,
      description: 'Consolidated feedback review with up to 2 comprehensive rounds of adjustments.'
    },
    {
      task: 'Phase 4: Final Quality Assurance, Handoff & Launch',
      hours: deploymentHours,
      description: 'Pre-launch testing, asset/code transfer, documentation walkthrough, and post-launch verification.'
    }
  ];

  // Price calculations with 15% fixed-price buffer
  const rawCost = totalHours * hourlyRate;
  const bufferMultiplier = 1.15; // 15% buffer protects against minor scope fluctuations
  const recommendedPrice = Math.round(rawCost * bufferMultiplier);
  const pricingRange = {
    min: Math.round(recommendedPrice * 0.9),
    max: Math.round(recommendedPrice * 1.25)
  };

  // Milestone schedule
  const depositAmount = Math.round(recommendedPrice * 0.5);
  const milestoneAmount = Math.round(recommendedPrice * 0.25);
  const finalAmount = recommendedPrice - depositAmount - milestoneAmount;

  const paymentMilestones = [
    {
      phase: 'Deposit (Kickoff)',
      percentage: 50,
      amount: depositAmount,
      trigger: 'Due upon contract signing before project discovery begins.'
    },
    {
      phase: 'Milestone Review',
      percentage: 25,
      amount: milestoneAmount,
      trigger: 'Due upon delivery of initial working prototype or draft deliverables.'
    },
    {
      phase: 'Final Delivery',
      percentage: 25,
      amount: finalAmount,
      trigger: 'Due upon final sign-off prior to publishing, code transfer, or domain launch.'
    }
  ];

  const scopeGuardrails = [
    'Includes up to 2 rounds of consolidated feedback per deliverable milestone.',
    `Additional revisions, out-of-scope feature requests, or scope expansions are billed at standard rate: $${hourlyRate}/hour.`,
    'Client feedback requested within 5 business days per phase to maintain project timeline.',
    'All intellectual property rights transfer to the client upon receipt of 100% full final payment.'
  ];

  const clientPitchEmail = `Hi [Client Name],

Thank you for sharing the details regarding your project: "${projectPrompt.slice(0, 90)}...".

Based on your objectives, I have prepared a fixed-scope proposal with an estimated turnaround of ${Math.ceil(totalHours / 15)} weeks.

Total Investment: $${recommendedPrice.toLocaleString()} (Fixed Project Fee)

What is included:
• Discovery & Architecture (${discoveryHours}h)
• Core Production & Implementation (${coreProductionHours}h)
• 2 Comprehensive Iteration & Revision Rounds (${revisionHours}h)
• QA Testing, Asset Transfer & Final Launch (${deploymentHours}h)

Payment Terms:
1. 50% ($${depositAmount.toLocaleString()}) deposit to reserve kickoff date
2. 25% ($${milestoneAmount.toLocaleString()}) upon review of core deliverables
3. 25% ($${finalAmount.toLocaleString()}) upon final approval prior to asset handoff

If this aligns with your expectations, let me know and I will forward the formal agreement and invoice so we can kick off!

Best regards,
[Your Name]`;

  return {
    projectTitle: `${role.name} Project Proposal`,
    estimatedHours: totalHours,
    recommendedPrice,
    pricingRange,
    tasks,
    paymentMilestones,
    scopeGuardrails,
    clientPitchEmail
  };
}
