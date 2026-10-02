import { FreelanceRolePreset } from '@/types/freelance';

export const FREELANCE_ROLES: FreelanceRolePreset[] = [
  {
    id: 'web-dev',
    name: 'Web & Full-Stack Developer',
    category: 'Engineering',
    icon: '💻',
    defaultTargetSalary: 85000,
    defaultMonthlyExpenses: 500,
    defaultBillablePercentage: 65,
    averageIndustryRate: { min: 50, avg: 85, max: 150 },
    sampleProjectPrompt: 'Build a responsive 5-page marketing website in Next.js with contact form, blog CMS, and Stripe checkout integration.'
  },
  {
    id: 'ui-ux',
    name: 'UI/UX & Product Designer',
    category: 'Design',
    icon: '🎨',
    defaultTargetSalary: 75000,
    defaultMonthlyExpenses: 400,
    defaultBillablePercentage: 60,
    averageIndustryRate: { min: 45, avg: 75, max: 130 },
    sampleProjectPrompt: 'Design a mobile iOS app UI in Figma with 12 screens, interactive prototypes, and a design component system.'
  },
  {
    id: 'copywriter',
    name: 'Copywriter & Content Strategist',
    category: 'Marketing',
    icon: '✍️',
    defaultTargetSalary: 65000,
    defaultMonthlyExpenses: 250,
    defaultBillablePercentage: 55,
    averageIndustryRate: { min: 35, avg: 65, max: 110 },
    sampleProjectPrompt: 'Write high-converting sales page copy (approx 2,500 words) plus a 5-part onboarding email welcome sequence.'
  },
  {
    id: 'video-editor',
    name: 'Video Editor & Motion Designer',
    category: 'Creative',
    icon: '🎬',
    defaultTargetSalary: 70000,
    defaultMonthlyExpenses: 450,
    defaultBillablePercentage: 65,
    averageIndustryRate: { min: 40, avg: 70, max: 120 },
    sampleProjectPrompt: 'Edit 4 YouTube long-form videos (12 mins each) with sound design, B-roll, and create 8 viral TikTok/Shorts cutdowns.'
  },
  {
    id: 'seo-specialist',
    name: 'SEO & Growth Marketer',
    category: 'Marketing',
    icon: '📈',
    defaultTargetSalary: 72000,
    defaultMonthlyExpenses: 350,
    defaultBillablePercentage: 60,
    averageIndustryRate: { min: 40, avg: 75, max: 125 },
    sampleProjectPrompt: 'Conduct comprehensive technical SEO audit, keyword research strategy, and optimize top 15 revenue-generating landing pages.'
  },
  {
    id: 'va-admin',
    name: 'Virtual Assistant & Ops Manager',
    category: 'Operations',
    icon: '⚡',
    defaultTargetSalary: 45000,
    defaultMonthlyExpenses: 150,
    defaultBillablePercentage: 75,
    averageIndustryRate: { min: 25, avg: 40, max: 65 },
    sampleProjectPrompt: 'Inbox zero management, customer support ticket resolution, scheduling executive calendar, and weekly invoice bookkeeping.'
  }
];

export const INVOICE_AFFILIATES = [
  {
    title: 'FreshBooks',
    badge: 'Top Invoicing Software',
    description: 'Create professional estimates, track billable client hours, and accept credit cards with automated late payment reminders.',
    ctaText: 'Start Free 30-Day Trial',
    link: 'https://freshbooks.com',
    icon: '🧾'
  },
  {
    title: 'Wise Business',
    badge: 'Lowest FX Fees',
    description: 'Get local USD, EUR, GBP bank details to receive international client payments with zero exorbitant wire fees.',
    ctaText: 'Open Free Business Account',
    link: 'https://wise.com',
    icon: '🌍'
  },
  {
    title: 'Bonsai / Deel',
    badge: 'Contracts & Taxes',
    description: 'Generate legally vetted freelance contracts, auto-generate 1099/W8-BEN tax forms, and secure escrow deposits.',
    ctaText: 'Explore Freelance Contracts',
    link: 'https://hellobonsai.com',
    icon: '⚖️'
  }
];
