const fs = require('fs')

app.get('/promise1', (req, res) => {
  async function myFileRead(f){
    return new Promise((resolve) => {
      setTimeout(()=>{
        fs.readFile(f, (err, data) => {
          if (err) throw err;
            data_stuff = data.toString;
          resolve()
        }, 2000)
        })
    });
  }
  res.render('promise1_template', data_stuff)
})

await myFileRead('foo.txt')