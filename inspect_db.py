import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from backend.core.config import settings

async def inspect():
    print(f"Connecting to {settings.MONGO_URI}...")
    client = AsyncIOMotorClient(settings.MONGO_URI)
    db = client[settings.MONGO_DB_NAME]
    
    print("Fetching last 5 scans...")
    cursor = db.scans.find({}).sort("created_at", -1).limit(5)
    documents = await cursor.to_list(length=5)
    
    for i, doc in enumerate(documents):
        print(f"\n--- Doc {i+1} ---")
        print(f"Keys: {list(doc.keys())}")
        print(f"scan_id: {doc.get('scan_id')}")
        print(f"file_name: {doc.get('file_name')}")
        print(f"created_at: {doc.get('created_at')} (Type: {type(doc.get('created_at'))})")
        print(f"verdict: {doc.get('verdict')}")

    print("\nCheck finished.")
    client.close()

if __name__ == "__main__":
    asyncio.run(inspect())
