const express = require("express");
const app = express();

app.set('view engine', 'ejs')

app.get('/number_form', (req, res) => {
    res.render('num_template')
})

app.get('/middle', (req, res) => {
    let { f_num } = req.query
    f_num = parseInt(f_num)
    res.redirect(`converter/${f_num}`)
})
app.get('/converter/:num', (req, res) => {
    let { num } = req.params
    num = parseInt(num)
    let even = 'odd'
    if(num % 2 == 0){
        even = 'even'
    }
    const render_dictionary = {
        'number' : num,
        'kelvin' : num + 273,
        'even' : even
    }
    let json = false
    if('format' in req.query && req.query.name!=""){
        json = true
    }
    if(json == true) res.json(render_dictionary)
    else res.render('converter_template', render_dictionary)
})


const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
  });