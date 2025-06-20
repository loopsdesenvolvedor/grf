import intl from "@/config/intl";
import { createNavigation } from "next-intl/navigation";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({
    locales: intl.locales,
    defaultLocale: intl.defaultLocale,
  });
