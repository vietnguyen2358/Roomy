from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
import uuid 
from constants import APIFYKEY
from apify_client import ApifyClient
from db import User, insert_user, verify, User, print_user

class Req (BaseModel):
    id: str = None
    firstName: str = None
    lastName: str = None
    password: str = None
    email: str = None
    groupLists: str = None
    imagesUrls: str = None
    rent: float = None
    bedCount: int = None
    bathCount: int = None
    squareFootage: int = None
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
    pass

@app.get("/verifyUser")
async def verifyUser():
    return verify(file, email, password)

@app.get("/ZillowInfo")
async def getZillowInfo():
    client = ApifyClient(APIFYKEY)

def getDBFile():
    return "database.db"

if __name__ == "__main__":
    uvicorn.run('server:app', port=8000, reload=True)