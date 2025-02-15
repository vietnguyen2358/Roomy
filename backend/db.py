import sqlite3

def create_table():
    con = sqlite3.connect("database.db")
    cur = con.cursor()
    # cur.execute("CREATE TABLE movie(title, year, score)")
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
    
create_table()