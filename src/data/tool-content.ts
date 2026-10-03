import type { FaqItem } from '@/components/ToolStructuredData';

export interface ToolContent {
  /** What the tool is for and who benefits (1 short paragraph). */
  about: string;
  /** The method, written as readable lines. Shown as "How it is calculated". */
  method: string[];
  /** A worked example with real numbers the reader can verify by hand. */
  example: { title: string; body: string };
  /** Practical guidance for using the result. */
  tips: string[];
  /**
   * FAQ rendered by the shared tool layout and emitted as FAQPage JSON-LD.
   * Leave undefined for tools whose page already renders its own visible FAQ.
   */
  faqs?: FaqItem[];
}

export const TOOL_CONTENT: Record<string, ToolContent> = {
  '/tools/mortgage-payment-calculator': {
    about:
      'A mortgage payment is more than principal and interest. Property tax, home insurance, HOA dues and private mortgage insurance (PMI) all land in the same monthly budget. This calculator adds them together, then shows how an extra monthly payment shortens the loan and reduces total interest.',
    method: [
      'Loan amount = home price − down payment.',
      'Monthly principal and interest = L × r × (1 + r)^n ÷ ((1 + r)^n − 1), where L is the loan, r is the monthly rate (APR ÷ 12) and n is the number of monthly payments. At 0% interest it is simply L ÷ n.',
      'Property tax = home price × annual tax rate ÷ 12. Insurance and HOA are added as entered.',
      'PMI is estimated at 0.5% of the loan per year while the down payment is below 20%. Real PMI varies by lender, credit score and loan type.',
      'The amortisation table applies each payment to that month’s interest first and the remainder to principal. Extra payments go straight to principal.',
    ],
    example: {
      title: 'Worked example: $400,000 home, 20% down, 6% for 30 years',
      body:
        'The loan is $320,000. The monthly rate is 0.5% and there are 360 payments, so principal and interest is about $1,918.56. Add $400 of property tax (1.2% of $400,000 ÷ 12) and $125 of insurance and the monthly total is about $2,443. Paying an extra $300 each month ends the loan years earlier and saves tens of thousands of dollars in interest.',
    },
    tips: [
      'Compare 15-year and 30-year terms: the payment is higher on 15 years, but total interest is far lower.',
      'Test a rate 0.5 to 1 point above today’s quote to see how much room your budget has.',
      'A 20% down payment removes the PMI estimate here; lenders have their own rules for removing PMI.',
      'Ask lenders for a Loan Estimate and compare the APR and closing costs, not just the headline rate.',
    ],
    faqs: [
      {
        question: 'How much house can I afford?',
        answer:
          'A common planning guide is to keep total housing costs (payment, tax, insurance, HOA) under roughly 28% of gross monthly income and total debts under about 36%. Lenders apply their own limits. Use this calculator to see the full monthly cost of a price you are considering, then check it against your own budget.',
      },
      {
        question: 'Does this include property tax and insurance?',
        answer:
          'Yes. Enter your local property tax rate, annual home insurance and any HOA dues and they are added to principal and interest. PMI is estimated when the down payment is under 20%. Actual amounts depend on your location, lender and policy.',
      },
      {
        question: 'How do extra payments save money?',
        answer:
          'Extra money goes directly to principal, so next month’s interest is charged on a smaller balance. Over many years that compounds into a shorter loan and noticeably less interest. Check that your loan has no prepayment penalty first.',
      },
      {
        question: 'Is this a loan quote?',
        answer:
          'No. It is an estimate based on the numbers you enter. Your lender’s Loan Estimate is the document to rely on for the real rate, fees and payment.',
      },
    ],
  },

  '/tools/compound-interest-calculator': {
    about:
      'Compound interest means you earn interest on your earlier interest as well as on your deposits. Small regular contributions and a long time horizon matter more than most people expect. This calculator shows the growth year by year and separates what you put in from what the interest added.',
    method: [
      'The nominal annual rate is compounded n times per year (monthly, quarterly, daily and so on).',
      'The simulation runs month by month: balance = balance × (1 + monthly growth) + contribution, with contributions made at the end of each month.',
      'Monthly growth = (1 + rate ÷ n)^(n ÷ 12) − 1, so the annual effect matches the compounding frequency you pick.',
      'The inflation-adjusted figure divides the final balance by (1 + inflation)^years to express it in today’s purchasing power.',
    ],
    example: {
      title: 'Worked example: $10,000 plus $500 a month at 7% for 20 years',
      body:
        'You contribute $10,000 + $500 × 240 = $130,000 in total. At 7% compounded monthly the balance ends up around $300,000, so roughly $170,000 of the final value is interest. With 3% inflation, that balance is worth about $166,000 in today’s money.',
    },
    tips: [
      'Starting five years earlier usually beats contributing noticeably more later.',
      'Use a conservative rate. Returns are not steady, and real investments can lose value.',
      'Look at the inflation-adjusted number when comparing against a goal expressed in today’s prices.',
      'Fees reduce the effective rate. Subtract fund fees from the rate you enter.',
    ],
    faqs: [
      {
        question: 'What is the compound interest formula?',
        answer:
          'For a single deposit, A = P × (1 + r ÷ n)^(n × t), where P is the starting amount, r the annual rate, n the compounds per year and t the years. This calculator also adds regular monthly contributions by simulating each month.',
      },
      {
        question: 'Does compounding more often make a big difference?',
        answer:
          'It helps a little, but the rate and the time matter far more. Moving from annual to monthly compounding at 7% adds only a small amount over ten years. Daily compounding adds even less on top of monthly.',
      },
      {
        question: 'Why show an inflation-adjusted balance?',
        answer:
          'Prices rise over time, so a large future number buys less than it appears to. Dividing by cumulative inflation shows what the balance could be worth in today’s money.',
      },
      {
        question: 'Can I rely on a fixed return like 7%?',
        answer:
          'No. Market returns vary from year to year and can be negative. A fixed rate is a planning assumption, not a prediction. Try several rates to see a range.',
      },
    ],
  },

  '/tools/percentage-calculator': {
    about:
      'Percentages are everywhere: discounts, tips, tax, growth, grades and margins. This calculator covers the five questions people actually ask and writes out the answer in a sentence so you can sanity-check it.',
    method: [
      'X% of Y = (X ÷ 100) × Y.',
      'X is what percent of Y = (X ÷ Y) × 100.',
      'Percentage change from A to B = (B − A) ÷ |A| × 100. A positive result is an increase and a negative result is a decrease.',
      'Increase A by P% = A × (1 + P ÷ 100). Decrease A by P% = A × (1 − P ÷ 100).',
    ],
    example: {
      title: 'Worked example: a 20% discount, then a 20% increase',
      body:
        'A $50 item reduced by 20% costs $40. Adding 20% to $40 gives $48, not $50, because the increase is calculated on the smaller number. This is why percentage changes do not simply cancel out.',
    },
    tips: [
      'Percentage change is undefined from zero because the starting value is the denominator.',
      'A change measured in percentage points (for example 5% to 7%) is different from a percentage change (40%).',
      'For several discounts in a row, apply them one after another rather than adding the percentages.',
    ],
    faqs: [
      {
        question: 'How do I calculate a percentage of a number?',
        answer: 'Divide the percentage by 100 and multiply by the number. For example 15% of 200 is 0.15 × 200 = 30.',
      },
      {
        question: 'How do I calculate percentage increase or decrease?',
        answer:
          'Subtract the old value from the new value, divide by the old value, then multiply by 100. A positive answer is an increase and a negative answer is a decrease.',
      },
      {
        question: 'What is the difference between percent and percentage points?',
        answer:
          'Percentage points describe the arithmetic gap between two percentages. Going from 10% to 12% is a 2 percentage-point rise, which is a 20% relative increase.',
      },
    ],
  },

  '/tools/profit-margin-calculator': {
    about:
      'Margin and markup are often confused, and mixing them up leads to underpricing. Margin is profit as a share of the selling price. Markup is profit as a share of cost. This calculator shows both and can work backwards from a target to the price you need to charge.',
    method: [
      'Profit = selling price − cost.',
      'Margin % = profit ÷ selling price × 100.',
      'Markup % = profit ÷ cost × 100.',
      'Price from target margin = cost ÷ (1 − margin). Price from target markup = cost × (1 + markup).',
      'Totals multiply the per-unit figures by the number of units.',
    ],
    example: {
      title: 'Worked example: cost $60, price $100',
      body:
        'Profit is $40. Margin is 40 ÷ 100 = 40%. Markup is 40 ÷ 60 ≈ 66.7%. To earn a 40% margin on a $60 cost you must charge $100, but a 40% markup would only give you $84, a margin of about 28.6%.',
    },
    tips: [
      'Quote targets as margin if you think in terms of how much of each sale you keep.',
      'Include shipping, payment fees and returns in cost, or your real margin will be lower than shown.',
      'A 50% markup is a 33.3% margin; a 100% markup is a 50% margin.',
    ],
    faqs: [
      {
        question: 'What is the difference between margin and markup?',
        answer:
          'Margin divides profit by the selling price; markup divides profit by the cost. The same sale has a lower margin percentage than markup percentage, for example a 100% markup equals a 50% margin.',
      },
      {
        question: 'How do I price a product for a target margin?',
        answer:
          'Divide the cost by (1 minus the margin). For a 40% margin on a $60 cost, $60 ÷ 0.6 = $100.',
      },
      {
        question: 'What is a good profit margin?',
        answer:
          'It depends heavily on the industry, from low single digits for grocery to well over 50% for software. Compare against businesses like yours and make sure the margin covers your overheads.',
      },
    ],
  },

  '/tools/bmi-calculator': {
    about:
      'Body mass index (BMI) compares weight with height as a quick screening number for adults. It is simple and widely used, but it is only a starting point: it cannot tell muscle from fat or account for age, sex, ethnicity or health history.',
    method: [
      'BMI = weight in kg ÷ (height in metres)². Imperial inputs are converted first (1 lb = 0.4536 kg, 1 in = 2.54 cm).',
      'Categories follow the WHO adult ranges: under 18.5 underweight, 18.5 to 24.9 healthy weight, 25 to 29.9 overweight, 30 and over obesity.',
      'The healthy weight range shown is the weight that gives a BMI of 18.5 to 24.9 at your height.',
    ],
    example: {
      title: 'Worked example: 70 kg at 175 cm',
      body:
        'Height is 1.75 m, so BMI = 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 ≈ 22.9, which is in the healthy range. At that height the weights for BMI 18.5 to 24.9 are about 56.7 kg to 76.3 kg.',
    },
    tips: [
      'BMI is for adults aged 18 and over. Children and teenagers use age-specific growth charts.',
      'Athletes and very muscular people can have a high BMI without excess body fat.',
      'Talk to a doctor or dietitian before making health decisions based on BMI.',
    ],
    faqs: [
      {
        question: 'How is BMI calculated?',
        answer:
          'Divide your weight in kilograms by your height in metres squared. In imperial units the equivalent is 703 × weight in pounds ÷ height in inches squared.',
      },
      {
        question: 'What is a healthy BMI range?',
        answer:
          'The WHO defines 18.5 to 24.9 as the healthy weight range for most adults. It is a screening guide, not a diagnosis.',
      },
      {
        question: 'Is BMI reliable for everyone?',
        answer:
          'No. It does not distinguish muscle from fat and can misclassify athletes, older adults and some ethnic groups. Use it as one data point alongside waist size, fitness and advice from a health professional.',
      },
    ],
  },

  '/tools/youtube-money-calculator': {
    about:
      'YouTube earnings depend on views multiplied by RPM, revenue per thousand views after YouTube’s share. RPM swings widely with niche, audience country and video length. This calculator makes those assumptions visible and shows a range rather than a single number.',
    method: [
      'Earnings = (views ÷ 1,000) × RPM.',
      'RPM is taken from a niche range (low, average, high) and scaled by an audience-region multiplier. Videos over about 8 minutes can add mid-roll ads, which raise RPM.',
      'Shorts use a separate, much lower per-thousand rate because Shorts revenue is pooled and shared.',
      'Sponsorship estimates are a heuristic based on views and niche, not an offer from any brand.',
    ],
    example: {
      title: 'Worked example: 25,000 daily views in finance, mostly US audience',
      body:
        'At an average RPM of roughly $14 scaled for a US audience, 25,000 views a day is about $400 per day or $12,000 per month before sponsorships. The same views in gaming at a $2.50 RPM would be closer to $2,000 per month.',
    },
    tips: [
      'Open YouTube Studio and use your own RPM for a better estimate than any niche average.',
      'Audience country moves RPM more than almost any other factor.',
      'Treat sponsorship income as separate from, and often larger than, ad revenue.',
    ],
  },

  '/tools/youtube-shorts-earnings-estimator': {
    about:
      'Shorts earn a small slice of a shared revenue pool, so per-view income is far below long-form. This estimator turns daily views, an assumed RPM or CPM, and upload frequency into a monthly range.',
    method: [
      'Monthly views = daily views × days per month, adjusted by upload frequency and the retention uplift you enter.',
      'Earnings = (monthly views ÷ 1,000) × assumed revenue per thousand views × creator revenue share.',
      'Every assumption is editable so you can match what you see in YouTube Studio.',
    ],
    example: {
      title: 'Worked example: 200,000 daily Shorts views',
      body:
        'At an assumed $0.05 per thousand views, 200,000 daily views is about 6 million views a month and roughly $300 in monthly revenue. That is why many creators use Shorts to grow an audience and drive long-form views and products.',
    },
    tips: [
      'Use Shorts revenue as a bonus rather than the whole plan.',
      'Look at your Studio RPM for Shorts over the last 90 days.',
    ],
  },

  '/tools/tiktok-brand-deal-rate-calculator': {
    about:
      'Brand deals are negotiated, so there is no fixed price. This calculator gives a starting range based on audience size, engagement, average views, niche and the package you offer, so you walk into a conversation with a number.',
    method: [
      'Base rate combines follower count and average views with your engagement rate.',
      'A niche multiplier raises or lowers the rate for categories with higher advertiser demand.',
      'Package tiers (single post, bundle, usage rights) scale the estimate up.',
    ],
    example: {
      title: 'Worked example: 100,000 followers, 6% engagement',
      body:
        'A mid-sized account with strong engagement in a high-value niche may reasonably start negotiations at several hundred dollars per post. Weak engagement or a low-value niche will pull the figure down.',
    },
    tips: [
      'Quote a range and justify it with your engagement and past results.',
      'Charge extra for usage rights, exclusivity and whitelisting.',
    ],
  },

  '/tools/instagram-engagement-rate-tool': {
    about:
      'Engagement rate shows how many followers actually interact with your content. Brands often care more about it than raw follower count. This tool calculates a rate and gives it context with a quality score and audience tier.',
    method: [
      'Interactions = likes + comments + (shares × 2). Shares are weighted double because they signal stronger intent.',
      'Engagement rate = interactions ÷ followers × 100, based on the posts you enter.',
      'Quality score and tier compare your rate against typical ranges for your follower size.',
    ],
    example: {
      title: 'Worked example: 20,000 followers',
      body:
        'If a post gets 600 likes, 40 comments and 20 shares, interactions are 600 + 40 + 40 = 680, an engagement rate of 3.4%.',
    },
    tips: ['Average several posts rather than relying on one.', 'Smaller accounts normally show higher engagement rates than large ones.'],
  },

  '/tools/patreon-earnings-estimator': {
    about:
      'Patreon income is members times average pledge, minus fees and your costs. This estimator keeps every fee assumption editable because rates differ by plan, payment method and country.',
    method: [
      'Gross monthly pledges = paid members × average pledge.',
      'Net earnings = gross × (1 − combined fee rate) − monthly costs.',
      'Change the fee estimate to match your plan and payment mix.',
    ],
    example: {
      title: 'Worked example: 150 members at $6',
      body:
        'Gross pledges are $900. With a combined fee estimate of 12% you keep $792, and after $100 in costs the net is about $692 per month.',
    },
    tips: ['Check your current Patreon plan and payout fees before relying on the estimate.', 'Model member churn by lowering the member count.'],
  },

  '/tools/freelance-rate-calculator': {
    about:
      'A freelance rate has to cover your target income, taxes, business expenses and all the hours you cannot bill. Dividing a salary by 2,080 hours underprices most freelancers. This calculator builds the rate from the ground up and drafts a quote.',
    method: [
      'Required net = target income + annual business expenses.',
      'Gross revenue target = required net ÷ (1 − tax rate).',
      'Billable hours = (52 − weeks off) × hours per week × billable share.',
      'Break-even hourly = gross revenue ÷ billable hours. Target rate adds your profit buffer; premium rate adds about 35% for specialist or urgent work.',
    ],
    example: {
      title: 'Worked example: $80,000 take-home, $1,000 monthly costs',
      body:
        'With 25% tax the gross target is $122,667. Working 46 weeks at 30 hours with 65% billable gives about 897 billable hours, so the break-even rate is roughly $137 per hour before any profit buffer.',
    },
    tips: [
      'Be honest about billable share. Admin, sales and revision rounds often take a third or more of your time.',
      'Quote projects by value, using the hourly rate as a floor rather than the price.',
    ],
    faqs: [
      {
        question: 'How do I set my freelance hourly rate?',
        answer:
          'Start with the income you need after tax, add business costs, divide by realistic billable hours, then add a buffer for profit and slow periods. This calculator does that arithmetic for you.',
      },
      {
        question: 'Why is my freelance rate higher than a salaried hourly wage?',
        answer:
          'Freelancers pay their own taxes, insurance and software, take unpaid time off and cannot bill every hour. A rate roughly 1.5 to 2.5 times a comparable employee wage is common.',
      },
      {
        question: 'Should I charge hourly or per project?',
        answer:
          'Project pricing usually pays better when you work efficiently and the client values the outcome. Use the hourly rate to check that a project price covers your time.',
      },
    ],
  },

  '/tools/break-even-roas-calculator': {
    about:
      'Return on ad spend (ROAS) only tells you if ads are profitable once you know your margin. This calculator works out your costs per order and then the break-even ROAS and cost per acquisition, plus the ROAS needed for a healthy net margin.',
    method: [
      'Cost per unit = product cost + shipping + payment fee + platform fee.',
      'Gross profit per unit = price − cost per unit.',
      'Break-even ROAS = selling price ÷ gross profit per unit. Break-even CPA equals gross profit per unit.',
      'Target ROAS for a net margin m = price ÷ (gross profit − m × price).',
    ],
    example: {
      title: 'Worked example: $50 product',
      body:
        'If landed cost, shipping and fees total $30, gross profit is $20. Break-even ROAS is 50 ÷ 20 = 2.5. Anything under 2.5 loses money on ads; to net 20% ($10 per sale) you need a ROAS of 50 ÷ 10 = 5.',
    },
    tips: ['Include returns and discounts when estimating your average selling price.', 'Track blended ROAS as well as per-campaign ROAS.'],
    faqs: [
      {
        question: 'What is break-even ROAS?',
        answer:
          'It is the revenue you must earn per dollar of ad spend for the ads to cost exactly what they bring in after product, shipping and fee costs. Below it you lose money on each sale.',
      },
      {
        question: 'What is a good ROAS?',
        answer:
          'It depends on your margin. A 2.5 break-even ROAS means 4 is profitable and 2 is not. Compare your real ROAS against your own break-even rather than a generic benchmark.',
      },
      {
        question: 'How do I improve ROAS?',
        answer:
          'Raise average order value, improve conversion rate, cut product or shipping cost, or improve creative and targeting. Each lowers your break-even point or raises revenue per ad dollar.',
      },
    ],
  },

  '/tools/amazon-fba-net-profit-calculator': {
    about:
      'Amazon sellers lose money in the gaps between price and payout: referral fees, FBA fulfilment, storage, ads and returns. This calculator rolls them up into monthly profit, net margin and the break-even selling price.',
    method: [
      'Referral fee = price × referral % + any fixed fee.',
      'Cost per unit = product cost + shipping to Amazon + referral fee + FBA fulfilment + storage + other fees.',
      'Monthly gross profit = (price − cost per unit) × units. Net profit subtracts monthly ad spend.',
      'Break-even price = (costs + ad cost per unit) ÷ (1 − referral rate).',
    ],
    example: {
      title: 'Worked example: $29.99 product, 500 units a month',
      body:
        'If landed cost is $8, referral 15%, FBA $5.50, storage $0.40 and ads $1,500 a month, profit per unit before ads is about $11.60. That is roughly $5,800 gross profit minus $1,500 ads, so about $4,300 net a month.',
    },
    tips: ['Check current Amazon fee tables for your category and size tier.', 'Remember returns, damaged stock and inventory financing.'],
    faqs: [
      {
        question: 'How do I calculate Amazon FBA profit?',
        answer:
          'Subtract product cost, shipping to Amazon, the referral fee, the FBA fulfilment fee, storage, other fees and advertising from your selling price, then multiply by units sold.',
      },
      {
        question: 'What is a healthy FBA net margin?',
        answer:
          'Many sellers aim for 15% to 25% net after ads, but it varies by category and stage. Use the break-even price to see how much room you have.',
      },
      {
        question: 'Does this include returns and taxes?',
        answer:
          'Returns and income tax are not included by default. Add expected returns to Other fees, and treat the result as pre-tax.',
      },
    ],
  },

  '/tools/salary-to-hourly-take-home': {
    about:
      'A salary sounds large until you divide it by the hours you work and subtract tax and benefits. This calculator turns annual pay into an after-tax hourly figure so you can compare offers, freelance work and side jobs fairly.',
    method: [
      'Gross income = salary + bonus.',
      'Taxes = gross × the flat tax rate you enter (not a bracket calculation).',
      'Net income = gross − taxes − health insurance − retirement contributions.',
      'Hourly take-home = net income ÷ (hours per week × weeks per year).',
    ],
    example: {
      title: 'Worked example: $100,000 salary',
      body:
        'With a $5,000 bonus, a 20% tax rate, $6,000 health insurance and $5,000 retirement, net income is $73,000. At 40 hours for 50 weeks that is $36.50 per hour take-home against $52.50 gross.',
    },
    tips: ['Use your marginal effective rate from last year’s return for a better estimate.', 'Count retirement contributions as savings, not lost income, if you value them.'],
  },

  '/tools/macro-tdee-calculator': {
    about:
      'Total daily energy expenditure (TDEE) is an estimate of the calories you burn in a day. Pair it with a goal and a macro split and you have a practical starting point for a diet plan. These are estimates from a population formula, not medical advice.',
    method: [
      'Basal metabolic rate (BMR) uses the Mifflin-St Jeor equation: 10 × kg + 6.25 × cm − 5 × age + 5 (male) or − 161 (female).',
      'TDEE = BMR × an activity multiplier from 1.2 (sedentary) to 1.9 (very active athlete).',
      'Target calories = TDEE plus or minus a goal adjustment, with a floor of 1,200.',
      'Macros use your chosen split. Protein and carbs provide 4 kcal per gram and fat 9 kcal per gram.',
    ],
    example: {
      title: 'Worked example: 30-year-old male, 80 kg, 180 cm, moderately active',
      body:
        'BMR = 800 + 1,125 − 150 + 5 = 1,780 kcal. TDEE = 1,780 × 1.55 ≈ 2,759 kcal. A moderate cut of 350 kcal gives a target near 2,409 kcal a day.',
    },
    tips: ['Track your weight for two to three weeks and adjust, because real needs vary.', 'Seek advice from a clinician if you have a medical condition or are pregnant.'],
    faqs: [
      {
        question: 'What is TDEE?',
        answer:
          'Total daily energy expenditure is the estimated number of calories you burn in a day, including resting metabolism, movement and exercise.',
      },
      {
        question: 'How many calories should I cut to lose weight?',
        answer:
          'Moderate deficits of roughly 250 to 500 kcal a day are a common starting point. Larger deficits are harder to sustain and are best discussed with a professional.',
      },
      {
        question: 'Is the Mifflin-St Jeor equation reliable?',
        answer:
          'It is one of the better-validated equations for the general adult population, but individuals differ. Treat the result as a starting estimate and adjust from real-world results.',
      },
    ],
  },

  '/tools/schema-markup-generator': {
    about:
      'Schema markup in JSON-LD tells search engines what a page is about: an FAQ, article, product, recipe and more. It can make a page eligible for rich results. This generator builds the JSON-LD from a short form so you can paste it into your site.',
    method: [
      'Choose a schema type and fill in the fields. The generator outputs a script tag of type application/ld+json.',
      'Use values that match visible page content; markup that contradicts the page can be ignored or penalised.',
      'Validate the output with Google’s Rich Results Test before publishing.',
    ],
    example: {
      title: 'Worked example: an FAQ page',
      body:
        'Add each question and answer exactly as they appear on the page. The generator wraps them in an FAQPage object with a Question and acceptedAnswer for each item.',
    },
    tips: ['Only mark up content users can see.', 'Re-test after template changes.'],
    faqs: [
      {
        question: 'Does schema markup improve rankings?',
        answer:
          'Not directly. It helps search engines understand your content and can make pages eligible for rich results, which can improve how a listing looks and how often it is clicked.',
      },
      {
        question: 'Where do I put JSON-LD on my page?',
        answer:
          'Paste the script tag in the head or body of the page. Most CMS plugins and tag managers also let you insert it per page.',
      },
      {
        question: 'How do I test my structured data?',
        answer:
          'Use Google’s Rich Results Test or the Schema Markup Validator and fix any errors or warnings before publishing.',
      },
    ],
  },

  '/tools/regex-generator': {
    about:
      'Regular expressions are powerful but hard to read. This tool turns common plain-English descriptions into regex syntax and lets you test the result against your own text before you put it in code.',
    method: [
      'Describe the pattern (for example, an email address or a date) and the tool maps it to a supported regex.',
      'Matches are highlighted live against the test text so you can see what the pattern accepts and rejects.',
      'Generated patterns are starting points: review them for your language’s regex flavour and edge cases.',
    ],
    example: {
      title: 'Worked example: matching dates like 2026-10-04',
      body:
        'The pattern ^\\d{4}-\\d{2}-\\d{2}$ matches four digits, a hyphen, two digits, a hyphen and two digits. It does not check that the month is valid, so add validation in code.',
    },
    tips: ['Test with both matching and non-matching input.', 'Anchor patterns with ^ and $ when validating a whole value.'],
    faqs: [
      {
        question: 'Is the generated regex ready for production?',
        answer:
          'Treat it as a strong starting point. Test it against realistic and hostile input in your language, because regex flavours differ and patterns can be slow on certain inputs.',
      },
      {
        question: 'Does this send my text to a server?',
        answer: 'No. Patterns and test text are processed in your browser.',
      },
      {
        question: 'Can I validate email addresses with a regex?',
        answer:
          'A regex can catch obvious typos, but the only reliable way to confirm an address works is to send a message to it.',
      },
    ],
  },

  '/tools/date-time-calculators': {
    about:
      'Day counts across month ends and leap years are easy to get wrong by hand. These calculators handle days until a date, days since, the span between two dates, weekday lookups, and week and year progress, plus public-holiday countdowns by country.',
    method: [
      'Date differences are computed on calendar days using the browser’s date handling, so leap years are included.',
      'Holiday dates are generated locally from the open-source date-holidays dataset at build time. Moveable and lunar holidays are marked tentative.',
      'Nothing you enter leaves your device.',
    ],
    example: {
      title: 'Worked example: days between 1 January and 31 December',
      body:
        'In a non-leap year that is 364 days between the two dates, or 365 if you count both the first and last day. The tool shows which convention it uses.',
    },
    tips: ['Check local announcements for holidays that depend on moon sightings.', 'Decide whether your count should include the start and end day.'],
    faqs: [
      {
        question: 'Does the day count include the start date?',
        answer:
          'The calculator states how it counts. Counting from one date to another normally excludes the start day; inclusive counts add one.',
      },
      {
        question: 'Are holiday dates final?',
        answer:
          'Fixed holidays are reliable, but dates that depend on moon sightings or government announcements can change. Those are marked tentative.',
      },
      {
        question: 'Does it handle leap years?',
        answer: 'Yes. Calendar day counts include February 29 where it falls in the range.',
      },
    ],
  },
};
