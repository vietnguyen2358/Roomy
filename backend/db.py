import sqlite3

con = sqlite3.connect("database.db")
cur = con.cursor()

class User:
    def __init__(self, UUID, firstName, lastName, email, password):
        self.UUID = UUID
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.password = password

def create_table():
    cur.executescript("""
                      BEGIN;
                      CREATE TABLE IF NOT EXISTS Users(UUID TEXT PRIMARY KEY UNIQUE,
                                                    FIRST_NAME TEXT,
                                                    LAST_NAME TEXT,
                                                    EMAIL TEXT,
                                                    PASSWORD TEXT);
                      CREATE TABLE Groups(UUID TEXT PRIMARY KEY UNIQUE,
                                         LINK TEXT,
                                         IMAGES TEXT,
                                         BEDCOUNT INTEGER,
                                         BATHCOUNT INTEGER,
                                         RENT FLOAT,
                                         ADDRESS TEXT,
                                         SQUAREFOOTAGE INTEGER,
                                         FOREIGN KEY (USERS) REFERENCES Users(UUID));   
                      COMMIT;    
    """)

# creates new user 
def insert_user(file,user):
    cur.execute("""
                INSERT INTO Users VALUES
                    (UUID,
                    First,
                    Last,
                    Email,
                    Password)
""")
    
# creates a new apt listing    
def add_group(file,group):
    cur.execute("""
                INSERT INTO Groups VALUES
                    (UUID, 
                    USERS, 
                    LINK,
                    IMAGES,
                    BEDCOUNT,
                    BATHCOUNT,
                    RENT,
                    ADDRESS,
                    SQUAREFOOTAGE);
    """)
    
# add the user into the apt group    
def insert_user_group(file, user):
    cur.execute("""
                INSERT INTO Groups VALUES
                    (USERS);            
""")

# update the values of apt
def update_group(file,group):
    cur.execute("""
                UPDATE Groups
                SET (UUID = UUID OR newUUID, 
                    USERS = USERS OR newUSERS, 
                    LINK = LINK OR newLINK,
                    IMAGES = IMAGES OR newIMAGES,
                    BEDCOUNT = BEDCOUNT OR newBEDCOUNT,
                    BATHCOUNT = BATHCOUNT OR newBATHCOUNT,
                    RENT = RENT OR newRENT,
                    ADDRESS = ADDRESS OR newADDRESS,
                    SQUAREFOOTAGE = SQUAREFOOTAGE OR newSQUAREFOOTAGE);
""")
    
#get all apts
def fetch_all_groups():
    return cur.execute("""SELECT * FROM Groups;""")

# remove the apt listing
def remove_group(file,ID):
    cur.execute("""
                DELETE FROM Groups
                WHERE UUID = ID;
""")

    
# create_table()