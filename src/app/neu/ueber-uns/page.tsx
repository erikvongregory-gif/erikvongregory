import type { Metadata } from "next";
import { NeuPageStub } from "@/components/neu/NeuPageStub";

export const metadata: Metadata = {
  title: "Über uns · Preview",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <NeuPageStub
      title="Über uns"
      description="Stub für die neue Über-uns-Seite. Live bleibt unter /ueber-uns."
    />
  );
}
