from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello_world():
    print('someone landing on the page')
    return 'Hello, World!'

@app.route('/kavya')
def kk():
    return render_template('kavya.html')

@app.route('/tickytack')
def tt():
    return render_template('tic-tac-toe copy.html')
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)