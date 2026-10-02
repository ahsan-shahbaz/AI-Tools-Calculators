export interface RegexPreset {
  id: string;
  name: string;
  query: string;
  pattern: string;
  flags: string;
  sampleTestText: string;
  explanation: {
    token: string;
    meaning: string;
  }[];
}

export interface RegexGenerationResult {
  pattern: string;
  flags: string;
  fullRegex: string;
  explanation: {
    token: string;
    meaning: string;
  }[];
  codeSnippets: {
    javascript: string;
    python: string;
    php: string;
    golang: string;
  };
}
