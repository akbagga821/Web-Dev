const express = require("express");
const app = express();

app.set('view engine', 'ejs')

const fs = require('fs');		// fs is built-in. no npm install
const path = require('path');	// path is built-in. no npm install

// generate a file path (as a string) for the words file
const wordsFilePath = path.join(__dirname,'enable1.txt')

// use fs to read the file; convert bytes to string split on newlines
const words = fs.readFileSync(wordsFilePath).toString().split('\n')
console.log(words)
// (words is now an array of the entire enable1.txt file)

app.get('/home', (req,res) => {
  res.render('home')
})

app.get('/wordfinder', (req,res) => {
	console.log(req.query)
	const words_array = words_finder(req.query)
	console.log(words_array)
	const greens = []
	const yellows = []
	const grays = []
    console.log(req.query.l1)
	let newDictionary = {
		'words' : words_array
	}
	res.json(newDictionary)
	//res.json('wordle_template', newDictionary)
})

function words_finder(params_dict){
	const greens = ['', '', '', '', '']
	const yellows = ['', '', '', '', '']
	const grays = ['', '', '', '', '']
	const words_list = []
	if(params_dict.colors1 == 'green'){
		greens[0] = params_dict.l1
	}
	else if(params_dict.colors1 == 'yellow'){
		yellows[0] = params_dict.l1
	}
	else{
		grays[0] = params_dict.l1
	}

	if(params_dict.colors2 == 'green'){
		greens[1] = params_dict.l2
	}
	else if(params_dict.colors2 == 'yellow'){
		yellows[1] = params_dict.l2
	}
	else{
		grays[1] = params_dict.l2
	}

	if(params_dict.colors3 == 'green'){
		greens[2] = params_dict.l3
	}
	else if(params_dict.colors3 == 'yellow'){
		yellows[2] = params_dict.l3
	}
	else{
		grays[2] = params_dict.l3
	}

	if(params_dict.colors4 == 'green'){
		greens[3] = params_dict.l4
	}
	else if(params_dict.colors4 == 'yellow'){
		yellows[3] = params_dict.l4
	}
	else{
		grays[3] = params_dict.l4
	}

	if(params_dict.colors5 == 'green'){
		greens[4] = params_dict.l5
	}
	else if(params_dict.colors5 == 'yellow'){
		yellows[4] = params_dict.l5
	}
	else{
		grays[4] = params_dict.l5
	}
	
	let i = 0
	let filtered_words = words.filter( function(elem){
  
		return elem.length == 5
	  
	  })
	while(i < filtered_words.length){
		temp = filtered_words[i]
		temp_list = []
		let counter = 0
		green_length = 0
			for(let j = 0; j < greens.length; j++){
				if(greens[j] != ''){
					green_length++
					if(temp.substring(j, j + 1) == greens[j]){
						counter++
					}
				}
			}
			if(counter == green_length){
				temp_list.push(temp)
			}
			counter = 0
			yellow_length = 0
			if(temp_list.length > 0){
				for(let j = 0; j < yellows.length; j++){
					if(yellows[j] != ''){
						yellow_length++
						if(temp.substring(j, j + 1) == yellows[j]){
							temp_list.splice(0)
						}
						if(temp.includes(yellows[j]) && temp.substring(j, j + 1) != yellows[j]){
							counter++
						}
					}
				}
			}
			if(counter != yellow_length){
				temp_list.splice(0)
			}
			if(temp_list.length > 0){
				for(let j = 0; j < grays.length; j++){
					if(grays[j] != ''){
						if(temp.includes(grays[j]) && !greens.includes(grays[j]) && !yellows.includes(grays[j])){
							temp_list.splice(0)
						}
					}
				}
			}
			if(temp_list.length > 0){
				words_list.push(temp)
			}
		
		i++
	}
	console.log(words_list)
	return(words_list)
}

/* 
<button type="button" onclick="doTheFetch()">PRESS ME FOR ANSWERS</button>
<script>
    async function doTheFetch() {
        const response = await fetch('http://127.0.0.1/wordfinder')
        const data = await response.json()
        let counter_span = document.getElementById("upvotes")
        counter_span.innerHTML = data.upvotes;
    }    
</script>
  */

const listener = app.listen(
	process.env.PORT || 8080, 
	process.env.HOST || "0.0.0.0", 
	function() {
    	console.log("Express server started");
	}
);