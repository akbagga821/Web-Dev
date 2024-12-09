import sqlite3

connection = sqlite3.connect('nfl2.db')

with open('nfl.db/nfl.sql') as f:
    connection.executescript(f.read())