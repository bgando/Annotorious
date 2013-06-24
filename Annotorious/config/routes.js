module.exports = function(app) {
	var site = require('../controllers/site');
	var works = require('../controllers/works');
	var annotations = require('../controllers/annotations');
	var jwt = require('jwt-simple');


	app.get('/', site.index);

	app.get('/api', tokenOK, annotations.api);
	app.get('/annotations/search', tokenOK, annotations.search);
	app.get('/annotations', tokenOK, annotations.list);
	app.get('/annotations/:id', tokenOK, annotations.findById);
	app.post('/annotations', tokenOK, annotations.addAnnotation);
	app.put('/annotations/:id', tokenOK, annotations.update);
	app.delete('annotations/:id', tokenOK, annotations.delete);

	app.get('/works', works.list);
	app.get('/works/:id', works.findById);
	app.post('/works/:id', works.addWork);
};

//auth

function tokenOK (req, res, next) {

    try {
    var decoded = jwt.decode(req.header('x-annotator-auth-token'), secret);
    if (inWindow(decoded)) {
       console.log("Token in time window");
    } 
    else {
       console.log("Token not in in time window.");
    } 
    next();
    } catch (err) {
       console.log("Error decoding token:");
    console.log(err);
    return res.send("There was a problem with your authentication token");
    }
};

function inWindow (decoded, next) {
    var issuedAt = decoded.issuedAt; 
    var ttl = decoded.ttl; 
    var issuedSeconds = new Date(issuedAt) / 1000; 
    var nowSeconds = new Date().getTime() / 1000;    
    var diff = ((nowSeconds - issuedSeconds)); 
    var result = (ttl - diff); console.log("Time left on token: about " + Math.floor(result/(60*60)) + " hours.");
    return ((result > 0) ? true : false);
}
