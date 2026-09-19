type NeuPageStubProps = {
  title: string;
  description: string;
  /** Optionaler Hinweis unter dem Lead */
  note?: string;
};

/** Platzhalter bis das eigentliche Redesign der jeweiligen Seite steht. */
export function NeuPageStub({ title, description, note }: NeuPageStubProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 pt-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
        /neu · Stub
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-newsreader)] text-4xl leading-tight tracking-tight md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-lg text-neutral-700">{description}</p>
      {note ? <p className="mt-6 text-sm text-neutral-500">{note}</p> : null}
    </section>
  );
}
