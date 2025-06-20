import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { intl } from "@/config/intl";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = hasLocale(intl.locales, requestLocale)
    ? requestLocale
    : intl.defaultLocale;

  return {
    locale,
    messages: (await import(`@/langs/${locale}.json`)).default,
  };
});
