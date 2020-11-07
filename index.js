const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const logger = require('morgan');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieSession({ maxAge: 2592000000, keys: [keys.cookieKey] })); // maxAge is thirty days
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/dogRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Express will serve production assets such as main.js or main.css
	app.use(express.static('client/build'));

	// Express will serve up index.html if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('Listening on port ' + PORT);