"use client";

import { useEffect, useState } from "react";

type AnalyticsData = {
  total_documents: number;
  total_document_chunks: number;
  total_questions: number;
  resolved_by_ai: number;
  escalated_to_human: number;
  ai_resolution_rate: string;
};

type Document = {
  id: string;
  file_name: string;
  file_type: string;
  status: string;
  uploaded_at: string;
};

type Ticket = {
  id: string;
  question: string;
  ai_summary: string;
  status: string;
  priority: string;
  created_at: string;
};

export default function AdminPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [analyticsRes, documentsRes, ticketsRes] = await Promise.all([
          fetch("http://localhost:8000/api/analytics"),
          fetch("http://localhost:8000/api/documents"),
          fetch("http://localhost:8000/api/tickets"),
        ]);

        const analyticsData = await analyticsRes.json();
        const documentsData = await documentsRes.json();
        const ticketsData = await ticketsRes.json();

        setAnalytics(analyticsData);
        setDocuments(documentsData.documents);
        setTickets(ticketsData.tickets);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </main>
    );
  }

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

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {analytics && (
            <>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Total Questions</p>
                <p className="mt-2 text-3xl font-bold text-cyan-400">
                  {analytics.total_questions}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Resolved by AI</p>
                <p className="mt-2 text-3xl font-bold text-cyan-400">
                  {analytics.resolved_by_ai}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">AI Resolution Rate</p>
                <p className="mt-2 text-3xl font-bold text-cyan-400">
                  {analytics.ai_resolution_rate}
                </p>
              </div>
            </>
          )}
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
                  key={doc.id}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium">{doc.file_name}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        doc.status === "indexed"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-amber-400/10 text-amber-400"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">
                    Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}
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
                  key={ticket.id}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-4"
                >
                  <p className="font-medium">{ticket.question}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {ticket.ai_summary}
                  </p>
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