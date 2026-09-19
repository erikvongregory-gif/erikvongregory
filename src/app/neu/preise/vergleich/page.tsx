import type { Metadata } from "next";
import { NeuPageStub } from "@/components/neu/NeuPageStub";

export const metadata: Metadata = {
  title: "Preise · Preview",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <NeuPageStub
      title="Preise & Vergleich"
      description="Stub für den neuen Preisvergleich. Live bleibt unter /preise/vergleich."
    />
  );
}
