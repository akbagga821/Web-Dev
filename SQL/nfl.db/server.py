import sqlite3
from flask import Flask, render_template

app = Flask(__name__)

connection = sqlite3.connect('nfl2.db')
cur = connection.cursor()
data = cur.execute('SELECT * FROM stadiums').fetchall()
print(data)
connection.close