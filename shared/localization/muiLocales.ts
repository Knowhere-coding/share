import { arSD, bgBG, csCZ, deDE, enUS, frFR, plPL, roRO, ruRU, svSE, trTR, ukUA } from "@mui/material/locale";

import {
  arSD as arSDGrid,
  bgBG as bgBGGrid,
  csCZ as csCZGrid,
  deDE as deDEGrid,
  enUS as enUSGrid,
  frFR as frFRGrid,
  plPL as plPLGrid,
  roRO as roROGrid,
  ruRU as ruRUGrid,
  svSE as svSEGrid,
  trTR as trTRGrid,
  ukUA as ukUAGrid,
} from "@mui/x-data-grid";

import {
  arSD as arSDPickers,
  bgBG as bgBGPickers,
  csCZ as csCZPickers,
  deDE as deDEPickers,
  enUS as enUSPickers,
  frFR as frFRPickers,
  plPL as plPLPickers,
  roRO as roROPickers,
  ruRU as ruRUPickers,
  svSE as svSEPickers,
  trTR as trTRPickers,
  ukUA as ukUAPickers,
} from "@mui/x-date-pickers";

/**
 * MUI locale bundles grouped per language.
 * These are merged via createTheme(...locales)
 */
export const muiLocales = {
  ar: [arSD, arSDGrid, arSDPickers],
  bg: [bgBG, bgBGGrid, bgBGPickers],
  cs: [csCZ, csCZGrid, csCZPickers],
  de: [deDE, deDEGrid, deDEPickers],
  en: [enUS, enUSGrid, enUSPickers],
  fr: [frFR, frFRGrid, frFRPickers],
  pl: [plPL, plPLGrid, plPLPickers],
  ro: [roRO, roROGrid, roROPickers],
  ru: [ruRU, ruRUGrid, ruRUPickers],
  sv: [svSE, svSEGrid, svSEPickers],
  tr: [trTR, trTRGrid, trTRPickers],
  uk: [ukUA, ukUAGrid, ukUAPickers],
} as const;

export type SupportedLanguage = keyof typeof muiLocales;
