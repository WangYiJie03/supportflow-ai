from fastapi import APIRouter, HTTPException

from app.database import supabase

router = APIRouter()


@router.get("/tickets")
def get_tickets():
    try:
        response = supabase.table("support_tickets").select("*").execute()
        return {"tickets": response.data}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))