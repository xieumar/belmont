interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalPageProps {
  title: string;
  intro: string;
  sections: LegalSection[];
}

/** Shared layout for the terms and privacy pages. */
export function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8 md:py-16">
      <h1 className="font-serif text-3xl font-medium text-neutral-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-lg text-neutral-600">{intro}</p>
      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif text-xl font-medium text-neutral-900">
              {section.heading}
            </h2>
            {section.paragraphs.map((text) => (
              <p key={text} className="mt-3 leading-relaxed text-neutral-600">
                {text}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
