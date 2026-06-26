-- Step 1: Enable pgvector extension
create extension if not exists vector with schema extensions;

-- Step 2: documents table
-- Stores uploaded knowledge base file information.
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_type text not null default 'markdown',
  status text not null default 'processing',
  uploaded_at timestamptz not null default now()
);

-- Step 3: document_chunks table
-- Stores smaller text chunks from each document and their embedding vectors.
create table if not exists document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  chunk_index int not null,
  content text not null,
  embedding extensions.vector(1536),
  created_at timestamptz not null default now()
);

-- Step 4: chat_messages table
-- Stores user questions and AI responses.
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  content text not null,
  source_document_id uuid references documents(id),
  confidence text,
  created_at timestamptz not null default now()
);

-- Step 5: support_tickets table
-- Stores questions that the AI could not answer confidently.
create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  ai_summary text,
  status text not null default 'open',
  priority text not null default 'medium',
  created_at timestamptz not null default now()
);