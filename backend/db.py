import sqlite3

def create_table():
    con = sqlite3.connect("database.db")
    cur = con.cursor()
    cur.execute("CREATE TABLE movie(title, year, score)")
    # cur.executescript("""
    #                   BEGIN;
    #                   CREATE TABLE Users(UUID, First name, Last name,Email,Password);
    #                   CREATE TABLE Groups(Group id(UUID)
    #                                      List of users (list of user ID),
    #                                      Zillow link,
    #                                      List of images(image urls most likely just 3),
    #                                      Bed count,
    #                                      Bath count,
    #                                      Rent,
    #                                      Address,
    #                                      Square footage);   
    #                   COMMIT;    
    # """)
    
create_table()