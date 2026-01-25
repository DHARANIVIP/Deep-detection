---
description: Build and Run Monolithic Deployment (React + FastAPI)
---

This workflow builds the frontend and starts the backend server to serve the complete application.

1. Install Frontend Dependencies
```bash
npm install
```

2. Build Frontend
```bash
npm run build
```

3. Verify Build
   - Check if `dist/` folder exists in the project root.

4. Run Production Server
```bash
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

5. (Optional) Public Access
   - Open a new terminal and run:
   ```bash
   ngrok http 8000
   ```
