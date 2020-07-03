const mongoose = require("mongoose");
// const User = require("./user");

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
		},
		collaborators: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		content: {
			type: String,
		},
	},
	{
		timestamps: true,
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

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
