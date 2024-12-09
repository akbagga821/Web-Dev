from flask import Flask, render_template, request
app = Flask(__name__)


# ROUTE TO GENERATE THE FORM
@app.route('/hello_form')
def hello_form():
  print("yippee!")
  return render_template('flask2.html')


# ROUTE TO PROCESS THE FORM
@app.route('/thank_you')
def handle_form():

  # GET THE FORM VALUE
    answer = request.args.get('radio_list_01')
    if(answer == "16"):
        return render_template('submitted2.html', ans="true")
    else:
       return render_template('submitted2.html', ans="false")


app.debug = True
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)