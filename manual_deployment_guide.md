

## 2. Build the Website
This bundles your React code so Python can serve it.

1.  Open a terminal in `Deep-detection`.
2.  Run:
    ```powershell
    npm run build
    ```
3.  Check: You should see a `dist` folder created.

## 3. Run the Server
Start the backend (which now also serves the frontend).

1.  In the same terminal, run:
    ```powershell
    python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
    ```
2.  **Keep this terminal open.** (If you close it, the site goes down).


