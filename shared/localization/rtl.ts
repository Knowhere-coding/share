import { SupportedLanguage } from "./types";

const RTL_LANGUAGES: SupportedLanguage[] = ["ar"];

export function getDirection(language: SupportedLanguage | string) {
  return RTL_LANGUAGES.includes(language as SupportedLanguage)
    ? "rtl"
    : "ltr";
}
