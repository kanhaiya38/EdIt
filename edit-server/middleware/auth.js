require("dotenv").load();
var jwt = require("jsonwebtoken");

exports.loginRequired = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		await jwt.verify(token, process.env.SECRET_KEY, function (
			err,
			decoded
		) {
			if (decoded) {
				next();
			} else {
				return next({ status: 401, message: "Please Log In First" });
			}
		});
	} catch (e) {
		return next({ status: 401, message: "Please Log In First" });
	}
};

exports.ensureCorrectUser = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		await jwt.verify(token, process.env.SECRET_KEY, function (
			err,
			decoded
		) {
			if (decoded && decoded.id === req.params.id) {
				return next();
			} else {
				return next({ status: 401, message: "Unauthorized" });
			}
		});
	} catch (e) {
		return next({ status: 401, message: "Unauthorized" });
	}
};
