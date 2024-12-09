from flask import Flask, render_template, request
import requests                             # third party - not flask
import json

app = Flask(__name__)

@app.route('/')
def start_form():
    return render_template('start.html')

@app.route('/temp', methods=["POST"])
def hello_requests():
    if request.method=="POST":
        x_coord = request.form.get('coordx')
        y_coord = request.form.get('coordy')
        remote_url2 = "https://api.weather.gov/points/" + x_coord + ',' + y_coord
        print(remote_url2)
        r2 = requests.get(remote_url2)   
            
        j2 = json.loads(r2.text)
        remote_url2 = j2['properties']['forecast']
        name = j2['properties']['relativeLocation']['properties']['city']
        r2 = requests.get(remote_url2)
        j2 = json.loads(r2.text)
            
        return render_template('foo.html', weather=j2, n=name)


app.debug = True
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)