const mongoose = require("mongoose");
// const User = require("./user");
const updateVersioningPlugin = require("mongoose-update-versioning");
const autopopulate = require("mongoose-autopopulate");

const documentSchema = new mongoose.Schema(
	{
		documentName: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			// autopopulate: { select: "username", maxDepth: 2 },
		},
		collaborators: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				autopopulate: { select: "username" },
			},
			// {
			// 	selectPopulatedPaths: false,
			// },
		],
		content: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
		selectPopulatedPaths: false,
	}
);

// documentSchema.pre("remove", async function (next) {
// 	try {
// 		// let foundUser = await User.findById(this.)
// 		let foundDocument = await Document.findById(req.params.document_id);
// 		foundDocument.collaborators.forEach(collaborator => {
// 			let foundCollaborator
// 		});
// 	} catch(err) {
// 		next(err);
// 	}
// })

documentSchema.plugin(autopopulate);
documentSchema.plugin(updateVersioningPlugin);
// documentSchema.options.selectPopulatedPaths = false;

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
