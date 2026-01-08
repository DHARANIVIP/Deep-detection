import os

# 1. BASE DIRECTORY LOGIC
# This finds the absolute path of your 'backend' folder
# It ensures the code works on Windows, Mac, or Linux without changes.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 2. STORAGE PATHS
# We centralize these so all services (AI, Video, Report) use the same folders.
UPLOAD_FOLDER = os.path.join(BASE_DIR, "storage", "uploads")
PROCESSED_FOLDER = os.path.join(BASE_DIR, "storage", "processed")
RESULTS_FOLDER = os.path.join(BASE_DIR, "storage", "results")

# 3. SECURITY & VALIDATION
ALLOWED_EXTENSIONS = {"mp4", "avi", "mov"}

# 4. AI MODEL SETTINGS
# Changing the model later? Just change this string here.
MODEL_NAME = "prithivMLmods/Deep-Fake-Detector-v2-Model"

# 5. AUTOMATIC DIRECTORY CREATION
# This part is 'Zero-Config'—it creates the folders if they don't exist.
def initialize_folders():
    folders = [UPLOAD_FOLDER, PROCESSED_FOLDER, RESULTS_FOLDER]
    for folder in folders:
        if not os.path.exists(folder):
            os.makedirs(folder, exist_ok=True)
            print(f"Created directory: {folder}")

# Run initialization immediately when this file is imported
initialize_folders()