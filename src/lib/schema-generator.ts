import { SchemaFormData, SchemaType } from '@/types/schema';

export function generateJsonLd(data: SchemaFormData): string {
  let schemaObj: any = {
    '@context': 'https://schema.org',
  };

  switch (data.type) {
    case 'FAQPage':
      schemaObj['@type'] = 'FAQPage';
      schemaObj['mainEntity'] = data.faqs.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer,
        },
      }));
      break;

    case 'Article':
      schemaObj['@type'] = 'Article';
      schemaObj['headline'] = data.headline;
      schemaObj['description'] = data.articleDescription;
      schemaObj['image'] = data.articleImage || undefined;
      schemaObj['datePublished'] = data.datePublished;
      schemaObj['author'] = {
        '@type': 'Person',
        'name': data.authorName,
      };
      schemaObj['publisher'] = {
        '@type': 'Organization',
        'name': data.publisherName,
      };
      break;

    case 'Product':
      schemaObj['@type'] = 'Product';
      schemaObj['name'] = data.productName;
      schemaObj['image'] = data.productImage || undefined;
      schemaObj['description'] = data.productDescription;
      schemaObj['sku'] = data.sku || undefined;
      schemaObj['brand'] = {
        '@type': 'Brand',
        'name': data.brand,
      };
      schemaObj['offers'] = {
        '@type': 'Offer',
        'url': undefined,
        'priceCurrency': data.currency,
        'price': data.price,
        'availability': `https://schema.org/${data.availability}`,
      };
      if (data.ratingValue > 0 && data.reviewCount > 0) {
        schemaObj['aggregateRating'] = {
          '@type': 'AggregateRating',
          'ratingValue': data.ratingValue,
          'reviewCount': data.reviewCount,
        };
      }
      break;

    case 'LocalBusiness':
      schemaObj['@type'] = data.businessType || 'LocalBusiness';
      schemaObj['name'] = data.businessName;
      schemaObj['telephone'] = data.telephone || undefined;
      schemaObj['url'] = data.businessUrl || undefined;
      schemaObj['priceRange'] = data.priceRange || undefined;
      schemaObj['address'] = {
        '@type': 'PostalAddress',
        'streetAddress': data.streetAddress,
        'addressLocality': data.addressLocality,
        'addressRegion': data.addressRegion,
        'postalCode': data.postalCode,
        'addressCountry': data.addressCountry,
      };
      break;

    case 'HowTo':
      schemaObj['@type'] = 'HowTo';
      schemaObj['name'] = data.howToName;
      schemaObj['description'] = data.howToDescription;
      schemaObj['totalTime'] = data.totalTime || undefined;
      schemaObj['step'] = data.steps.map((step, idx) => ({
        '@type': 'HowToStep',
        'position': idx + 1,
        'name': step.name,
        'text': step.text,
      }));
      break;
  }

  return JSON.stringify(schemaObj, null, 2);
}

export async function extractSchemaFromText(
  rawText: string,
  targetType: SchemaType
): Promise<Partial<SchemaFormData>> {
  // Simulate AI extraction delay
  await new Promise((r) => setTimeout(r, 600));

  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);

  if (targetType === 'FAQPage') {
    // Look for lines ending with question marks or starting with Q:
    const faqs: { question: string; answer: string }[] = [];
    let currentQ = '';
    let currentA = '';

    for (const line of lines) {
      if (line.endsWith('?') || line.toLowerCase().startsWith('q:') || line.toLowerCase().startsWith('question:')) {
        if (currentQ && currentA) {
          faqs.push({ question: currentQ, answer: currentA });
          currentA = '';
        }
        currentQ = line.replace(/^(Q:|Question:)\s*/i, '');
      } else if (currentQ) {
        currentA += (currentA ? ' ' : '') + line.replace(/^(A:|Answer:)\s*/i, '');
      }
    }
    if (currentQ && currentA) {
      faqs.push({ question: currentQ, answer: currentA });
    }

    if (faqs.length === 0) {
      faqs.push(
        { question: lines[0] || 'What is this service?', answer: lines[1] || 'This is our flagship offering.' },
        { question: lines[2] || 'How do I get started?', answer: lines[3] || 'Simply sign up online.' }
      );
    }

    return { faqs };
  }

  if (targetType === 'Article') {
    return {
      headline: lines[0] || '10 Proven SEO Strategies for 2026',
      articleDescription: lines[1] || 'A comprehensive guide to boosting organic search visibility and rich snippet CTR.',
      authorName: 'Content Team',
      publisherName: 'ToolCalculators',
      datePublished: new Date().toISOString().split('T')[0],
    };
  }

  if (targetType === 'Product') {
    const priceMatch = rawText.match(/\$?(\d+(\.\d{1,2})?)/);
    return {
      productName: lines[0] || 'Premium Wireless Headphones',
      productDescription: lines.slice(1, 3).join(' ') || 'High-fidelity audio with active noise cancellation.',
      brand: 'AcousticPro',
      price: priceMatch ? parseFloat(priceMatch[1]) : 79.99,
      currency: 'USD',
      availability: 'InStock',
      ratingValue: 4.8,
      reviewCount: 142,
    };
  }

  return {};
}
