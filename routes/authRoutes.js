const passport = require('passport');

module.exports = app => {
	app.get('/auth/google',
		passport.authenticate('google', { scope: ['profile', 'email'] }));
	
	app.get('/auth/google/callback',
		passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
			try {
				res.redirect('/');
			} catch (error) {
				console.log(error);
			}
		});
	
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};