from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
import uuid 
from constants import APIFYKEY
from apify_client import ApifyClient
from db import User, insert_user, verify, User, print_user, Group, add_group
from fastapi.middleware.cors import CORSMiddleware


class Req (BaseModel):
    id: str = None
    firstName: str = None
    lastName: str = None
    password: str = None
    email: str = None
    zillowLink: str = None
    userLists: str = None
    imagesUrls: str = None
    rent: float = None
    bedCount: int = None
    bathCount: int = None
    address: str = None


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def testPage():
    return {"message": "testServer"}

@app.post("/addUser") 
async def addUser(request : Req):
    request.id = str(uuid.uuid4())
    userObject = User(UUID = request.id, firstName = request.firstName, lastName = request.lastName, email = request.email, password = request.password)
    insert_user(getDBFile(), userObject)
    print_user(getDBFile(), userObject)
    return {"Success": True}

@app.post("/verifyUser")
async def verifyUser(request : Req):
    return {"Success" : verify(getDBFile(), request.email, request.password)}

@app.post("/ZillowInfo")
async def getZillowInfo(request: Req):
    client = ApifyClient(APIFYKEY)
    url = request.zillowLink
    run_input = {
        "startUrls": [
            { "url": url },
        ],
        
    }

    run = client.actor("ENK9p4RZHg0iVso52").call(run_input=run_input)
    data = client.dataset(run["defaultDatasetId"]).list_items().items[0]
    #return data
    return {"address": data["streetAddress"], 
            "bedCount": data["bedrooms"], 
            "bathCount": data["bathrooms"], 
            "rent": data["rentZestimate"], 
            "price": data["price"],
            "imagesUrls": data["desktopWebHdpImageLink"],
            "latitude": data["latitude"],
            "longitude": data["longitude"],}

@app.post("/addGroup")
async def addUser(request : Req):
    request.id = str(uuid.uuid4())
    groupObject = Group(UUID = request.id, userIDs = request.userLists, link = request.zillowLink, images = request.imagesUrls, bedCount = request.bedCount, bathCount = request.bathCount, rent = request.rent, address = request.address)
    add_group(getDBFile(), groupObject)
    return {"Success": True}

@app.post("/")

def getDBFile():
    return "database.db"

if __name__ == "__main__":
    uvicorn.run('server:app', port=8000, reload=True)