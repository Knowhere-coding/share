import dayjs from "dayjs";
import { SupportedLanguage } from "./types";

export function formatDate(
  date: Date | string | number,
  locale: SupportedLanguage,
  options?: Intl.DateTimeFormatOptions
) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

export function formatRelativeDate(
  date: Date | string | number,
  locale: SupportedLanguage
) {
  return dayjs(date).locale(locale).fromNow();
}

export function formatNumber(
  value: number,
  locale: SupportedLanguage,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatCurrency(
  value: number,
  locale: SupportedLanguage,
  currency: string
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}
