const express = require('express')
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('user_database.db');

app.use('/public', express.static('public'));


app.set('view engine', 'ejs')


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

const cookieSessionModule = require('cookie-session');

const cookieInitializationParams = {
  name: 'logged_in',
  keys: ['encryptionkey'],
  maxAge: 24 * 60 * 60 * 1000 * 10000000
}
const cookieSessionMiddleware = cookieSessionModule(cookieInitializationParams)
app.use(cookieSessionMiddleware)

const visitCounterMiddlewareFn = async (req,res,next) => {
    let {logged_in, username} = req.session;
    logged_in ||= false
    username ||= ''
    let query3 = `SELECT c_user FROM stats WHERE c_user = '${req.session.user}'`
    let results3 = await sqlPromise(query3)
    if(results3.length != 0){
      req.session.logged_in = false
      req.session.username = ''
    }
    else{
      req.session.logged_in = logged_in
      req.session.username = username
      req.session.t_score = 0
      req.session.h_score = 0
    }
    
    next()
  }
  
  const middleLogin = (req,res,next) => {
      req.session.logged_in = true
      next()
    }
  
    const middleLogout = (req,res,next) => {
      req.session.logged_in = false
      next()
    }
  
  app.get('/', visitCounterMiddlewareFn, (req,res) => {
    // render output
    const render_dictionary = {
      'login' : req.session.logged_in,
      'username' : req.session.username,
      'check' : true
    }
    res.render('home', render_dictionary)
  })
  
  app.get('/login', (req,res) => {
      let render_dictionary = {
        'login' : true
      }
      res.render('login2', render_dictionary)
    })

    app.get('/login_done', middleLogin, async (req,res) => {
        check = ''
        console.log(req.query)
        console.log('here')
        req.session.username = req.query.user
        let query3 = `SELECT c_user FROM stats WHERE c_user = '${req.query.user}'`
        let results3 = await sqlPromise(query3)
        let query = `SELECT c_tictactoe FROM stats WHERE c_user = '${req.session.username}'`;
        let results = await sqlPromise(query);
        let query2 = `SELECT c_hangman FROM stats WHERE c_user = '${req.session.username}'`;
        let results2 = await sqlPromise(query2);
        if(results3.length == 0){
          check = false
          req.session.logged_in = false
        }
        else{
          req.session.logged_in = true
          check = true
          console.log(results)
          req.session.t_score = results[0].c_tictactoe
          req.session.h_score = results2[0].c_hangman
        }
          req.session.username = req.query.user
          
          let render_dictionary = {
            'login' : req.session.logged_in,
            'username' : req.session.username,
            'check' : check
          }
          console.log(render_dictionary)
        
        res.render('home', render_dictionary)
      })

    app.get('/signup', (req,res) => {
       let render_dictionary = {
        'check' : true
       }
        res.render('signup', render_dictionary)
    })

    app.get('/signup_done', middleLogin, async (req,res) => {
      console.log(req.query)
      req.session.username = req.query.user
      let query3 = `SELECT c_user FROM stats WHERE c_user = '${req.query.user}'`;
      let results3 = await sqlPromise(query3)
      if(results3.length != 0){
        let render_dictionary = {
          'check' : false
        }
        res.render('signup', render_dictionary)
        return
      }
      sign_up(req.query.user, req.query.password, 0, 0)
      const render_dictionary = {
        'login' : req.session.logged_in,
        'username' : req.session.username,
        'check' : true
      }
      
      res.render('home', render_dictionary)
    })

    async function sign_up(username, password, hangman_score, tictactoe_score){
      let query = `INSERT INTO stats VALUES ('${username}', '${password}', ${hangman_score}, ${tictactoe_score})`;
      let results = await sqlPromise(query);
    }

    app.get('/logout', middleLogout, (req,res) => {
      req.session.username = ''
      const render_dictionary = {
        'login' : req.session.logged_in,
        'username' : req.session.username,
        'check' : true
      }
      res.render('home', render_dictionary)
    })
    
    app.get('/tictac', async (req,res) => {
      console.log('here')
      increment = req.query.inc
      x = parseInt(increment)
      val = req.session.t_score
      console.log(val)
      req.session.t_score = val + x
      console.log(req.session.t_score)
      let query = `UPDATE stats SET c_tictactoe=${req.session.t_score} WHERE c_user = '${req.session.username}'`;
      let results = await sqlPromise(query, [req.session.t_score, req.session.username]);
      let query2 = `SELECT c_tictactoe FROM stats WHERE c_user = '${req.session.username}'`;
      let results2 = await sqlPromise(query2);
      let newDictionary = {
        'score' : results2[0].c_tictactoe
      }
      console.log('here!')
      console.log(newDictionary)
      res.json(newDictionary)
    })

    app.get('/hangy', async (req,res) => {
      val = req.session.h_score
      console.log(val)
      req.session.h_score = val + 1
      console.log(req.session.h_score)
      let query = `UPDATE stats SET c_hangman=${req.session.h_score} WHERE c_user = '${req.session.username}'`;
      let results = await sqlPromise(query, [req.session.h_score, req.session.username]);
      let query2 = `SELECT c_hangman FROM stats WHERE c_user = '${req.session.username}'`;
      let results2 = await sqlPromise(query2);
      let newDictionary = {
        'score' : results2[0].c_hangman
      }
      console.log(newDictionary)
      res.json(newDictionary)
    })

    app.get('/tictactoe', (req,res) => {
      res.render('tic-tac-toe')
    })

    app.get('/hangman', (req,res) => {
      res.render('hang_man')
    })

    app.get('/scoreboard', async (req,res) => {
      let query = `SELECT * FROM stats`;
      let results = await sqlPromise(query);
      const render_dictionary = {
        'results' : results
      }
      console.log(render_dictionary)
      res.render('scoreboard', render_dictionary)
    })


const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
  });