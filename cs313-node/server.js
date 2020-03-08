const path = require('path')
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/results', calculateRate);

//app.listen(process.env.PORT);
// start the server listening
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port);

function calculateRate(req,res) {
    const mail = req.query.mail;
    const weight = Number(req.query.weight);
    
    let result = 0; 

    if(mail=="Letters (Stamped)") {
        var price = 0.55

        if(weight == 1) {

           result = price;
       }
       else {
           price = price + ((weight - 1)*0.15);
           result = price.toFixed(2);
       }
}

    else if(mail=="Letters (Metered)") {

        var price = 0.50

        if(weight == 1) {

           result = price;
       }
       else {
           price = price + ((weight - 1)*0.15);
           result = price.toFixed(2);
       }
}

    else if(mail=="Letters (Flats)") {
        var price = 1.00

        if(weight == 1) {

           result = price;
       }
       else {
           price = price + ((weight - 1)*0.20);
           result = price.toFixed(2);
       }
    }


    else if(mail=="First-Class Package Service—Retail") {
        var price = 3.65

       if(weight == 1) {

           result = price;
       }
       else {
           price = price + ((weight - 1)*20);
           result = price.toFixed(2);
       }
    }

	const params = {weight: weight, mail: mail, result: result};

	res.render('pages/getRate', params);
}