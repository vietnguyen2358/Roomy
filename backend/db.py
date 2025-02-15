import sqlite3



class User:
    def __init__(self, UUID, firstName, lastName, email, password):
        self.UUID = UUID
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.password = password

class Group:
    def __init__(self, UUID, users, link, images, bedCount, bathCount, rent, address, sqFt):
        self.UUID = UUID
        self.users = users
        self.link = link
        self.images = images
        self.bedCount = bedCount
        self.bathCount = bathCount
        self.rent = rent
        self.address = address
        self.sqFt = sqFt

def create_table():
    con = sqlite3.connect("database.db")
    cur = con.cursor()
    cur.executescript("""
                      BEGIN;
                      CREATE TABLE IF NOT EXISTS Users(UUID TEXT PRIMARY KEY UNIQUE,
                                                    FIRST_NAME TEXT,
                                                    LAST_NAME TEXT,
                                                    EMAIL TEXT,
                                                    PASSWORD TEXT);
                      CREATE TABLE IF NOT EXISTS Groups(UUID TEXT PRIMARY KEY UNIQUE,
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
def insert_user(file, user):
    con = sqlite3.connect(file)
    cur = con.cursor()
    cur.execute("""
                INSERT INTO Users VALUES
                    (UUID,
                    First,
                    Last,
                    Email,
                    Password)
                VALUES (?, ?, ?, ?, ?)
                """,
                (user.UUID, user.firstName, user.lastName, user.email, user.password))
    
# creates a new apt listing
def add_group(file,group):
    con = sqlite3.connect(file)
    cur = con.cursor()
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
                    SQUAREFOOTAGE)
                VALUES (?,?,?,?,?,?,?,?,?)
                """,
                (group.UUID, group.USERS, group.LINK, group.IMAGES, group.BEDCOUNT,group.BATHCOUNT ,group.RENT ,group.ADDRESS, group.SQUAREFOOTAGE))
    
# add the user into the apt group    
def insert_user_group(file, user):
    con = sqlite3.connect(file)
    cur = con.cursor()
    cur.execute("""
                INSERT INTO Groups VALUES
                    (USERS);            
                """)

# update the values of apt
def update_group(file,group):
    con = sqlite3.connect(file)
    cur = con.cursor()
    cur.execute("""
                UPDATE Groups
                SET 
                UUID = ?, 
                USERS = ?, 
                LINK = ?, 
                IMAGES = ?, 
                BEDCOUNT = ?, 
                BATHCOUNT = ?, 
                RENT = ?, 
                ADDRESS = ?, 
                SQUAREFOOTAGE = ?
            WHERE UUID = ?
                """,
                (group.UUID, group.USERS, group.LINK, group.IMAGES, group.BEDCOUNT, group.BATHCOUNT, group.RENT, group.ADDRESS, group.SQUAREFOOTAGE, group.UUID))
    
#get all apts
def fetch_all_groups(file):
    con = sqlite3.connect(file)
    cur = con.cursor()
    return cur.execute("""SELECT * FROM Groups;""")

def fetch_user(file,user):
    con = sqlite3.connect(file)
    cur = con.cursor()
    cur.execute("""
                (SELECT * FROM Users
                WHERE UUID = ?);
                """,
                (user.UUID))

# remove the apt listing
def remove_group(file, user):
    con = sqlite3.connect(file)
    cur = con.cursor()
    cur.execute("""
                DELETE FROM Groups
                WHERE UUID = ?;
                """,
                (user.UUID))

    
# create_table()