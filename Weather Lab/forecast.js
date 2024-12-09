const express = require('express')
const router = express.Router()
var https = require('https');
const app = express();

app.set('view engine', 'ejs')

app.get('/weather_form', (req,res)=>{
	res.render('forecast_start_template')
	// the action of the form will point to weather_results
})

app.get('/wrong', (req,res)=>{
	res.render('bad_end_template')
	// the action of the form will point to weather_results
})

app.get('/weather_results',
(req,res,next)=>{
	lat = parseFloat(req.query.coordx)
    long = parseFloat(req.query.coordy)
    console.log(lat, long)
	/*if ((lat < 25 || lat > 49 || long > -67 || long < -125) && !(lat > 54 && lat < 71 && long < -130 && long > -173)){
			render_dictionary = {
				forecast : null
			}
			res.render('end_template', render_dictionary)	
			return
	}*/

		url = "https://api.weather.gov/points/" + lat + ',' + long
		const options = { 
		headers : {
			'User-Agent': '(weather app) (me@bob.com)'
			}
		}

		https.get(url, options, (response) => {
		let rawData = '';
		response.on('data', (chunk) => {rawData += chunk;});
		response.on('end', function() {
			// request complete event
			//const obj = JSON.parseFloat(rawData)
			// recall that downloaded data is a string. It needs to be parsed
				const obj = JSON.parse(rawData); 
				console.log(obj)
				if('status' in obj){
					render_dictionary = {
						forecast : null
					}
					res.render('end_template', render_dictionary)	
					return
				}
				res.locals.url = obj.properties.forecast
				console.log(res.locals.url)
				next()
			// to pass this data along, this is where you res.locals it and next()
		});
		}).on('error', function(e) {
			console.error(e);
		});
},
	(req,res,next)=>{
		const url = res.locals.url
		const options = { 
		headers : {
			'User-Agent': '(weather app) (me@bob.com)'
		}
		}
		console.log(options.headers)
		https.get(url, options, (response) => {
		let rawData = '';
		response.on('data', (chunk) => {rawData += chunk;});
		response.on('end', function() { // request complete event
			// recall that downloaded data is a string. It needs to be parsed
			const obj2 = JSON.parse(rawData); 
			console.log(obj2)
			// to pass this data along, this is where you res.locals it and next()
			res.locals.forecast = obj2.properties.periods
			console.log(res.locals.forecast)
			next()
		});
		}).on('error', function(e) {
			console.error(e);
		});
	},
	(req,res)=>{
		const forecast = res.locals.forecast
		const render_dictionary = {
			'forecast' : forecast
		}
		res.render('end_template', render_dictionary)
	})



module.exports = router
const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    });