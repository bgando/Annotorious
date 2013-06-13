function migratePlays() {
	var plays = db.plays.find();

	plays.forEach(function(play) {
		if (play.PLAY) {
			print('Migrating play "'+play.PLAY.TITLE+'"');
			db.plays.remove({ _id: play._id });
			db.plays.insert(play.PLAY);
		}
	});
}

function collapseFM() {
	var plays = db.plays.find();

	plays.forEach(function(play) {
		print('Collapsing FM for play "'+play.TITLE+'"');
		if (play.FM) {
			var attribution = play.FM.P.join(' ');
			db.plays.update({ _id: play._id }, { $set: { attribution: attribution }, $unset: { FM: 1 } });
		}
	});
}
