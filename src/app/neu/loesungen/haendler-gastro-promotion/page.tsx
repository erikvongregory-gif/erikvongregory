import type { Metadata } from "next";
import { NeuPageStub } from "@/components/neu/NeuPageStub";

export const metadata: Metadata = {
  title: "Händler & Gastro · Preview",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <NeuPageStub
      title="Händler- & Gastro-Promotion"
      description="Stub für das neue Layout — Live-Seite bleibt /loesungen/haendler-gastro-promotion."
    />
  );
}
