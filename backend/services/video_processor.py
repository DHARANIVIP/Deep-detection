import cv2
import os
import json
from backend.core.config import settings

def extract_frames(video_path: str, output_folder: str, interval_fps: int = 1):
    """
    Extracts frames from a video at a specific interval.
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error opening video file: {video_path}")
        return []

    fps = cap.get(cv2.CAP_PROP_FPS)
    if not fps or fps <= 0:
        fps = 30 # Default safety fallback
    
    frame_interval = int(fps / interval_fps) if interval_fps > 0 else 1 # Extract 1 frame every second
    
    saved_frames = []
    frame_count = 0
    saved_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % frame_interval == 0:
            timestamp = frame_count / fps
            frame_filename = f"frame_{saved_count:04d}.jpg"
            frame_path = os.path.join(output_folder, frame_filename)
            cv2.imwrite(frame_path, frame)
            saved_frames.append({
                "filename": frame_filename,
                "timestamp": timestamp,
                "path": frame_path
            })
            saved_count += 1
        
        frame_count += 1

    cap.release()
    return saved_frames

from backend.services.ai_detector import AIDetector
from backend.services.math_detector import MathDetector
from backend.services.face_detector import FaceDetector

def process_video(scan_id: str, file_path: str):
    """
    Orchestrate the video processing pipeline.
    """
    print(f"Processing started for {scan_id}")
    scan_dir = os.path.join(settings.STORAGE_DIR, scan_id)
    frames_dir = os.path.join(scan_dir, "frames")
    faces_dir = os.path.join(scan_dir, "faces")
    
    # Initialize Services
    face_detector = FaceDetector()
    ai_detector = AIDetector()
    math_detector = MathDetector()
    
    # 1. Extract Frames
    frames_metadata = extract_frames(file_path, frames_dir)
    print(f"Extracted {len(frames_metadata)} frames.")
    
    total_faces_analyzed = 0
    fake_frames_count = 0
    accumulated_probability = 0.0
    
    frame_results = []
    
    # 2. Analyze Frames
    for frame_meta in frames_metadata:
        frame_path = frame_meta["path"]
        
        # Detect Faces
        face_paths = face_detector.extract_faces(frame_path, faces_dir)
        
        frame_verdict = "Real"
        frame_prob = 0.0
        
        if face_paths:
            # We take the max probability if multiple faces are present (pessimistic approach)
            max_prob = 0.0
            total_faces_analyzed += len(face_paths)
            
            for face_path in face_paths:
                # AI Analysis
                ai_score = ai_detector.predict(face_path)
                
                # Math Analysis (FFT)
                # math_anomaly = math_detector.analyze_frequency(face_path) 
                # Integrating math score could be complex, for now strictly use AI score for verdict
                
                if ai_score > max_prob:
                    max_prob = ai_score
            
            frame_prob = max_prob
            accumulated_probability += max_prob
            
            if frame_prob > 0.5:
                fake_frames_count += 1
                frame_verdict = "Fake"
        
        frame_results.append({
            "timestamp": frame_meta["timestamp"],
            "verdict": frame_verdict,
            "probability": frame_prob
        })

    # 3. Aggregate Results
    if len(frames_metadata) > 0:
        avg_probability = (accumulated_probability / len(frames_metadata)) * 100 # Convert to percentage
    else:
        avg_probability = 0
        
    final_verdict = "Real"
    if avg_probability > 50:
         final_verdict = "Fake"

    # Generate Report
    report = {
        "id": scan_id,
        "status": "Completed",
        "result": final_verdict, 
        "probability": round(avg_probability, 2),
        "frames_analyzed": len(frames_metadata),
        "faces_detected": total_faces_analyzed,
        "details": f"Analysis complete. Found {fake_frames_count} suspicious frames.",
        "frame_data": frame_results # Useful for timeline
    }
    
    report_path = os.path.join(scan_dir, "report.json")
    with open(report_path, "w") as f:
        json.dump(report, f, indent=4)
        
    print(f"Processing finished for {scan_id}")
