const path = require('path')
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



const { Pool } = require("pg"); // This is the postgres database connection module.


const connectionString = process.env.DATABASE_URL || "postgres://postuser:elijah@localhost:5432/blog";


// Establish a new connection to the data source specified the connection string.

const pool = new Pool({connectionString: connectionString});


app.get('/getPost', getPost);

app.set('port', (process.env.PORT || 5000));
/*
//app.listen(process.env.PORT);
// start the server listening
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
*/

// Start the server running

app.listen(app.get('port'), function() {

  console.log('Node app is running on port', app.get('port'));

});





function getPost(request, response) {

	// First get the person's id

	const id = request.query.id;



	getPostFromDb(id, function(error, result) {


		if (error || result == null || result.length != 1) {

			response.status(500).json({success: false, data: error});

		} else {

			const person = result[0];

			response.status(200).json(person);

		}

	});

}


function getPostFromDb(id, callback) {

	console.log("Getting person from DB with id: " + id);



	const sql = "SELECT id, title, post, created_on FROM post WHERE id = $1::int";



	const params = [id];



	pool.query(sql, params, function(err, result) {

		// If an error occurred...

		if (err) {

			console.log("Error in query: ")

			console.log(err);

			callback(err, null);

		}




		console.log("Found result: " + JSON.stringify(result.rows));


		// (The first parameter is the error variable, so we will pass null.)

		callback(null, result.rows);

	});



}