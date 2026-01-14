import requests
import json

# Test the /api/scans endpoint
print("Testing /api/scans endpoint...")
print("=" * 50)

try:
    response = requests.get("http://localhost:8000/api/scans")
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        scans = response.json()
        print(f"\nTotal Scans Found: {len(scans)}")
        print("\nScan Details:")
        print("-" * 50)
        
        for i, scan in enumerate(scans, 1):
            print(f"\nScan #{i}:")
            print(f"  Scan ID: {scan.get('scan_id', 'N/A')}")
            print(f"  File Name: {scan.get('file_name', 'N/A')}")
            print(f"  Verdict: {scan.get('verdict', 'N/A')}")
            print(f"  Confidence: {scan.get('confidence_score', 'N/A')}%")
            print(f"  Created At: {scan.get('created_at', 'N/A')}")
            
        if len(scans) == 0:
            print("\n⚠️  No scans found in database!")
            print("The Recent Scans and History pages will show 'No scans found'")
        else:
            print(f"\n✅ Found {len(scans)} scan(s) in database")
            print("The Recent Scans section will show up to 5 most recent scans")
            print("The History page will show all scans")
    else:
        print(f"❌ Error: Received status code {response.status_code}")
        
except Exception as e:
    print(f"❌ Error connecting to API: {e}")
    print("Make sure the server is running on http://localhost:8000")
