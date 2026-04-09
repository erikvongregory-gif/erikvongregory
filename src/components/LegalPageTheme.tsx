"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const LEGAL_PATHS = ["/datenschutz", "/impressum", "/agb"];

export function LegalPageTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const isLegalPage = LEGAL_PATHS.includes(pathname ?? "");
    document.body.setAttribute("data-legal-page", isLegalPage ? "true" : "");
  }, [pathname]);

  return null;
}
