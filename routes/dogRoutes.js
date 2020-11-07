const { index, show, create, update, destroy } = require('../controllers/dogController');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.get('/dogs', index);
	app.get('/dogs/:id', show);
	app.post('/dogs', requireLogin, create);
	app.put('/dogs/:id', requireLogin, update);
	app.delete('/dogs/:id', requireLogin, destroy);
}