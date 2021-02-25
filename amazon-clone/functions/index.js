const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const stripe = require("stripe")(
    "sk_test_51IOFbiE4ZVbnxk0N2FqwMevKHVtemT1ThGMtfbNOo5LfgDSnHTt97qlY7otdnnNXsNJBirN5uLpZ0FoKOxzs0vDY00pW5Ye07p"
)
 //App coonfig/starts
const app = express();

  //Middelwares

app.use(cors({ origin: true }));
app.use(express.json());
app.get('/',(request,response) =>response.status(200).send('hello World'))
app.post("/payments/create", async (request, response) => {
	const total = request.query.total; //getbasketTotal
	console.log("payment Request Recieved for this amount >>> ", total);
	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: "usd",
    });
    response.status(201).send({
			clientSecret: paymentIntent.client_secret,
		});

});
    exports.api = functions.https.onRequest(app);