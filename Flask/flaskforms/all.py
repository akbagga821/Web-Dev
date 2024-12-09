from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)


# ROUTE TO GENERATE THE FORM
@app.route('/flask_1')
def hello_form():
  return render_template('myform.html')


# ROUTE TO PROCESS THE FORM
@app.route('/flask_1_thanks')
def handle_form():

  # GET THE FORM VALUE
  u_name = request.args.get('f_username')
  p_word = request.args.get('f_password')
  return render_template('submitted.html', user_name=u_name, pass_word=p_word)

# ROUTE TO GENERATE THE FORM
@app.route('/flask_2')
def hello_form2():
  print("yippee!")
  return render_template('flask2.html')


# ROUTE TO PROCESS THE FORM
@app.route('/flask_2_thanks')
def handle_form2():

  # GET THE FORM VALUE
    answer = request.args.get('radio_list_01')
    if(answer == "16"):
        return render_template('submitted2.html', ans="true")
    else:
       return render_template('submitted2.html', ans="false")
    
# ROUTE TO GENERATE THE FORM
@app.route('/flask_3')
def fn_hello_form3():
  return render_template('flask3.html')


# ROUTE TO PROCESS THE FORM
@app.route('/flask_3_thanks', methods=['POST','GET'])
def handle_form3():

  if request.method == 'POST':
  
    # Access and process data from the POST request
    cc1 = request.form.get('c1')
    cc2 = request.form.get('c2')
    cc3 = request.form.get('c3')
    u_pass = request.form.get('f_password')

    return render_template('submitted3.html', ccc1=cc1, ccc2=cc2, ccc3=cc3)

  if request.method == 'GET':

    return redirect(url_for('fn_hello_form3'))
  
# ROUTE TO GENERATE THE FORM
@app.route('/flask_4')
def hello_form4():
  return render_template('flask4.html')


# ROUTE TO PROCESS THE FORM
@app.route('/flask_4_thanks')
def handle_form4():
    arr = []
    arr.append(request.args.get('check_01'))
    arr.append(request.args.get('check_02'))
    print(arr)
    for i in range(len(arr)):
       if arr[i] == None:
          arr[i] = ""
    print(arr)
  # GET THE FORM VALUE
    return render_template('submitted4.html', c1=arr[0], c2=arr[1])

# ROUTE TO GENERATE THE FORM
@app.route('/flask_5')
def hello_form5():
  return render_template('flask5.html')


# ROUTE TO PROCESS THE FORM
@app.route('/flask_5_thanks')
def handle_form5():
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