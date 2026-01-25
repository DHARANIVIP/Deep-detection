# Deployment Checklist

## Issue: Upload Error on Cloud

### Root Cause
The frontend was using hardcoded `http://localhost:8000` URLs which don't work in production.

### Fix Applied
✅ Updated all API calls to use relative paths (`/api/...`)
✅ Added Vite proxy for local development
✅ Improved error messages to show actual backend errors

### Steps to Deploy Fix

1. **Commit Changes** (if not already done):
   ```bash
   git add .
   git commit -m "Fix: Use relative paths for API calls"
   ```

2. **Push to GitHub**:
   ```bash
   git push origin main
   ```

3. **Wait for Auto-Deploy**:
   - Railway/Render will automatically detect the push
   - Wait 2-5 minutes for the build to complete
   - Check the deployment logs for any errors

4. **Test the Fix**:
   - Visit your deployed URL
   - Try uploading a video
   - If error persists, check browser console (F12) for detailed error message

### Common Issues

**If upload still fails:**
- Check Railway/Render logs for backend errors
- Verify environment variables are set (`MONGO_URI`, `HF_TOKEN`)
- Ensure storage directory permissions are correct

**If you see "Invalid file format":**
- Check that your video is in a supported format (MP4, AVI, MOV, MKV)
- Check that images are in supported formats (JPG, PNG, WEBP)
