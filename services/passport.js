const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientId,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
		proxy: true,
		userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
	},
	
	async (accessToken, refreshToken, profile, done) => {
		try {
			const existingUser = await User.findOne({
				googleId: profile.id
			});

			if (existingUser) {
				done(null, existingUser);
			}

			const user = await new User({
				googleId: profile.id,
				email: profile.emails[0].value,
				displayName: profile.displayName
			}).save();

			done(null, user);
		} catch (error) {
			console.log(error);
		}
	})
);