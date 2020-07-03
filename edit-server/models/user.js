const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	// Public Key
	// uniqueId: {
	//     type: String,
	//     required: true,
	//     unique: true
	// },
	password: {
		type: String,
		required: true,
	},
	documents: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Document"
	}]
});

userSchema.pre("save", async function (next) {
	try {
		if (!this.isModified("password")) {
			return next();
		}
		let hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		return next();
	} catch (err) {
		return next(err);
	}
});

userSchema.methods.comparePassword = async function (candidatePassword, next) {
	try {
		isMatch = bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch (err) {
		next(err);
	}
};

userSchema.statics.findByUsername = async function (candidateUsername, next) {
	try {
		return this.findOne({ username: candidateUsername });
	} catch (err) {
		next(err);
	}
};

const User = mongoose.model("User", userSchema);

module.exports = User;
