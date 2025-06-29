import sqlite3

#Connect the Database
connection = sqlite3.connect('database.db');
#Open the scheme of db
with open('schema.sql') as f:
    connection.executescript(f.read())
#Close the Database Connection
connection.close()