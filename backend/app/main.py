from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import analytics, documents, tickets, upload, search

app = FastAPI(title="SupportFlow AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents.router, prefix="/api")
app.include_router(tickets.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")
app.include_router(upload.router, prefix="/api")
app.include_router(search.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "SupportFlow AI backend is running"}


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "SupportFlow AI API"}