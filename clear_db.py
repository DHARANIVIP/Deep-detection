import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from backend.core.config import settings
from loguru import logger

async def clear_database():
    print(f"Connecting to {settings.MONGO_URI}...")
    client = AsyncIOMotorClient(settings.MONGO_URI)
    db = client[settings.MONGO_DB_NAME]
    
    # Count before deletion
    count = await db.scans.count_documents({})
    print(f"Found {count} documents in 'scans' collection.")
    
    if count > 0:
        result = await db.scans.delete_many({})
        print(f"Deleted {result.deleted_count} documents.")
    else:
        print("Collection is already empty.")

    client.close()

if __name__ == "__main__":
    asyncio.run(clear_database())
