from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
import uuid 
from constants import APIFYKEY
from apify_client import ApifyClient
from db import User, insert_user, verify, User, print_user, Group, add_group

class Req (BaseModel):
    id: str = None
    firstName: str = None
    lastName: str = None
    password: str = None
    email: str = None
    zillowLink: str = None
    groupLists: str = None
    imagesUrls: str = None
    rent: float = None
    bedCount: int = None
    bathCount: int = None
    address: str = None


app = FastAPI()
@app.get("/")
async def testPage():
    return {"message": "testServer"}

@app.post("/addUser") 
async def addUser(request : Req):
    request.id = uuid.uuid4()
    print(request.id)
    print(request.firstName)
    print(request.lastName)
    print(request.password)
    print(request.email)
    userObject = User(UUID = request.id, firstName = request.firstName, lastName = request.lastName, email = request.email, password = request.password)
    userObject.insert_user(getDBFile(), userObject)
    insert_user(getDBFile(), userObject)
    print_user(userObject)
    return {"Success": True}

@app.get("/verifyUser")
async def verifyUser():
    return {"Success" : verify(file, email, password)}

@app.get("/ZillowInfo")
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
            "imagesUrls": data["desktopWebHdpImageLink"]}

def getDBFile():
    return "database.db"

if __name__ == "__main__":
    uvicorn.run('server:app', port=8000, reload=True)