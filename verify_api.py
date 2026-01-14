import requests
import time

BASE_URL = "http://localhost:8000"

def test_api():
    print(f"Checking {BASE_URL}...")
    try:
        # 1. Check Root
        r = requests.get(f"{BASE_URL}/")
        print(f"Root Status: {r.status_code}")
        
        # 2. Check Scans (should be empty initially or have data)
        r = requests.get(f"{BASE_URL}/api/scans")
        print(f"Scans Status: {r.status_code}")
        data = r.json()
        print(f"Scans Count: {len(data)}")
        
        # 3. Simulate Upload (need a dummy file)
        # Create dummy file
        with open("test_video.mp4", "wb") as f:
            f.write(b"dummy video content")
            
        files = {'file': ('test_video.mp4', open('test_video.mp4', 'rb'), 'video/mp4')}
        r = requests.post(f"{BASE_URL}/api/analyze", files=files)
        print(f"Upload Status: {r.status_code}")
        if r.status_code == 200:
            scan_id = r.json()['scan_id']
            print(f"Uploaded Scan ID: {scan_id}")
            
            # Wait a bit for background processing (mock mode is fast)
            time.sleep(2)
            
            # 4. Check Scans again (should have 1 more)
            r = requests.get(f"{BASE_URL}/api/scans")
            data = r.json()
            print(f"Scans Count after upload: {len(data)}")
            if len(data) > 0:
                print(f"First scan filename: {data[0].get('file_name', 'MISSING')}")
        
    except Exception as e:
        print(f"Test Failed: {e}")

if __name__ == "__main__":
    test_api()
