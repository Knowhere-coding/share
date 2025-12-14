import { createTheme, Theme } from "@mui/material/styles";
import { muiLocales } from "./muiLocales";
import { normalizeLanguage } from "./types";
import { getDirection } from "./rtl";

export function extendThemeWithLocale(
  baseTheme: Theme,
  language: string
): Theme {
  const lang = normalizeLanguage(language);
  const direction = getDirection(lang);

  return createTheme(
    {
      ...baseTheme,
      direction,
    },
    ...muiLocales[lang]
  );
}
