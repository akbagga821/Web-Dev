import sqlite3

connection = sqlite3.connect('votes.db')

with open('insert.sql') as f:
    connection.executescript(f.read())