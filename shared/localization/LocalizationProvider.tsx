import "./dayjsLocales";
import { ReactNode, useMemo } from "react";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider as MuiDateLocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import { extendThemeWithLocale } from "./extendThemeWithLocale";


type LocalizationProviderProps = {
  children: ReactNode;
};

export function LocalizationProvider({ children }: LocalizationProviderProps) {
  const { i18n } = useTranslation();

  const localizedTheme = useMemo(
    () => extendThemeWithLocale(i18n.language),
    [i18n.language]
  );

  return (
    <ThemeProvider theme={localizedTheme}>
      <MuiDateLocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={language}
      >
        {children}
      </MuiDateLocalizationProvider>
    </ThemeProvider>
  );
}
