from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
import uuid 
from constants import APIFYKEY
from apify_client import ApifyClient
from db import User, insert_user, verify, User, print_user, Group, fetch_group, fetch_all_groups, add_group, update_group, remove_group, remove_user_from_group, get_group_by_url
from fastapi.middleware.cors import CORSMiddleware


class Req (BaseModel):
    id: str = None
    groupID: str = None
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
    longitude: float = None
    latitude: float = None


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
    return {"uid": request.id}

@app.post("/verifyUser")
async def verifyUser(request : Req):
    return {"Success" : verify(getDBFile(), request.email, request.password)}

@app.post("/ZillowInfo")
async def getZillowInfo(request: Req):
    
    info = get_group_by_url(getDBFile(), request.zillowLink)
    if info is not None:
        return {"address": info[6], 
            "bedCount": info[3], 
            "bathCount": info[4], 
            "rent": info[5], 
            "price": 0,
            "imagesUrls": info[2],
            "latitude": info[8],
            "longitude": info[7],}
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

@app.get("/fetchGroup")
async def getGroup(request : Req):
    return {"data":fetch_group(getDBFile(), request.groupID)}

@app.get("/fetchAllGroup")
async def getAllGroup():
    return {"data":fetch_all_groups(getDBFile())}

@app.post("/addGroup")
async def addGroup(request : Req):
    request.groupID = str(uuid.uuid4())
    groupObject = Group(UUID = request.groupID, 
                        userIDs = request.id, 
                        link = request.zillowLink,  
                        images = request.imagesUrls, 
                        bedCount = request.bedCount, 
                        bathCount = request.bathCount, 
                        rent = request.rent, 
                        address = request.address,
                        longitude = request.longitude,
                        latitude = request.latitude)
    add_group(getDBFile(), groupObject)
    return {"Success": True}

@app.put("/updateGroup")
async def updateGroup(request : Req):
    groupObject = Group(UUID = request.groupID, 
                        userIDs = request.userLists, 
                        link = request.zillowLink, 
                        images = request.imagesUrls, 
                        bedCount = request.bedCount, 
                        bathCount = request.bathCount, 
                        rent = request.rent, 
                        address = request.address,
                        longitude = request.longitude,
                        latitude = request.latitude)
    update_group(getDBFile(), groupObject)
    return {"Success": True}

@app.delete("/deleteGroup")
async def deleteGroup(request : Req):
    remove_group(getDBFile(), request.groupID)
    return {"Success": True}

@app.delete("/deleteUserFromGroup")
async def deleteUserFromGroup(request : Req):
    remove_user_from_group(getDBFile(), request.groupID, request.id)
    return {"Success": True}

def getDBFile():
    return "database.db"

if __name__ == "__main__":
    uvicorn.run('server:app', port=8000, reload=True)