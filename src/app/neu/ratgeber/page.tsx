import type { Metadata } from "next";
import { NeuPageStub } from "@/components/neu/NeuPageStub";

export const metadata: Metadata = {
  title: "Ratgeber · Preview",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <NeuPageStub
      title="Ratgeber"
      description="Stub für den neuen Ratgeber. Live bleibt unter /ratgeber."
    />
  );
}
