from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.core.config import settings
from backend.api.endpoints import router as api_router

app = FastAPI(title=settings.PROJECT_NAME)

# CORS Configuration for frontend access
origins = [
    "http://localhost:5173",  # Vite default port
    "http://localhost:3000",  # React default port
    "*" # For development convenience
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Sentinel AI Backend is Running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
