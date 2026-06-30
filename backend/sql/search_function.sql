create or replace function match_document_chunks (
  query_embedding extensions.vector(1536),
  match_threshold float default 0.5,
  match_count int default 3
)
returns table (
  id uuid,
  document_id uuid,
  content text,
  similarity float
)
language sql
stable
as $$
  select
    document_chunks.id,
    document_chunks.document_id,
    document_chunks.content,
    1 - (document_chunks.embedding <=> query_embedding) as similarity
  from document_chunks
  where document_chunks.embedding is not null
    and 1 - (document_chunks.embedding <=> query_embedding) > match_threshold
  order by document_chunks.embedding <=> query_embedding
  limit match_count;
$$;