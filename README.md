SupportFlow AI
SupportFlow AI is an AI-powered customer support agent for SaaS and education companies.
It helps support teams answer repetitive customer questions using company knowledge base documents, while escalating uncertain questions to human support.
Problem
Customer support teams often answer the same questions repeatedly across product usage, pricing, refunds, onboarding, and account management.
Traditional FAQ pages are hard to search, while generic AI chatbots may hallucinate or provide unsupported answers.
Solution
SupportFlow AI uses company documents as a knowledge base. Customers ask questions in natural language. The system retrieves relevant document sections and generates source-grounded answers.
If the system cannot confidently answer a question, it creates a support ticket for human review instead of guessing.
Target Users

* SaaS companies
* Education platforms
* Customer success teams
* Technical support teams
* Product support teams
Core Features

* Knowledge base document upload
* AI-powered customer question answering
* Source citations for AI responses
* Human escalation when confidence is low
* Admin dashboard for support tickets
* Analytics for AI resolution rate and common support issues
Tech Stack

* Frontend: Next.js, React, TypeScript, Tailwind CSS
* Backend: Python FastAPI
* Database: PostgreSQL with pgvector
* AI: OpenAI API
* Deployment: Vercel and Render/Railway
Current Demo
The current version includes:

* Landing page
* Customer chat demo
* Admin dashboard demo
* Sample knowledge base documents
How It Works

1. Admins upload company knowledge base documents.
2. The system splits documents into smaller text chunks.
3. Each chunk is converted into an embedding.
4. Embeddings are stored in PostgreSQL with pgvector.
5. When a customer asks a question, the system retrieves the most relevant chunks.
6. The AI generates a source-grounded answer.
7. If the system cannot find a reliable answer, it escalates the question to human support.
Architecture
Customer question → Next.js frontend → FastAPI backend → pgvector similarity search → OpenAI response generation → Source-grounded answer or human escalation
Project Roadmap
Phase 1: Product Skeleton

* Landing page, chat demo, admin dashboard
* Sample knowledge base documents
Phase 2: Knowledge Base

* Document upload and text extraction
* Text chunking and database storage
Phase 3: AI Retrieval

* Embeddings and vector search
* Source-grounded answer generation
Phase 4: Support Workflow

* Human escalation and ticket creation
* Admin ticket review
Phase 5: Analytics and Demo

* Resolution rate tracking
* Demo video and case study
