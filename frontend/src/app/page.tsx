const features = [
  {
    title: "Knowledge-based AI Answers",
    description:
      "Answers customer questions using company documents instead of generic AI guesses.",
  },
  {
    title: "Source Citations",
    description:
      "Shows which document the AI used, so support teams can verify and trust answers.",
  },
  {
    title: "Human Escalation",
    description:
      "Creates a support ticket when the AI cannot answer confidently.",
  },
  {
    title: "Support Analytics",
    description:
      "Tracks resolved questions, escalations, and common customer issues.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-4xl">
          <p className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
            AI Customer Support Solution
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Trusted AI customer support for SaaS and education teams.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            SupportFlow AI answers customer questions from company documents,
            shows sources, and escalates uncertain cases to human support.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/chat"
              className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              Try Chat Demo
            </a>

            <a
              href="/admin"
              className="rounded-xl border border-slate-600 px-5 py-3 font-semibold hover:bg-slate-800"
            >
              View Admin Dashboard
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6"
            >
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="mt-3 leading-7 text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}