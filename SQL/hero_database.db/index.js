const express = require('express')
const app = express()

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hero_database.db');

function sqlPromise(query) {
  return new Promise( (resolve,reject) => {
    db.all(query, (err,rows) => {
      if (err) reject(err);
      resolve(rows);
    })
  })
}

function query_promise(query, params=[]) {
  return new Promise( (resolve,reject) => {
    const fn = (query.split(" ")[0].toUpperCase()==="SELECT") ? 'all' : 'run'
    if (params.length===0) {
      db[fn](query, (err,rows) => {
        if (err) reject(err);
        resolve(rows);
      })
    } else {
      db[fn](query, params, (err,rows) => {
        if (err) reject(err);
        resolve(rows);
      })
    }
  })
}

app.set('view engine', 'ejs')

app.get('/home', async (req,res) => {
  let sqlquery = 'SELECT * FROM characters';
  let results = await sqlPromise(sqlquery);

  let dictionary_out = {
    'results' : results
  }
  res.render('first', dictionary_out)
})

app.get('/update', async (req,res) => {
  const {c_name} = req.params;

  let dictionary_out = {
    'name' : c_name
  }
  res.render('intermediate', dictionary_out)
})

app.get('/characters/:c_name/:c_id', async (req,res) => {
  const {c_name, c_id} = req.params;
  console.log(c_name, c_id)
  let query3 = `SELECT * FROM characters INNER JOIN questies ON questies.q_char = characters.c_name`
  //let query3 = "SELECT * FROM characters WHERE c_name=(?)";
  let results3 = await query_promise(query3);
  console.log('here!')
  console.log(results3);
  c = parseInt(c_id)
  results3 = results3[c]
  console.log('after here!')
  console.log(results3)
  let dictionary_out = {
    'results' : results3,
    'id': parseInt(c_id)
  }
  console.log('yuh')
  console.log(results3['c_name'])
  res.render('second', dictionary_out)
})

async function main(name, aspect, update){
  console.log(name, aspect, update)
  console.log('main')
  if (aspect == 'wit'){
    let query2 = `UPDATE characters SET c_wit=${parseInt(update)} WHERE c_name=${name}`;
    let results = await sqlPromise(query2, [update, name]);
  }
  if (aspect == 'strength'){
    let query2 = `UPDATE characters SET c_strength=${parseInt(update)} WHERE c_name='${name}'`;
    await sqlPromise(query2, [update, name]);
  }
  if (aspect == 'attack') {
    let query2 = `UPDATE characters SET c_attack=${parseInt(update)} WHERE c_name='${name}'`;
    let results = await sqlPromise(query2, [update, name]);
  }
  if (aspect == 'defense') {
    let query2 = `UPDATE characters SET c_defense=${parseInt(update)} WHERE c_name='${name}'`;
    let results = await sqlPromise(query2, [update, name]);
  }
  if (aspect == 'magic') {
    let query2 = `UPDATE characters SET c_magic=${parseInt(update)} WHERE c_name='${name}'`;
    let results = await sqlPromise(query2, [update, name]);
  }
  if (aspect == 'equipment') {
    let query2 = `UPDATE characters SET c_equipment='${update}' WHERE c_name='${name}'`;
    let results = await sqlPromise(query2, [update, name]);
  }
  if (aspect == 'quests') {
    let query2 = `UPDATE questies SET q_name='${update}' WHERE q_char='${name}'`;
    let results = await sqlPromise(query2, [update, name]);
  }

}

app.get('/updated', async (req,res) => {
  console.log(req.query)
  const {char_name, char_aspect, char_update} = req.query
  console.log(char_name)
  main(char_name, char_aspect, char_update);
  const render_dictionary = {
    'blah' : 'blah'
  }
  res.render('final', render_dictionary);
});

const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function() {
    console.log("Express server started")
  }
)