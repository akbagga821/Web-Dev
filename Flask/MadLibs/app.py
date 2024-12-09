from flask import Flask, render_template, request
app = Flask(__name__)


# ROUTE TO GENERATE THE FORM
@app.route('/landing_page')
def start_form():
   return render_template('startingpage.html')

@app.route('/madlibs_form')
def hello_form():
  return render_template('madlibs.html')


# ROUTE TO PROCESS THE FORM
@app.route('/madlibs_return', methods=['POST'])
def handle_form():
   if request.method == 'POST':
      arr = []
      arr.append(request.form.get('topping_1'))
      arr.append(request.form.get('topping_2'))
      arr.append(request.form.get('topping_3'))
      f_name = request.form.get('f_name')
      f_age = request.form.get('f_age')
      f_adj_1 = request.form.get('adj_1')
      f_noun_1 = request.form.get('n1')
      f_verb_1 = request.form.get('v1')
      f_an_1 = request.form.get('img_1')
      if f_an_1 == "porcupine":
         img1 = "data:image/jpeg;base64,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"
      elif f_an_1 == "cat":
         img1 = "data:image/jpeg;base64,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"
      else:
         img1 = "data:image/jpeg;base64,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"
      for i in range(len(arr)):
         if arr[i] == None:
            arr[i] = ""
   # GET THE FORM VALUE
      return render_template('madlibs_submitted.html', name = f_name, age = f_age, adj_1 = f_adj_1, t1=arr[0], t2=arr[1], t3=arr[2], noun1 = f_noun_1, verb1=f_verb_1, image=img1)

app.debug = True
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)