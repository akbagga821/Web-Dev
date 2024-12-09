const express = require("express");
const app = express();

app.set('view engine', 'ejs')


let page_counter = 0;

app.get('/flip', function(req,res){
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    
    gamble = getRandomInt(4);
    page_counter++;
    gamble_check = 'won'
    if(gamble % 2 == 0){
        gamble_check = 'lost'
    }

    const render_dictionary = {
        'placeholder' : 'gambling',
        'check' : gamble_check
    }
    if(gamble_check == 'won'){
        res.render('gamble_template_won', render_dictionary)
    }
    else{
        res.render('gamble_template_lost', render_dictionary)
    }
})

const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function() {
    console.log("Express server started");
});