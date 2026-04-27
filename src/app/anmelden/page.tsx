import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: "EvGlab - Anmeldung",
  },
  alternates: {
    canonical: SITE.baseUrl,
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function AnmeldenPage() {
  redirect("/");
}
