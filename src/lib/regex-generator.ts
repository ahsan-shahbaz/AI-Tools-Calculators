import { RegexPreset, RegexGenerationResult } from '@/types/regex';

export const REGEX_PRESETS: RegexPreset[] = [
  {
    id: 'email',
    name: 'Email Address',
    query: 'Valid email address with standard domain',
    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    flags: 'g',
    sampleTestText: 'Contact support@toolcalculate.com or john.doe123@gmail.com for inquiries. Invalid: test@.com, @test.org',
    explanation: [
      { token: '[a-zA-Z0-9._%+-]+', meaning: 'Matches 1 or more alphanumeric characters, dots, underscores, percents, pluses, or hyphens (username).' },
      { token: '@', meaning: 'Matches the literal @ symbol.' },
      { token: '[a-zA-Z0-9.-]+', meaning: 'Matches the domain name characters.' },
      { token: '\\.', meaning: 'Matches the literal dot before the TLD extension.' },
      { token: '[a-zA-Z]{2,}', meaning: 'Matches at least 2 letters for the Top Level Domain (e.g. .com, .org, .co.uk).' }
    ]
  },
  {
    id: 'phone',
    name: 'US / International Phone',
    query: 'Phone number with optional country code, dashes, or parentheses',
    pattern: '(?:\\+?\\d{1,3}[- ]?)?\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}',
    flags: 'g',
    sampleTestText: 'Call our office at +1 (555) 234-5678 or 555-876-5432. Direct line: +44 20 7946 0912.',
    explanation: [
      { token: '(?:\\+?\\d{1,3}[- ]?)?', meaning: 'Optional international country code (e.g. +1, +44) with optional space/dash.' },
      { token: '\\(?\\d{3}\\)?', meaning: 'Matches 3 digits for area code, with or without parentheses.' },
      { token: '[- ]?', meaning: 'Optional separator (space or hyphen).' },
      { token: '\\d{3}[- ]?\\d{4}', meaning: 'Matches the 7-digit local number split by an optional separator.' }
    ]
  },
  {
    id: 'url',
    name: 'Web URL / Link',
    query: 'HTTP or HTTPS web URL with paths and parameters',
    pattern: 'https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)',
    flags: 'gi',
    sampleTestText: 'Check out https://toolcalculate.com/tools and http://sub.domain.org/path?ref=ai-tools for details.',
    explanation: [
      { token: 'https?:\\/\\/', meaning: 'Matches http:// or https:// protocol prefix.' },
      { token: '(?:www\\.)?', meaning: 'Optionally matches the www. subdomain.' },
      { token: '[-a-zA-Z0-9...]{1,256}\\.[a-zA-Z0-9()]{1,6}', meaning: 'Matches the valid domain name and TLD.' },
      { token: '\\b(?:[-a-zA-Z0-9...\\/=]*)', meaning: 'Matches optional route paths, file extensions, and query string parameters.' }
    ]
  },
  {
    id: 'password',
    name: 'Strong Password Rule',
    query: 'At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    flags: '',
    sampleTestText: 'P@ssw0rd2026\nweakpass\nNoSpecial123\nValid#Key99',
    explanation: [
      { token: '(?=.*[a-z])', meaning: 'Positive lookahead: ensures at least one lowercase letter is present.' },
      { token: '(?=.*[A-Z])', meaning: 'Positive lookahead: ensures at least one uppercase letter is present.' },
      { token: '(?=.*\\d)', meaning: 'Positive lookahead: ensures at least one numerical digit is present.' },
      { token: '(?=.*[@$!%*?&])', meaning: 'Positive lookahead: ensures at least one designated special symbol.' },
      { token: '[A-Za-z\\d@$!%*?&]{8,}', meaning: 'Ensures the total length is at least 8 characters long.' }
    ]
  },
  {
    id: 'ipv4',
    name: 'IPv4 Address',
    query: 'Valid IPv4 address between 0.0.0.0 and 255.255.255.255',
    pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
    flags: 'g',
    sampleTestText: 'Server IP: 192.168.1.1, Gateway: 10.0.0.254, DNS: 8.8.8.8. Invalid: 300.1.2.3, 192.168.1',
    explanation: [
      { token: '\\b', meaning: 'Word boundary to prevent matching substrings of longer numbers.' },
      { token: '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)', meaning: 'Accurately restricts each octet number to 0-255.' },
      { token: '\\.', meaning: 'Matches literal separator period between octets.' }
    ]
  },
  {
    id: 'hexcolor',
    name: 'Hex Color Code',
    query: '3-digit or 6-digit hex color code with # symbol',
    pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b',
    flags: 'gi',
    sampleTestText: 'Colors: #ff5733, #FFF, #22c55e, #000000. Invalid: #gggggg, #12345',
    explanation: [
      { token: '#', meaning: 'Matches the starting hashtag character.' },
      { token: '[0-9a-fA-F]{3}', meaning: 'Matches 3 hex characters (0-9, a-f).' },
      { token: '{1,2}', meaning: 'Matches either once (3-digit short hex) or twice (6-digit full hex).' }
    ]
  }
];

export async function generateRegexFromQuery(
  userQuery: string,
  flags: string = 'g'
): Promise<RegexGenerationResult> {
  // Simulate AI latency
  await new Promise((r) => setTimeout(r, 500));

  const q = userQuery.toLowerCase().trim();

  // Check matching preset
  const matchedPreset = REGEX_PRESETS.find(
    (p) => q.includes(p.name.toLowerCase()) || q.includes(p.id) || p.query.toLowerCase().includes(q)
  );

  let pattern = matchedPreset ? matchedPreset.pattern : '';
  let explanation = matchedPreset ? matchedPreset.explanation : [];

  if (!pattern) {
    if (q.includes('date') || q.includes('year') || q.includes('iso')) {
      pattern = '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])';
      explanation = [
        { token: '\\d{4}', meaning: 'Matches 4-digit year (YYYY).' },
        { token: '(?:0[1-9]|1[0-2])', meaning: 'Matches valid 2-digit month (01 to 12).' },
        { token: '(?:0[1-9]|[12]\\d|3[01])', meaning: 'Matches valid 2-digit day (01 to 31).' }
      ];
    } else if (q.includes('slug') || q.includes('url slug')) {
      pattern = '^[a-z0-9]+(?:-[a-z0-9]+)*$';
      explanation = [
        { token: '^[a-z0-9]+', meaning: 'Starts with lowercase alphanumeric characters.' },
        { token: '(?:-[a-z0-9]+)*$', meaning: 'Hyphen-separated lowercase tokens until end of string.' }
      ];
    } else if (q.includes('price') || q.includes('currency') || q.includes('dollar')) {
      pattern = '\\$\\d+(?:\\.\\d{2})?';
      explanation = [
        { token: '\\$', meaning: 'Matches literal dollar sign.' },
        { token: '\\d+', meaning: 'Matches whole dollar digits.' },
        { token: '(?:\\.\\d{2})?', meaning: 'Optional decimal cents with exactly two digits.' }
      ];
    } else {
      // General alphanumeric token extractor
      pattern = '\\b[A-Za-z0-9_]{3,}\\b';
      explanation = [
        { token: '\\b', meaning: 'Word boundary anchor.' },
        { token: '[A-Za-z0-9_]{3,}', meaning: 'Words with 3 or more alphanumeric characters or underscores.' }
      ];
    }
  }

  const cleanPattern = pattern;
  const fullRegex = `/${cleanPattern}/${flags}`;

  const codeSnippets = {
    javascript: `const regex = /${cleanPattern}/${flags};\nconst text = "Your sample text here";\nconst matches = [...text.matchAll(regex)];\nconsole.log(matches);`,
    python: `import re\n\npattern = r"${cleanPattern}"\ntext = "Your sample text here"\nmatches = re.findall(pattern, text)\nprint(matches)`,
    php: `$pattern = '/${cleanPattern}/${flags}';\n$text = "Your sample text here";\npreg_match_all($pattern, $text, $matches);\nprint_r($matches);`,
    golang: `package main\nimport (\n\t"fmt"\n\t"regexp"\n)\nfunc main() {\n\tre := regexp.MustCompile(\`${cleanPattern}\`)\n\tfmt.Println(re.FindAllString("Your sample text", -1))\n}`
  };

  return {
    pattern: cleanPattern,
    flags,
    fullRegex,
    explanation,
    codeSnippets
  };
}
