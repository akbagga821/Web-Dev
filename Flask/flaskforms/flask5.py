from flask import Flask, render_template, request
app = Flask(__name__)


# ROUTE TO GENERATE THE FORM
@app.route('/hello_form')
def hello_form():
  return render_template('flask5.html')


# ROUTE TO PROCESS THE FORM
@app.route('/thank_you')
def handle_form():
    arr = []
    arr.append(request.args.get('check_01'))
    arr.append(request.args.get('check_02'))
    arr.append(request.args.get('check_03'))
    arr.append(request.args.get('truth_01'))
    arr.append(request.args.get('truth_02'))
    for i in range(len(arr)):
       if arr[i] == None:
          arr[i] = ""
  # GET THE FORM VALUE
    return render_template('submitted5.html', c1=arr[0], c2=arr[1], c3=arr[2], c4=arr[3], c5=arr[4])

app.debug = True
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)