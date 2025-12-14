export const supportedLanguages = [
  "ar",
  "bg",
  "cs",
  "de",
  "en",
  "fr",
  "pl",
  "ro",
  "ru",
  "sv",
  "tr",
  "uk",
] as const;

export const DEFAULT_LANGUAGE: SupportedLanguage = "de";

export type SupportedLanguage = typeof supportedLanguages[number];

export function normalizeLanguage(language: string): SupportedLanguage {
  const base = language.split("-")[0];
  return supportedLanguages.includes(base as SupportedLanguage)
    ? (base as SupportedLanguage)
    : "de"; // Fallback deutsch
}

