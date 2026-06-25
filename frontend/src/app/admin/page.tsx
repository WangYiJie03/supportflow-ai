const analytics = [
  { label: "Total Questions", value: "128" },
  { label: "Resolved by AI", value: "94" },
  { label: "Escalated to Human", value: "34" },
  { label: "AI Resolution Rate", value: "73%" },
];

const documents = [
  { name: "User Guide.pdf", status: "Indexed", chunks: 42 },
  { name: "Pricing and Plans.pdf", status: "Indexed", chunks: 18 },
  { name: "Refund Policy.pdf", status: "Pending Review", chunks: 9 },
];

const tickets = [
  {
    question: "What is the enterprise pricing plan?",
    status: "Needs human review",
    priority: "Medium",
  },
  {
    question: "Can I integrate this with my LMS?",
    status: "Needs human review",
    priority: "High",
  },
  {
    question: "Do you support bulk student uploads?",
    status: "Open",
    priority: "Low",
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <a href="/" className="text-sm text-slate-400 hover:text-white">
          ← Back to Home
        </a>

        <h1 className="mt-4 text-3xl font-bold">Admin Dashboard</h1>

        <p className="mt-2 max-w-3xl text-slate-400">
          Manage knowledge base documents, review escalated tickets, and track
          AI support performance.
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {analytics.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-cyan-400">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Knowledge Base Documents</h2>
            <p className="mt-1 text-sm text-slate-400">
              Uploaded files used for AI retrieval.
            </p>

            <div className="mt-5 space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium">{doc.name}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        doc.status === "Indexed"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-amber-400/10 text-amber-400"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">
                    {doc.chunks} text chunks indexed
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Escalated Tickets</h2>
            <p className="mt-1 text-sm text-slate-400">
              Questions the AI could not answer confidently.
            </p>

            <div className="mt-5 space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.question}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-4"
                >
                  <p className="font-medium">{ticket.question}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-400">
                      {ticket.status}
                    </span>
                    <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
                      Priority: {ticket.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}