import type { Metadata } from "next";
import { NeuPageStub } from "@/components/neu/NeuPageStub";

export const metadata: Metadata = {
  title: "Biergarten & Events · Preview",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <NeuPageStub
      title="Biergarten- & Event-Marketing"
      description="Stub für das neue Layout — Live-Seite bleibt /loesungen/biergarten-event-marketing."
    />
  );
}
