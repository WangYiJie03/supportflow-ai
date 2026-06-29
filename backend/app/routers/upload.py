from io import BytesIO

from fastapi import APIRouter, File, HTTPException, UploadFile
from pypdf import PdfReader

from app.database import supabase

router = APIRouter()


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extract readable text from a PDF file.
    This works for text-based PDFs, not scanned image-only PDFs.
    """
    pdf_reader = PdfReader(BytesIO(file_bytes))

    extracted_pages = []

    for page in pdf_reader.pages:
        page_text = page.extract_text() or ""
        extracted_pages.append(page_text)

    return "\n".join(extracted_pages).strip()


def split_into_chunks(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """
    Split long text into smaller overlapping chunks.
    Each chunk will later be used for RAG retrieval.
    """
    cleaned_text = " ".join(text.split())

    if not cleaned_text:
        return []

    chunks = []
    start = 0

    while start < len(cleaned_text):
        end = start + chunk_size
        chunk = cleaned_text[start:end]

        if chunk.strip():
            chunks.append(chunk.strip())

        start = end - overlap

    return chunks


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    try:
        if not file.filename:
            raise HTTPException(status_code=400, detail="Missing file name")

        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are supported")

        file_bytes = await file.read()

        try:
            text = extract_text_from_pdf(file_bytes)
        except Exception as error:
            raise HTTPException(status_code=500, detail=f"Failed to read PDF: {str(error)}")

        if not text:
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from this PDF. It may be scanned or image-based.",
            )

        chunks = split_into_chunks(text)

        if not chunks:
            raise HTTPException(status_code=400, detail="No text chunks were created")

        document_response = (
            supabase.table("documents")
            .insert(
                {
                    "file_name": file.filename,
                    "file_type": "pdf",
                    "status": "processing",
                }
            )
            .execute()
        )

        document_data = document_response.data

        if not document_data:
            raise HTTPException(status_code=500, detail="Failed to create document record")

        document_id = document_data[0]["id"]

        chunk_records = [
            {
                "document_id": document_id,
                "chunk_index": index,
                "content": chunk,
            }
            for index, chunk in enumerate(chunks)
        ]

        supabase.table("document_chunks").insert(chunk_records).execute()

        supabase.table("documents").update({"status": "indexed"}).eq("id", document_id).execute()

        return {
            "message": "Document uploaded and chunked successfully",
            "file_name": file.filename,
            "document_id": document_id,
            "chunks_created": len(chunks),
        }

    except HTTPException:
        raise
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))