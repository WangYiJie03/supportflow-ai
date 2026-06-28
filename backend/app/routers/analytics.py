from fastapi import APIRouter, HTTPException

from app.database import supabase

router = APIRouter()


@router.get("/analytics")
def get_analytics():
    try:
        documents = supabase.table("documents").select("*").execute().data or []
        chunks = supabase.table("document_chunks").select("*").execute().data or []
        messages = supabase.table("chat_messages").select("*").execute().data or []
        tickets = supabase.table("support_tickets").select("*").execute().data or []

        customer_questions = [
            message for message in messages
            if message.get("role") in ["customer", "user"]
        ]

        high_confidence_ai_answers = [
            message for message in messages
            if message.get("role") == "assistant"
            and message.get("confidence") == "high"
        ]

        total_questions = len(customer_questions)
        resolved_by_ai = len(high_confidence_ai_answers)
        escalated_to_human = len(tickets)

        total_handled = resolved_by_ai + escalated_to_human
        ai_resolution_rate = round((resolved_by_ai / total_handled) * 100) if total_handled > 0 else 0

        return {
            "total_documents": len(documents),
            "total_document_chunks": len(chunks),
            "total_questions": total_questions,
            "resolved_by_ai": resolved_by_ai,
            "escalated_to_human": escalated_to_human,
            "ai_resolution_rate": f"{ai_resolution_rate}%",
        }

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))