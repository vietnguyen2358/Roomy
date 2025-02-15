import sqlite3

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