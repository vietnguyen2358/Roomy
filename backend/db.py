import sqlite3

def create_table():
    con = sqlite3.connect("database.db")
    cur = con.cursor()
    cur.executescript("""
                      BEGIN;
                      CREATE TABLE Users(UUID, First name, Last name,Email,Password);
                      CREATE TABLE Groups(UUID,
                                         USERS,
                                         LINK,
                                         IMAGES,
                                         BEDCOUNT,
                                         BATHCOUNT,
                                         RENT,
                                         ADDRESS,
                                         SQUAREFOOTAGE);   
                      COMMIT;    
    """)

def insert_user(file,user):
    con = sqlite3.connect("database.db")
    cur = con.cursor()
    cur.execute("""
                INSERT INTO Users VALUES
                    (UUID,
                    First,
                    Last,
                    Email,
                    Password)
""")
    
def insert_group(file,group):
    con = sqlite3.connect("database.db")
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
                    SQUAREFOOTAGE);
""")

    
# create_table()