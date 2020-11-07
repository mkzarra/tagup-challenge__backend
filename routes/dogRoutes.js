const { index, show, create, update, destroy } = require('../controllers/dogController');

module.exports = app => {
	app.get('/dogs', index);
	app.get('/dogs/:id', show);
	app.post('/dogs', create);
	app.put('/dogs/:id', update);
	app.delete('/dogs/:id', destroy);
}