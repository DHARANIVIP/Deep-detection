# Deep Detection - Deepfake Detection System

A comprehensive deepfake detection system powered by AI and mathematical analysis.

## Features

- 🤖 **AI-Powered Detection**: Uses HuggingFace Deep-Fake-Detector-v2-Model
- 📊 **Mathematical Analysis**: FFT-based frequency domain analysis
- 🎥 **Video Processing**: Supports MP4, AVI, MOV, MKV formats
- 📁 **Organized Storage**: Scan-based folder structure
- 📈 **Detailed Reports**: Comprehensive forensic analysis reports
- 🔍 **Frame-by-Frame Analysis**: Thumbnail generation and analysis

## Setup

### 1. Install Dependencies

```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Install frontend dependencies
npm install
```

### 2. Configure Environment Variables

Create a `backend/.env` file based on `.env.example`:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and add your credentials:

```env
MONGO_URI=your_mongodb_connection_string
MONGO_DB_NAME=sentinel_ai
HF_TOKEN=your_huggingface_token
```

**Getting your HuggingFace Token:**
1. Go to https://huggingface.co/settings/tokens
2. Create a new token (read access is sufficient)
3. Copy and paste it into your `.env` file

### 3. Build Frontend

```bash
npm run build
```


### 4. Run the Application

```bash
# Windows
.\run_app.bat

# Linux/Mac
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

The application will be available at http://localhost:8000

## 🚀 Deployment & Public Access

This project is configured as a unified application where FastAPI serves the React frontend.

### Option 1: Run Locally (Production Mode)

1. **Build the Frontend:**
   ```bash
   npm install
   npm run build
   ```
   This creates a `dist/` folder with the optimized React app.

2. **Configure Environment:** Ensure your `backend/.env` file is set up with `MONGO_URI` and `HF_TOKEN`.

3. **Start the Server:**
   ```bash
   python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
   ```
   Visit http://localhost:8000.



## Project Structure

```
Deep-detection/
├── backend/
│   ├── core/           # Configuration and database
│   ├── services/       # AI detection, video processing, storage
│   └── main.py         # FastAPI application
├── pages/              # React frontend pages
├── utils/              # Utility functions
├── storage/
│   └── scans/          # Scan-based storage (video, thumbnails, etc.)
└── dist/               # Built frontend assets
```

## Storage Organization

Files are organized by scan ID:
```
storage/scans/{scan_id}/
├── video.{ext}         # Original uploaded video
├── thumbnails/         # Generated thumbnails
└── processed/          # Temporary processed frames (cleaned after analysis)
```

## Development

### Frontend Development

```bash
npm run dev  # Run Vite dev server
```

### Backend Development

The backend auto-reloads when files change (using `--reload` flag).

## Technologies

- **Backend**: FastAPI, Python
- **Frontend**: React, TypeScript, Vite
- **AI**: HuggingFace Transformers, PyTorch
- **Database**: MongoDB
- **Video Processing**: OpenCV, FFmpeg

## License

MIT
