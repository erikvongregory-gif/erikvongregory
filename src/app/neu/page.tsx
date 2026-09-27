import type { Metadata } from "next";
import { ParloPage } from "@/components/neu/parlo/ParloPage";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Parlo — Autonomous Support Messaging",
  description:
    "Autonomous support messaging wherever your clients are. Parlo reads, replies, and takes action across your inboxes.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.baseUrl}/neu` },
};

export default function NeuPage() {
  return <ParloPage />;
}
