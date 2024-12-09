const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('nfl2.db');


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

async function main() {

  let query1 = `UPDATE characters SET c_name=(?) WHERE c_name=(?)`;
  await query_promise(query1,["TABLE you're it.", "Archibald"]);
  console.log(' --- update complete --- ')

  let query2 = "SELECT * FROM characters";
  let results2 = await query_promise(query2);
  console.log(results2);
  console.log(' --- --- --- --- ')

  let query3 = "SELECT * FROM characters WHERE c_wit=(?)";
  let results3 = await query_promise(query3,[0]);
  console.log(results3);

  // close DB
  db.close();
}

main()