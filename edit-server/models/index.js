const mongoose = require("mongoose");

// mongoose.set("debug", true);

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/edit", {
	keepAlive: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

module.exports.User = require("./user");
module.exports.Document = require("./document");
