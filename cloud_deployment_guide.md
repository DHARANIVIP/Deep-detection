# Cloud Deployment Guide (Railway)

This guide explains how to deploy your project to **Railway**, a cloud platform that supports Docker automatically. It works perfectly with the "Monolithic" setup we created.

## Prerequisites
1.  **GitHub Account**: You must have your project pushed to a GitHub repository.
2.  **Railway Account**: Sign up at [railway.app](https://railway.app/) (Github login recommended).

## Step 1: Push to GitHub
If you haven't already, push your latest code (including the new `Dockerfile`) to GitHub.

```bash
git add .
git commit -m "Add Dockerfile for deployment"
git push origin main
```

## Step 2: Create Project on Railway
1.  Go to your **Railway Dashboard**.
2.  Click **"New Project"**.
3.  Select **"Deploy from GitHub repo"**.
4.  Choose your repository (`Deep-detection`).
5.  Click **"Deploy Now"**.

## Step 3: Configuration (Important!)
Railway will automatically detect the `Dockerfile` and start building. However, you need to add your Environment Variables.

1.  Click on the project card in the dashboard.
2.  Go to the **"Variables"** tab.
3.  Add the same variables from your `.env` file:
    *   `MONGO_URI`: (Your MongoDB connection string)
    *   `MONGO_DB_NAME`: `sentinel_ai`
    *   `HF_TOKEN`: (Your HuggingFace Token)
    *   `PORT`: `8000` (Optional, Railway usually handles this, but good to set)

## Step 4: Verify Deployment
1.  Go to the **"Settings"** tab.
2.  Under **"Networking"**, click **"Generate Domain"**.
3.  Railway will verify your deployment and give you a public URL (e.g., `https://deep-detection-production.up.railway.app`).
4.  Click the link to visit your live website.

## Troubleshooting
*   **Build Fails?** Check the "Deploy Logs". If it says something about missing memory, Railway usually gives plenty for free, but video processing can be heavy.
*   **OpenCV Error?** The Dockerfile installs `libgl1` to support OpenCV. If you see `ImportError: libGL.so.1`, this is already fixed in our Dockerfile.
