import os

class Settings:
    PROJECT_NAME: str = "Sentinel AI - Deepfake Detection Backend"
    API_V1_STR: str = "/api"
    
    # Storage Paths
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    STORAGE_DIR = os.path.join(BASE_DIR, "storage")
    
    # Ensure storage directory exists
    os.makedirs(STORAGE_DIR, exist_ok=True)

settings = Settings()
