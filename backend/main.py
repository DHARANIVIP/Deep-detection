from fastapi import FastAPI, UploadFile, File, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import uuid
import shutil
import json

# Internal Imports based on your structure
from core.config import UPLOAD_FOLDER
from services.video_processor import process_video_pipeline

app = FastAPI(title="Nexora AI - Deepfake Defense System")

# 1. CORS CONFIGURATION
# This is CRITICAL. Without this, your React frontend will be 
# blocked from talking to this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development. In production, use your frontend URL.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure the storage directories exist on startup
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs("storage/results", exist_ok=True)

@app.get("/")
async def health_check():
    return {"status": "online", "system": "Nexora Deepfake Detector"}

# 2. THE ANALYZE ENDPOINT
@app.post("/analyze")
async def analyze_video(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """
    Step 1: Receive Video
    Step 2: Save to 'uploads' folder
    Step 3: Start Background Process (Asynchronous)
    """
    # Validate File Extension
    ext = file.filename.split(".")[-1].lower()
    if ext not in ["mp4", "avi", "mov"]:
        raise HTTPException(status_code=400, detail="Invalid video format.")

    # Generate Unique ID for this scan
    scan_id = str(uuid.uuid4())
    file_name = f"{scan_id}.{ext}"
    file_path = os.path.join(UPLOAD_FOLDER, file_name)

    # Save File to Disk
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File Save Error: {e}")

    # TRIGGER BACKGROUND TASK
    # This allows the API to return the scan_id IMMEDIATELY 
    # while the AI works in the background.
    background_tasks.add_task(process_video_pipeline, scan_id, file_path)

    return {
        "scan_id": scan_id,
        "message": "Analysis started. Please poll /results/{scan_id} for status.",
        "status": "PROCESSING"
    }

# 3. THE STATUS/RESULTS ENDPOINT
@app.get("/results/{scan_id}")
async def get_results(scan_id: str):
    """
    The Frontend will 'poll' this endpoint every 2 seconds.
    If the JSON file exists in storage/results, we return the data.
    """
    result_path = f"storage/results/{scan_id}.json"

    if os.path.exists(result_path):
        with open(result_path, "r") as f:
            data = json.load(f)
        return {"status": "COMPLETED", "data": data}
    
    return {"status": "PROCESSING", "message": "The AI is still inspecting the frames..."}

# 4. THE REPORT DOWNLOAD ENDPOINT
@app.get("/download-report/{scan_id}")
async def download_report(scan_id: str):
    """
    Allows the user to download the Forensic PDF.
    """
    report_path = f"storage/results/{scan_id}.pdf"

    if os.path.exists(report_path):
        return FileResponse(
            path=report_path,
            filename=f"Nexora_Forensic_Report_{scan_id[:8]}.pdf",
            media_type='application/pdf'
        )
    
    raise HTTPException(status_code=404, detail="Report not generated yet.")

if __name__ == "__main__":
    import uvicorn
    # Start the server on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)