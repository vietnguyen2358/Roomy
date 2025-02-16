import sqlite3
from tabulate import tabulate

class User:
    def __init__(self, UUID, firstName, lastName, email, password):
        self.UUID = UUID
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.password = password

class Group:
    def __init__(self, UUID, userIDs, link, images, bedCount, bathCount, rent, address, longitude, latitude):
        self.UUID = UUID
        self.userIDs = userIDs
        self.link = link
        self.images = images
        self.bedCount = bedCount
        self.bathCount = bathCount
        self.rent = rent
        self.address = address
        self.longitude = longitude
        self.latitude = latitude

def print_user(file, user):
    headers = ["UUID", "First Name", "Last Name", "Email", "Password"]
    user_data = fetch_user(file, user)
    print(tabulate(user_data, headers=headers, tablefmt="grid"))

def fetch_all_users(file):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""SELECT * FROM Users;""")
        return cur.fetchall()
    except sqlite3.Error as e:
        print(f"Fetching All Users Error: {e}")
    finally:
        con.close()

def print_all_users(file):
    headers = ["UUID", "First Name", "Last Name", "Email", "Password"]
    users_data = fetch_all_users(file)
    print(tabulate(users_data, headers=headers, tablefmt="grid"))

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
                                                    LONGITUDE FLOAT NOT NULL,
                                                    LATITUDE FLOAT NOT NULL,
                                                    USER_UUIDS TEXT NOT NULL);
                    COMMIT;    
        """)
    except sqlite3.Error as e:
        print(f"Table Creation Error: {e}")
    finally:
        con.close()

# Uncomment this line to create a db, comment out afterward
# create_table()

# creates new user 
def insert_user(file, user):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""
                INSERT INTO Users
                    (UUID,
                    FIRST_NAME,
                    LAST_NAME,
                    EMAIL,
                    PASSWORD)
                VALUES (?, ?, ?, ?, ?)
                """,
                (user.UUID, user.firstName, user.lastName, user.email, user.password))
        con.commit()
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
                INSERT INTO Groups
                    (UUID, 
                    LINK,
                    IMAGES,
                    BEDCOUNT,
                    BATHCOUNT,
                    RENT,
                    ADDRESS,
                    LONGITUDE,
                    LATITUDE,
                    USER_UUIDS)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (group.UUID,
                 group.link,
                 group.images,
                 group.bedCount,
                 group.bathCount,
                 group.rent,
                 group.address,
                 group.longitude,
                 group.latitude,
                 group.userIDs))
        con.commit()
    except sqlite3.Error as e:
        print(f"Group Insertion Error: {e}")
    finally:
        con.close()
  
# add the user into the apt group    
def insert_user_group(file, user, group):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""
                SELECT USER_UUIDS FROM Groups
                    WHERE UUID = ?         
                """,
                (group.UUID,))
        userIDs = cur.fetchone().split(',')

        userIDs.append(user.UUID)
        cur.execute("""
                UPDATE Groups
                SET USER_UUIDS = ?
                WHERE UUID = ?;
                """,
                (','.join(userIDs), group.UUID))
        con.commit()
    except sqlite3.Error as e:
        print(f"Group Insertion Error: {e}")
    finally:
        con.close()

# update the values of apt
def update_group(file, group):
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
                    LONGITUDE = ?,
                    LATITUDE = ?,
                    USER_UUIDS = ?
            WHERE UUID = ?
                """,
                (group.UUID,
                 group.link,
                 group.images,
                 group.bedCount,
                 group.bathCount,
                 group.rent,
                 group.address,
                 group.longitude,
                 group.latitude,
                 group.userIDs,
                 group.UUID))
    except sqlite3.Error as e:
        print(f"Update Group Error: {e}")
    finally:
        con.close()

def fetch_group(file, groupUUID):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""SELECT * FROM Groups
                        WHERE UUID = ?
                    """,
                    (groupUUID,))
        data = cur.fetchone()
    except sqlite3.Error as e:
        print(f"Fetching All Group Error: {e}")
        data = []
    finally:
        con.close()
    return data

# get all apts
def fetch_all_groups(file):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""SELECT * FROM Groups""")
        data = cur.fetchall()
    except sqlite3.Error as e:
        print(f"Fetching All Group Error: {e}")
        data = []
    finally:
        con.close()
    return data

# get all users
def fetch_user(file, user):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""
                SELECT * FROM Users
                WHERE UUID = ?;
            """, 
            (user.UUID,))
        data = cur.fetchall()
    except sqlite3.Error as e:
        print(f"Fetch User Error: {e}")
        data = []
    finally:
        con.close()
    return data

def verify(file, email, password):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""
                    SELECT FIRST_NAME, LAST_NAME, PASSWORD FROM Users
                    WHERE EMAIL = ?
                    """,
                    (email,))
        row = cur.fetchone()

        if row is None:
            print(f'No matching email found.')
            con.close()
            return None
        elif password == row[2]:
            con.close()
            return [row[0], row[1]]
        else:
            print('Incorrect password.')
            con.close()
            return None
    except sqlite3.Error as e:
        print(f"User Verification Error: {e}")
        return None

# # get all groups the user is in
# def fetch_user_groups(file, user, group):
#     con = sqlite3.connect(file)
#     cur = con.cursor()
#     cur.execute("""
#                 SELECT * FROM Groups
#                 WHERE ? = ?
#                 """,
#                 (user.UUID, group.users))

# remove the user from group
def remove_user_from_group(file, groupUUID, userUUID):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""
                SELECT USER_UUIDS FROM Groups
                    WHERE UUID = ?         
                """,
                (groupUUID,))
        userIDs = cur.fetchone().split(',')

        if userUUID in userIDs:
            userIDs.remove(userUUID)

        cur.execute("""
                UPDATE Groups
                SET USER_UUIDS = ?
                WHERE UUID = ?;
                """,
                (','.join(userIDs), groupUUID))
        con.commit()
    except sqlite3.Error as e:
        print(f"Remove User from Group Error: {e}")
    finally:
        con.close()

# Can also implement ownership transfer
def remove_group(file, groupUUID):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""DELETE FROM Groups
                        WHERE UUID = ?
                    """,
                    (groupUUID,))
    except sqlite3.Error as e:
        print(f"Remove Group Error: {e}")
    finally:
        con.close()

def display_all_users(file):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""SELECT * FROM Users;""")
        users_data = cur.fetchall()
        headers = ["UUID", "First Name", "Last Name", "Email", "Password"]
        print(tabulate(users_data, headers=headers, tablefmt="grid"))
    except sqlite3.Error as e:
        print(f"Display All Users Error: {e}")
    finally:
        con.close()
def get_group_by_url(file, url):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""SELECT UUID, LINK, IMAGES, BEDCOUNT, BATHCOUNT, RENT, ADDRESS, LONGITUDE, LATITUDE FROM Groups WHERE LINK = ?;""", (url,))
        group_data = cur.fetchone()
        headers = ["UUID", "Link", "Images", "Bed Count", "Bath Count", "Rent", "Address", "Longitude", "Latitude"]
        return list(group_data)
    except sqlite3.Error as e:
        print(f"Get Group By URL Error: {e}")
    finally:
        con.close()
def display_all_groups(file):
    try:
        con = sqlite3.connect(file)
        cur = con.cursor()
        cur.execute("""SELECT * FROM Groups;""")
        groups_data = cur.fetchall()
        headers = ["UUID", "Link", "Images", "Bed Count", "Bath Count", "Rent", "Address", "Longitude", "Latitude", "User UUIDs"]
        print(tabulate(groups_data, headers=headers, tablefmt="grid"))
    except sqlite3.Error as e:
        print(f"Display All Groups Error: {e}")
    finally:
        con.close()
display_all_users("database.db")
display_all_groups("database.db")