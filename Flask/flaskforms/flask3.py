from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)


# ROUTE TO GENERATE THE FORM
@app.route('/hello_form')
def fn_hello_form():
  return render_template('flask3.html')


# ROUTE TO PROCESS THE FORM
@app.route('/thank_you', methods=['POST','GET'])
def handle_form():

  if request.method == 'POST':
  
    # Access and process data from the POST request
    cc1 = request.form.get('c1')
    cc2 = request.form.get('c2')
    cc3 = request.form.get('c3')
    u_pass = request.form.get('f_password')

    return render_template('submitted3.html', ccc1=cc1, ccc2=cc2, ccc3=cc3)

  if request.method == 'GET':

    return redirect(url_for('fn_hello_form'))

app.debug = True
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)