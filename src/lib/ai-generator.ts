import { NicheInfo, CountryTier, VideoFormat, AIStrategyResponse, ViralIdea } from '@/types';

// Built-in intelligent idea database categorized by niche
const NICHE_IDEAS_DATABASE: Record<string, { longform: ViralIdea[]; shorts: ViralIdea[] }> = {
  finance: {
    longform: [
      {
        title: "I Tried 5 'Passive Income' Ideas for 30 Days (Realistic Profit & Loss)",
        hook: "Show bank balance on day 1 vs day 30 within the first 4 seconds.",
        rpmTier: "Ultra High",
        estimatedPotential: "$18.00 - $26.00 RPM",
        angle: "Radical financial transparency beats generic theory. Audiences watch till the end to see net earnings.",
        thumbnailConcept: "Split screen: Expectation ($10,000/mo) vs Reality (actual bank statement screenshot with red circle)."
      },
      {
        title: "The Ultimate Guide to Credit Card Points in 2026 (Fly First Class for $20)",
        hook: "Hold up physical boarding pass while standing in airport lounge.",
        rpmTier: "Ultra High",
        estimatedPotential: "$20.00 - $32.00 RPM",
        angle: "Credit card companies bid the highest CPMs on YouTube. High affiliate conversion for card sign-ups.",
        thumbnailConcept: "Close-up of premium metal card (Amex Platinum/Chase Sapphire) next to luxury first-class airplane seat."
      },
      {
        title: "Why 90% of Index Fund Investors Are Doing It Wrong (Avoid These 3 Mistakes)",
        hook: "Say: 'If you invest in S&P 500 without knowing this one tax loophole, you are losing 15%.'",
        rpmTier: "High",
        estimatedPotential: "$15.00 - $22.00 RPM",
        angle: "Contrarian takes against common knowledge produce 40%+ higher Click-Through-Rate (CTR).",
        thumbnailConcept: "Red arrow plunging through a graph with bold text: 'DON'T BUY VOO YET!'."
      },
      {
        title: "How I Built a $5,000/Month Dividend Portfolio (Step-by-Step Breakdown)",
        hook: "Show dividend payout notifications lighting up smartphone screen.",
        rpmTier: "High",
        estimatedPotential: "$14.00 - $20.00 RPM",
        angle: "Passive cashflow is an evergreen dream for retail investors. Highly shareable in investing forums.",
        thumbnailConcept: "Clean minimalist layout showing '$5,240 / Month' badge and monthly payout calendar."
      }
    ],
    shorts: [
      {
        title: "The 1 Money Rule The Wealthy Never Break 💸",
        hook: "Fast cut: 'Stop putting emergency savings into regular bank accounts!'",
        rpmTier: "High",
        estimatedPotential: "$0.08 - $0.14 RPM",
        angle: "High-yield savings accounts pay 4-5% vs 0.01% in standard banks. Instant financial awakening.",
        thumbnailConcept: "Shocked reaction pointing to High Yield Savings percentage comparison."
      },
      {
        title: "How to Pay $0 in Taxes Legally with an S-Corp 🤫",
        hook: "Drop pen on desk: 'If you made over $60k freelancing, listen up.'",
        rpmTier: "High",
        estimatedPotential: "$0.09 - $0.15 RPM",
        angle: "Quick business entity tax loophole explained in 45 seconds.",
        thumbnailConcept: "Tax document with huge green 'PAID $0' stamp."
      }
    ]
  },
  tech: {
    longform: [
      {
        title: "I Built an Entire Startup in 24 Hours Using Only Free AI Tools",
        hook: "Timer starting at 00:00:00: 'I have no team and zero budget. Can AI build a real product?'",
        rpmTier: "Ultra High",
        estimatedPotential: "$12.00 - $18.00 RPM",
        angle: "High sponsor interest from AI tools, hosting providers, and domain registrars.",
        thumbnailConcept: "Split screen: Clock countdown on the left, completed live web app on the right with dollar signs."
      },
      {
        title: "Don't Buy This Laptop in 2026 Until You Watch This!",
        hook: "Holding the popular laptop: 'Every review praised this, but here is what breaks after 6 months.'",
        rpmTier: "High",
        estimatedPotential: "$10.00 - $15.00 RPM",
        angle: "Honest buyer remorse and buyer guidance generates massive buyer intent and affiliate sales.",
        thumbnailConcept: "Yellow caution tape over laptop screen with text: 'STOP! BIG FLAW'."
      },
      {
        title: "Top 7 Free Open-Source Tools That Feel Illegal to Know",
        hook: "Rapid-fire: 'Number 1 replaces a $50/month Photoshop subscription for free.'",
        rpmTier: "High",
        estimatedPotential: "$9.00 - $14.00 RPM",
        angle: "Curated utility lists get bookmarked, saved to playlists, and repeatedly re-watched.",
        thumbnailConcept: "Grid of glowing software logos with a padlock unlocking."
      }
    ],
    shorts: [
      {
        title: "3 Secret AI Websites to Automate Your Homework/Job ⚡",
        hook: "Screen recording moving fast: 'Bookmark this before they start charging.'",
        rpmTier: "High",
        estimatedPotential: "$0.06 - $0.10 RPM",
        angle: "Utility shortcuts create massive share and save rates (the #1 ranking signal for Shorts).",
        thumbnailConcept: "Robot hand typing on laptop with fast sparkles."
      }
    ]
  },
  gaming: {
    longform: [
      {
        title: "I Spent 100 Hours Beating the Hardest Boss at Level 1",
        hook: "Show heart-rate monitor spiking to 150 BPM during the final hit attempt.",
        rpmTier: "Medium",
        estimatedPotential: "$3.00 - $5.50 RPM",
        angle: "High-stakes gaming challenges dramatically increase average view duration (AVD).",
        thumbnailConcept: "Character at 1 HP facing a gigantic monstrous boss with cinematic lightning."
      },
      {
        title: "The Bizarre Rise and Sudden Collapse of [Game Name]",
        hook: "Cinematic intro: 'In 2023, 20 million players logged in. Today, the servers are empty. What happened?'",
        rpmTier: "High",
        estimatedPotential: "$4.00 - $7.00 RPM",
        angle: "Video game documentaries attract older, tech-literate viewers which elevates RPM.",
        thumbnailConcept: "Dark, moody silhouette of game logo cracking and disintegrating into dust."
      }
    ],
    shorts: [
      {
        title: "Pro Gamer vs Casual Player in 1 Minute 🎮",
        hook: "Side-by-side keyboard cam with insanely fast mouse flicks.",
        rpmTier: "Medium",
        estimatedPotential: "$0.03 - $0.06 RPM",
        angle: "Instant visual contrast and comedic timing drives massive loop retention.",
        thumbnailConcept: "Side-by-side split screen showing frantic hands vs relaxed controller."
      }
    ]
  }
};

// Generic fallback templates for any niche
function getFallbackIdeas(niche: NicheInfo, format: VideoFormat): ViralIdea[] {
  const isShorts = format === 'shorts';
  const prefix = isShorts ? "60s" : "Deep Dive";

  return [
    {
      title: `The Truth About ${niche.name} Nobody Tells Beginners`,
      hook: `Start immediately: 'If you want to get into ${niche.name.split(',')[0]}, stop doing what most tutorials say.'`,
      rpmTier: "High",
      estimatedPotential: `$${(niche.avgRpm * 1.1).toFixed(2)} - $${(niche.maxRpm * 1.2).toFixed(2)} RPM`,
      angle: "Exposing common myths builds immediate authority and drives long watch time.",
      thumbnailConcept: `Close up of main tool or subject in ${niche.name.split(' ')[0]} with a bold red 'X' and a green checkmark.`
    },
    {
      title: `I Tested the 3 Most Expensive ${niche.name.split(',')[0]} Products vs Cheap Alternatives`,
      hook: `Blind test: 'Can a $20 product beat a $500 industry standard? Let’s find out.'`,
      rpmTier: "Ultra High",
      estimatedPotential: `$${(niche.avgRpm * 1.3).toFixed(2)} - $${(niche.maxRpm * 1.4).toFixed(2)} RPM`,
      angle: "Price comparison format attracts viewers with high purchasing intent, driving lucrative product ads.",
      thumbnailConcept: "Two items side-by-side with price tags '$20' vs '$500' and a question mark."
    },
    {
      title: `How to Master ${niche.name.split(',')[0]} in 2026 (Zero Experience Roadmap)`,
      hook: `Show calendar: 'Here is the exact 90-day checklist I would follow if I had to start over today.'`,
      rpmTier: "High",
      estimatedPotential: `$${(niche.avgRpm * 1.0).toFixed(2)} - $${(niche.maxRpm * 1.1).toFixed(2)} RPM`,
      angle: "Curated learning roadmaps generate high save rates and strong evergreen search traffic.",
      thumbnailConcept: "Roadmap timeline graphic with milestones: Day 1 ➔ Day 30 ➔ Day 90."
    },
    {
      title: `3 Costly Mistakes in ${niche.name.split(',')[0]} That Waste Hours & Money`,
      hook: `Say: 'If you do mistake #2, you are throwing away half your results.'`,
      rpmTier: "Medium",
      estimatedPotential: `$${(niche.minRpm * 1.2).toFixed(2)} - $${(niche.avgRpm * 1.1).toFixed(2)} RPM`,
      angle: "Loss-aversion psychology makes viewers click to make sure they aren't making the mistake.",
      thumbnailConcept: "Person facepalming with a burning dollar bill or broken gauge."
    }
  ];
}

export async function generateViralTopics(
  niche: NicheInfo,
  format: VideoFormat,
  country: CountryTier
): Promise<AIStrategyResponse> {
  // Check if we have specific curated ideas for this niche
  const specificNiche = NICHE_IDEAS_DATABASE[niche.id];
  let ideas: ViralIdea[];

  if (specificNiche) {
    ideas = format === 'shorts' ? specificNiche.shorts : specificNiche.longform;
    // If fewer than 3, backfill with fallback
    if (ideas.length < 3) {
      const fallback = getFallbackIdeas(niche, format);
      ideas = [...ideas, ...fallback.slice(0, 3 - ideas.length)];
    }
  } else {
    ideas = getFallbackIdeas(niche, format);
  }

  // Adjust estimated potentials with country multiplier
  ideas = ideas.map(idea => ({
    ...idea,
    estimatedPotential: format === 'shorts'
      ? `$${(niche.shortsAvgRpm * country.multiplier * 0.8).toFixed(2)} - $${(niche.shortsAvgRpm * country.multiplier * 1.5).toFixed(2)} RPM`
      : `$${(niche.avgRpm * country.multiplier * 0.9).toFixed(2)} - $${(niche.maxRpm * country.multiplier * 1.2).toFixed(2)} RPM`
  }));

  const monetizationTips = [
    `Target high-paying sponsor categories: ${niche.topSponsors.join(', ')}.`,
    `Place mid-roll ads at natural transition points (every 6-8 minutes for 10+ min videos) to increase effective RPM by 35-50%.`,
    `Include affiliate links in the top 3 lines of your description before the 'Show More' fold.`,
    `Focus on audience retention in the first 30 seconds—videos retaining >65% at 0:30 get 4x more impressions from the YouTube algorithm.`
  ];

  const rpmBoostTactics = [
    `Produce content targeted at Tier 1 regions (${country.name.includes('Tier 1') ? 'You are already optimized!' : 'Consider adding English subtitles or US-relevant examples to attract higher-paying US/UK viewers'}).`,
    `Use exact advertiser search terms in your title and description tags (e.g. 'Software', 'Best Platform', 'Review', 'How to Invest').`,
    `Create playlists around unified topics to encourage binge-watching and multi-ad session views.`
  ];

  return {
    nicheTitle: niche.name,
    ideas,
    monetizationTips,
    rpmBoostTactics,
  };
}
