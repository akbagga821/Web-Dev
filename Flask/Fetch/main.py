from flask import Flask, render_template, jsonify
import sqlite3 as sql
app = Flask(__name__)

votes_database = 'votes.db'

@app.route('/')
def hello_world():
    return render_template('hello.html')

@app.route('/upvote')
def upvotee():
    return render_template('up.html')

@app.route('/downvote')
def downvotee():
    return render_template('down.html')


@app.route("/kitchen")
def kitchen_ops():
    kitchen  = {
	  "eggs": 1,
	  "onions": 3,
	  "garlic": 4
	}
    return jsonify(kitchen)

@app.route("/downvote_counter")
def downvote_ops():
    conn = sql.connect(votes_database)
    cur = conn.cursor()
    cur.execute("SELECT v_downvotes FROM votes")
    item = cur.fetchone()
    true_item = item[0]
    true_item += 1
    cur.execute("UPDATE votes SET v_downvotes = ?", (true_item,))
    conn.commit()
    downvote = {
        "downvotes": true_item
    }
    #return render_template("list.html", rows=rows)
    return jsonify(downvote)

@app.route("/upvote_counter")
def upvote_ops():
    conn = sql.connect(votes_database)
    cur = conn.cursor()
    cur.execute("SELECT v_upvotes FROM votes")
    item = cur.fetchone()
    true_item = item[0]
    true_item += 1
    cur.execute("UPDATE votes SET v_upvotes = ?", (true_item,))
    conn.commit()
    upvote = {
        "upvotes": true_item
    }
    #return render_template("list.html", rows=rows)
    return jsonify(upvote)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)