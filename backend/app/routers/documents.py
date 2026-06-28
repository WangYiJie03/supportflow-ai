from fastapi import APIRouter, HTTPException

from app.database import supabase

router = APIRouter()


@router.get("/documents")
def get_documents():
    try:
        response = supabase.table("documents").select("*").execute()
        return {"documents": response.data}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


@router.get("/document-chunks")
def get_document_chunks():
    try:
        response = supabase.table("document_chunks").select("*").execute()
        return {"document_chunks": response.data}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))