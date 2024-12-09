import sqlite3
from flask import Flask, render_template

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


def get_db_name(name):
    print('1')
    conn = sqlite3.connect('database.db')
    print('2')
    cur = conn.cursor()
    print('3')
    query = "SELECT * FROM characters where c_name = ?"
    print('4')
    data = cur.execute(query, (name)).fetchall()
    print('5')
    return data


@app.route('/characters')
def index():
    conn = get_db_connection()
    data = conn.execute('SELECT * FROM characters').fetchall()
    conn.close()
    print('0')
    return render_template('characters.html', characters=data)

@app.route('/characters/<name>')
def char_template(name):
    print('1')
    conn = get_db_connection()
    print('2')
    char_name = get_db_name(name)
    print('3')
    conn.close()
    print('4')
    return render_template('profile.html', c_name = char_name)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
