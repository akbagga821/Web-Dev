import sqlite3

connection = sqlite3.connect('user_database.db')

with open('insert.sql') as f:
    connection.executescript(f.read())