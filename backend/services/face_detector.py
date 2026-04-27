import logging
import cv2
import numpy as np
from loguru import logger

# Initialize OpenCV Haar Cascade for face detection
try:
    haar_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    if haar_cascade.empty():
        raise Exception("Failed to load Haar Cascade classifier")
    logger.info("OpenCV Haar Cascade face detector initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize face detector: {e}")
    haar_cascade = None

# Max width for detection pass — Haar Cascade doesn't need full-res
_DETECT_MAX_WIDTH = 480

def crop_face_advanced(frame):
    """
    Detects face using OpenCV Haar Cascade and returns the cropped numpy array.
    Optimized: downscales large frames before detection, then maps coords back.
    Returns: (cropped_face, status_boolean)
    """
    if haar_cascade is None:
        logger.warning("Face detector not initialized, returning original frame")
        return None, True

    try:
        height, width = frame.shape[:2]

        # --- SPEED: Downscale large frames before detection ---
        if width > _DETECT_MAX_WIDTH:
            scale = _DETECT_MAX_WIDTH / width
            small = cv2.resize(frame, (int(width * scale), int(height * scale)))
        else:
            scale = 1.0
            small = frame

        gray = cv2.cvtColor(small, cv2.COLOR_BGR2GRAY)

        # scaleFactor=1.2 → fewer pyramid levels → faster
        # minNeighbors=5  → stricter = fewer false positives = faster NMS
        faces = haar_cascade.detectMultiScale(
            gray,
            scaleFactor=1.2,
            minNeighbors=5,
            minSize=(30, 30),
            flags=cv2.CASCADE_SCALE_IMAGE
        )

        if len(faces) > 0:
            # Map coordinates back to original resolution
            (x, y, w, h) = faces[0]
            if scale != 1.0:
                x, y, w, h = int(x / scale), int(y / scale), int(w / scale), int(h / scale)

            # Add 20% padding to capture chin/forehead artifacts
            x_pad, y_pad = int(w * 0.2), int(h * 0.2)
            x1 = max(0, x - x_pad)
            y1 = max(0, y - y_pad)
            x2 = min(width, x + w + x_pad)
            y2 = min(height, y + h + y_pad)

            cropped_face = frame[y1:y2, x1:x2]

            if cropped_face is not None and cropped_face.size > 0:
                logger.info(f"Face detected at ({x}, {y}, {w}, {h})")
                return cropped_face, True
            else:
                logger.warning("Detected face region is empty")
                return None, False

        logger.debug("No face detected in frame")
        return None, False

    except Exception as e:
        logger.error(f"Face detection failed: {e}")
        return None, False