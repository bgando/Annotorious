module.exports = function(app) {
	var site = require('../controllers/site');
	var works = require('../controllers/works');
	var annotations = require('../controllers/annotations');

	app.get('/', site.index);

	app.get('/api', annotations.api);
	app.get('/annotations/search', annotations.search);
	app.get('/annotations', annotations.list);
	app.get('/annotations/:id',  annotations.findById);
	app.post('/annotations/', annotations.addAnnotation);
	app.put('/annotations/:id', annotations.update);
	app.delete('annotations/:id', annotations.delete);

	app.get('/works', works.list);
	app.get('/works/:id', works.findById);
	app.post('/works/:id', works.addWork);
};
