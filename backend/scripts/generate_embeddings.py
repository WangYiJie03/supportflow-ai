import os
import sys

from dotenv import load_dotenv
from openai import OpenAI

# Allow this script to import from backend/app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import supabase

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise RuntimeError("Missing OPENAI_API_KEY in backend/.env")

openai_client = OpenAI(api_key=OPENAI_API_KEY)


def generate_embedding(text: str) -> list[float]:
    """
    Convert text into a 1536-dimensional embedding vector.
    """
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text,
    )

    return response.data[0].embedding


def format_embedding_for_pgvector(embedding: list[float]) -> str:
    """
    Convert Python list[float] into pgvector-compatible string format.
    Example: [0.1,0.2,0.3]
    """
    return "[" + ",".join(str(value) for value in embedding) + "]"


def main():
    result = (
        supabase.table("document_chunks")
        .select("id, content")
        .is_("embedding", "null")
        .execute()
    )

    chunks = result.data or []

    if not chunks:
        print("No chunks need embedding. All done already.")
        return

    print(f"Found {len(chunks)} chunks without embeddings. Generating...")

    for index, chunk in enumerate(chunks):
        chunk_id = chunk["id"]
        content = chunk["content"]

        embedding = generate_embedding(content)
        embedding_value = format_embedding_for_pgvector(embedding)

        supabase.table("document_chunks").update(
            {"embedding": embedding_value}
        ).eq("id", chunk_id).execute()

        print(f"[{index + 1}/{len(chunks)}] Updated chunk {chunk_id}")

    print("All embeddings generated successfully.")


if __name__ == "__main__":
    main()