const messages = [
  {
    role: "Customer",
    content: "How do I reset my password?",
  },
  {
    role: "SupportFlow AI",
    content:
      'You can reset your password from the Account Settings page. If you cannot access your account, click "Forgot Password" on the login page and follow the reset link sent to your email.',
    source: "User Guide.pdf",
    confidence: "High",
  },
  {
    role: "Customer",
    content: "What is the enterprise pricing plan?",
  },
  {
    role: "SupportFlow AI",
    content:
      "I could not find a reliable answer in the current knowledge base. I have created a support ticket for a human team member to review.",
    source: "No reliable source found",
    confidence: "Low",
  },
];

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <a href="/" className="text-sm text-slate-400 hover:text-white">
          ← Back to Home
        </a>

        <h1 className="mt-4 text-3xl font-bold">Customer Chat Demo</h1>

        <p className="mt-2 text-slate-400">
          This page shows how a customer can ask a question and receive a
          source-grounded AI answer. Uncertain questions are escalated to human
          support.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="space-y-5">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`rounded-2xl p-4 ${
                  message.role === "Customer"
                    ? "ml-auto max-w-xl bg-cyan-400 text-slate-950"
                    : "mr-auto max-w-2xl border border-slate-700 bg-slate-800 text-white"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
                  {message.role}
                </p>

                <p className="mt-2 leading-7">{message.content}</p>

                {message.source && (
                  <div className="mt-4 rounded-xl border border-slate-600 bg-slate-900 p-3 text-sm text-slate-300">
                    <p>
                      <span className="font-semibold text-white">Source:</span>{" "}
                      {message.source}
                    </p>
                    <p>
                      <span className="font-semibold text-white">
                        Confidence:
                      </span>{" "}
                      <span
                        className={
                          message.confidence === "High"
                            ? "text-green-400"
                            : "text-orange-400"
                        }
                      >
                        {message.confidence}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <input
              disabled
              placeholder="Ask a question..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400 placeholder-slate-500"
            />
            <button
              disabled
              className="rounded-xl bg-slate-700 px-5 py-3 font-semibold text-slate-400"
            >
              Send
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Static demo only. RAG and OpenAI integration will be added in a
            later phase.
          </p>
        </div>
      </div>
    </main>
  );
}