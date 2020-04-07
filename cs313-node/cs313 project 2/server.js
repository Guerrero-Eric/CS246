require('dotenv').config()
const path = require('path')
const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()
 
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const { Pool } = require("pg"); // This is the postgres database connection module.

const connectionString = process.env.DATABASE_URL;
// Establish a new connection to the data source specified the connection string.
const pool = new Pool({connectionString: connectionString});

pool.connect();  
             
app.use('/articles', articleRouter)
  
// main page
app.get('/', (req, res) => {     
	
	res.render('pages/main')
  })
         
app.set('port', (process.env.PORT || 5000)); 
// Start the server running
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});  


 
       
    