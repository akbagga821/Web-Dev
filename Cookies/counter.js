const express = require('express')
const app = express()
app.set('view engine', 'ejs')

const cookieSessionModule = require('cookie-session');

const cookieInitializationParams = {
  name: 'cookie_counter',
  keys: ['encryptionkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}

const cookieSessionMiddleware = cookieSessionModule(cookieInitializationParams)
app.use(cookieSessionMiddleware)

const visitCounterMiddlewareFn = (req,res,next) => {

  // extract the visits from req.session
  //   (if this is the first visit, it will be undefined)
  let {visits, logged_in} = req.session;

  // or-equal the 'visits' with zero
  //   (this will convert undefined to zero, or keep a number)
  visits ||= 0;
  logged_in ||= false
  // assign req.session.visits 
  //    (this guarantees a number) 
  req.session.visits = visits;
  req.session.logged_in = logged_in

  // increment req.session.visits 
  req.session.visits += 1;
  next()
}

const middleLogin = (req,res,next) => {

    // extract the visits from req.session
    //   (if this is the first visit, it will be undefined)
  
    // or-equal the 'visits' with zero
    //   (this will convert undefined to zero, or keep a number)
    // assign req.session.visits 
    //    (this guarantees a number) 
    req.session.logged_in = true
  
    // increment req.session.visits 
    next()
  }

  const middleLogout = (req,res,next) => {

    // extract the visits from req.session
    //   (if this is the first visit, it will be undefined)
  
    // or-equal the 'visits' with zero
    //   (this will convert undefined to zero, or keep a number)
    // assign req.session.visits 
    //    (this guarantees a number) 
    req.session.logged_in = false
  
    // increment req.session.visits 
    next()
  }

app.get('/', visitCounterMiddlewareFn, (req,res) => {
  // render output
  const render_dictionary = {
    'visits' : req.session.visits
  }
  if(req.session.logged_in == false){
    if(req.session.visits > 5){
        res.render('no', render_dictionary)
      }
    res.render('blank', render_dictionary)
  }
  res.render('blank', render_dictionary)
})

app.get('/login', middleLogin, (req,res) => {
    // render output
    const render_dictionary = {
      'login' : req.session.logged_in
    }
    res.render('in', render_dictionary)
  })

  app.get('/logout', middleLogout, (req,res) => {
    // render output
    const render_dictionary = {
      'login' : req.session.logged_in
    }
    res.render('out', render_dictionary)
  })

app.listen(8080,"0.0.0.0", ()=>{console.log('running')})