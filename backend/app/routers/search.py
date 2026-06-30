import os

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from openai import OpenAI
from pydantic import BaseModel

from app.database import supabase

load_dotenv()

router = APIRouter()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise RuntimeError("Missing OPENAI_API_KEY in backend/.env")

openai_client = OpenAI(api_key=OPENAI_API_KEY)


class SearchRequest(BaseModel):
    query: str
    match_count: int = 3
    match_threshold: float = 0.5


def generate_embedding(text: str) -> list[float]:
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text,
    )

    return response.data[0].embedding


def format_embedding_for_pgvector(embedding: list[float]) -> str:
    return "[" + ",".join(str(value) for value in embedding) + "]"


@router.post("/search")
def search_chunks(request: SearchRequest):
    try:
        if not request.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")

        query_embedding = generate_embedding(request.query)
        embedding_str = format_embedding_for_pgvector(query_embedding)

        result = supabase.rpc(
            "match_document_chunks",
            {
                "query_embedding": embedding_str,
                "match_threshold": request.match_threshold,
                "match_count": request.match_count,
            },
        ).execute()

        return {
            "query": request.query,
            "match_count": request.match_count,
            "match_threshold": request.match_threshold,
            "matches": result.data,
        }

    except HTTPException:
        raise
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))