var friends = require("../data/friends.js");

var current = {};
var best = {
	total: Number.MAX_VALUE,
	friend: {}
};

function get_best(value)
{
	var total = 0;
	for (var i = 0; i < 10; i++) {
		total += Math.abs(value.scores[i] - current.scores[i]);
	}

	if (total < best.total) {
		best.total = total;
		best.friend = value;
	}
}

module.exports = function(app)
{
	app.get("/api/friends", function(req, res)
	{
		return res.json(friends);
	});

	app.post("/api/friends", function(req, res)
	{
		best = {
			total: Number.MAX_VALUE,
			friend: {}
		};

		if (friends.length < 1) {
			friends.push(req.body);
			return res.json("NOT ENOUGH USERS");
		}

		current = req.body;
		friends.forEach(get_best);
		friends.push(current);
		return res.json(best.friend);
	});
}
