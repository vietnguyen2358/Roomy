import sqlite3
import tabulate

class User:
    def __init__(self, UUID, firstName, lastName, email, password):
        self.UUID = UUID
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.password = password

class Group:
    def __init__(self, UUID, userIDs, link, images, bedCount, bathCount, rent, address, sqFt):
        self.UUID = UUID
        self.userIDs = userIDs
        self.link = link
        self.images = images
        self.bedCount = bedCount
        self.bathCount = bathCount
        self.rent = rent
        self.address = address
        self.sqFt = sqFt

def print_user(user):
    headers = ["UUID", "First Name", "Last Name", "Email", "Password"]
    user_data = fetch_user("database.db", user)

    print(tabulate(user_data, headers=headers, tablefmt="grid"))

def create_table():
    try:
        con = sqlite3.connect("database.db")
        cur = con.cursor()
        cur.executescript("""
                    BEGIN;
                    CREATE TABLE IF NOT EXISTS Users(UUID TEXT PRIMARY KEY UNIQUE NOT NULL,
                                                    FIRST_NAME TEXT NOT NULL,
                                                    LAST_NAME TEXT NOT NULL,
                                                    EMAIL TEXT UNIQUE NOT NULL,
                                                    PASSWORD TEXT NOT NULL);
                    CREATE TABLE IF NOT EXISTS Groups(UUID TEXT PRIMARY KEY UNIQUE NOT NULL,
                                                    LINK TEXT NOT NULL,
                                                    IMAGES TEXT NOT NULL,
                                                    BEDCOUNT INTEGER NOT NULL,
                                                    BATHCOUNT INTEGER NOT NULL,
                                                    RENT FLOAT NOT NULL,
                                                    ADDRESS TEXT NOT NULL,
                                                    SQUAREFOOTAGE INTEGER NOT NULL,
                                                    USER_UUIDS TEXT NOT NULL);
                    COMMIT;    
        """)
    except sqlite3.Error as e:
        print(f"Table Creation Error: {e}")
    finally:
        con.close()

# creates new user 
def insert_user(file, user):
    try:
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
    except sqlite3.Error as e:
        print(f"Table Insertion Error: {e}")
    finally:
        con.close()
    
# creates a new apt listing
def add_group(file, group):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""
                INSERT INTO Groups VALUES
                    (UUID, 
                    LINK,
                    IMAGES,
                    BEDCOUNT,
                    BATHCOUNT,
                    RENT,
                    ADDRESS,
                    SQUAREFOOTAGE,
                    USERS)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (group.UUID, group.link, group.images, group.bedCount,group.bathCount ,group.rent ,group.address, group.sqFt, group.userIDs))
    except sqlite3.Error as e:
        print(f"Group Insertion Error: {e}")
    finally:
        con.close()
    
# add the user into the apt group    
def insert_user_group(file, user):
    con = sqlite3.connect(file)
    cur = con.cursor()
    cur.execute("""
                INSERT INTO Groups VALUES
                    (USERS)
                VALUES(?);            
                """,
                (user.users))

# update the values of apt
def update_group(file,group):
    try: 
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""
                UPDATE Groups
                SET 
                    UUID = ?,  
                    LINK = ?, 
                    IMAGES = ?, 
                    BEDCOUNT = ?, 
                    BATHCOUNT = ?, 
                    RENT = ?, 
                    ADDRESS = ?, 
                    SQUAREFOOTAGE = ?,
                    USERS = ?
            WHERE UUID = ?
                """,
                (group.UUID, group.link, group.images, group.bedCount, group.bathCount, group.rent, group.adress, group.sqFt, group.userIDs, group.UUID))
    except sqlite3.Error as e:
        print(f"Update Group Error: {e}")
    finally:
        con.close()
    
# get all apts
def fetch_all_groups(file):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""SELECT * FROM Groups;""")
        return cur.fetchall()
    except sqlite3.Error as e:
        print(f"Fetching All Group Error: {e}")
    finally:
        con.close()

# get all users
def fetch_user(file, user):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""
                SELECT * FROM Users
                WHERE UUID = ?;
            """, 
            (user.UUID))
        return cur.fetchall()
    except sqlite3.Error as e:
        print(f"Fetch User Error: {e}")
    finally:
        con.close()

def verify(file, email, password):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""
                    """)

    except sqlite3.Error as e:
        print(f"User Verification Error: {e}")
    finally:
        con.close()

# # get all groups the user is in
# def fetch_user_groups(file, user, group):
#     con = sqlite3.connect(file)
#     cur = con.cursor()
#     cur.execute("""
#                 SELECT * FROM Groups
#                 WHERE ? = ?
#                 """,
#                 (user.UUID, group.users))

# remove the apt listing
def remove_group(file, user):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""
                DELETE FROM Groups
                WHERE UUID = ?;
                """,
                (user.UUID))
    except sqlite3.Error as e:
        print(f"Remove Group Error: {e}")
    finally:
        con.close()
    
# create_table()