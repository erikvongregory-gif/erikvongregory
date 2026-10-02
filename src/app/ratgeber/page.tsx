import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Vorübergehend offline — Inhalt bleibt im Repo, Route antwortet mit 404. */
export default function RatgeberIndexPage() {
  notFound();
}
