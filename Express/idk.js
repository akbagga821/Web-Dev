const express = require('express')
const app = express();

app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/query', (req, res) => {
  res.render('idk_first');
});


app.post('/query_format', (req,res) => { 

    const {f_username, f_password} = req.body
    console.log('-----------------')
    console.log(f_username)
    console.log(f_password)

    let result = false
    let result2 = false

    if (f_username != undefined) {
      result = true;
    }
    if (f_password != undefined){
      result2 = true
    }

    const render_dictionary = {
      'has_user' : result,
      'has_pass' : result2
    }
    console.log(render_dictionary)
    res.render('idk', render_dictionary);
});

// -------------- listener -------------- //
const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function() {
    console.log("Express server started");
  }
);