from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from backend.core.config import settings
from backend.services.video_processor import process_video

router = APIRouter()

# process_video_task removed, using backend.services.video_processor.process_video directly

@router.post("/analyze")
async def analyze_video(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """
    Upload a video for forensic analysis.
    """
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="File must be a video.")

    scan_id = str(uuid.uuid4())
    scan_dir = os.path.join(settings.STORAGE_DIR, scan_id)
    os.makedirs(scan_dir, exist_ok=True)
    
    file_location = os.path.join(scan_dir, file.filename)
    
    try:
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)
    except Exception as e:
         raise HTTPException(status_code=500, detail=f"Could not save file: {str(e)}")

    # Trigger background processing
    background_tasks.add_task(process_video, scan_id, file_location)

    return {
        "scan_id": scan_id,
        "message": "Video uploaded successfully. Analysis started.",
        "status": "Processing"
    }

@router.get("/status/{scan_id}")
def get_status(scan_id: str):
    """
    Check the status of a scan.
    """
    scan_dir = os.path.join(settings.STORAGE_DIR, scan_id)
    if not os.path.exists(scan_dir):
        raise HTTPException(status_code=404, detail="Scan ID not found")
    
    # Check for report file to determine completion
    report_path = os.path.join(scan_dir, "report.json")
    if os.path.exists(report_path):
        return {"status": "Completed", "result_available": True}
    
    return {"status": "Processing", "result_available": False}

@router.get("/report/{scan_id}")
def get_report(scan_id: str):
    """
    Retrieve the forensic report.
    """
    scan_dir = os.path.join(settings.STORAGE_DIR, scan_id)
    report_path = os.path.join(scan_dir, "report.json")
    
    if not os.path.exists(report_path):
        raise HTTPException(status_code=404, detail="Report not generated yet or Scan ID invalid")
    
    # Return loading/reading report logic here
    # For now, return a dummy report if the file doesn't exist but the dir does?
    # No, strictly follow file existence.
    
    with open(report_path, "r") as f:
        import json
        return json.load(f)
