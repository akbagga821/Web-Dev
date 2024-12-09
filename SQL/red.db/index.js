const express = require('express')
const app = express()

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function sqlPromise(query) {
  return new Promise( (resolve,reject) => {
    db.all(query, (err,rows) => {
      if (err) reject(err);
      resolve(rows);
    })
  })
}

app.set('view engine', 'ejs')

app.get('/', async (req,res) => {

  let sqlquery = 'SELECT * FROM characters';
  let results = await sqlPromise(sqlquery);

  let dictionary_out = {
    'results' : results
  }
  res.render('characters', dictionary_out)
})

app.get('/characters/:c_name', async (req,res) => {
  const {c_name} = req.params;

  let sqlquery = 'SELECT * FROM characters WHERE c_name=(?)';
  let sqlparams = [c_name];
  let results = await sqlPromise(sqlquery);

  let dictionary_out = {
    'results' : results
  }
  res.render('characters', dictionary_out)
})

const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function() {
    console.log("Express server started")
  }
)