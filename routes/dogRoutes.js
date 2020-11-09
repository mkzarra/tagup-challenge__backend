const { index, show, create, update, destroy } = require('../controllers/dogController');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.get('/api/dogs', index);
	app.get('/api/dogs/:id', show);
	app.post('/api/dogs', requireLogin, create);
	app.put('/api/dogs/:id', requireLogin, update);
	app.delete('/api/dogs/:id', requireLogin, destroy);
}