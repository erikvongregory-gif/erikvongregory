import type { Metadata } from "next";
import { NeuPageStub } from "@/components/neu/NeuPageStub";

export const metadata: Metadata = {
  title: "Saisonkampagnen · Preview",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <NeuPageStub
      title="Saisonkampagnen für Brauereien"
      description="Stub für das neue Layout — Live-Seite bleibt /loesungen/saisonkampagne-brauerei."
    />
  );
}
