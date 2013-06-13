module.exports = {
	list: function(req, res) {
		res.send('here is a list of all the annotations, ever');
	},
	findById: function(req, res) {
		res.send('here is a specific annotation');
	},
	addAnnotation: function(req, res) {
		res.send('you added an annotation!');
	}
};
