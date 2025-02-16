# Roomy
A web app to help find your new roommate
# Requirements
To run this project, you will need the following
- Python
- React
- Node.js
- imports from requirements.txt
- imports from npm node modules
- API key from Apify
- API key from Mapbox stored in .env file
- URL stored in .env file
# How to Setup the backend
Clone the repository
Create a virtual env called macEnv or winEnv
```
#for windows
python -m venv winEnv
#for mac
python3 -m venv macEnv
```
activate your virtual environment
```
#for windows
source winEnv/Scripts/activate
#for mac
source macEnv/bin/activate
```
pip install the requirements in requirements.txt
```
pip install -r requirements.txt
```
run the server for the backend
```
#for windows
python backend/server.py
#for mac
python3 backend/server.py
```
# Setting up the database
Open db.py and uncomment create_table() call
run the db.py file
```
python backend/db.py
```
comment or remove the create_table()
# Setting up the Frontend
cd into the client
run the command
```
npm install --force
```
run the client using:
```
npm start
```
