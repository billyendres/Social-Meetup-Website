const express = require("express");
const mongoose = require("mongoose");
//Lets express know how to handle cookies from passport.js
//Import keys and mongoURI
const keys = require("./config/keys");

//Connect private keys
mongoose.connect(keys.mongoURI);

const app = express();

//Only runs this code if in production - Heroku Deploy
if (process.env.NODE_ENV === "production") {
	// Express will serve up production assets ( main.js, main.css etc)
	app.use(express.static("client/build"));
	//Express will serve up Index.html if it doesn't recognise the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

//Setup Dynamic PORT
const PORT = process.env.PORT || 5500;

//Heroku Open to start
//Install nodemon add to package.json
//npm run dev to start server
app.listen(PORT, () => console.log(`server on port ${PORT}`));
