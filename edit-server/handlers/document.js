const db = require("../models");

module.exports.getAllDocuments = async (req, res, next) => {
	try {
		let foundUser = await db.User.findById(req.params.user_id);

		let documents = await Promise.all(
			foundUser.documents.map(async (document) => {
				foundDocument = await db.Document.findById(document).populate(
					"author",
					{
						username: true,
					}
				);
				return foundDocument;
			})
		);

		return res.status(200).json(documents);
	} catch (err) {
		next(err);
	}
};

module.exports.createDocument = async (req, res, next) => {
	try {
		console.log(req.params);
		console.log(req.body);
		let document = await db.Document.create({
			documentName: req.body.documentName,
			author: req.params.user_id,
		});

		document.collaborators.push(document.author);
		await document.save();

		let foundUser = await db.User.findById(req.params.user_id);
		foundUser.documents.push(document.id);
		await foundUser.save();
		console.log(document);
		return res.status(200).json(document);
	} catch (err) {
		next(err);
	}
};

module.exports.getDocument = async (req, res, next) => {
	try {
		let foundDocument = await db.Document.findById(req.params.document_id);
		return res.status(200).json(foundDocument);
	} catch (err) {
		next(err);
	}
};

module.exports.saveDocument = async (req, res, next) => {
	try {
		console.log("I am here");
		let foundDocument = await db.Document.findById(req.params.document_id);
		// let foundDocument = await db.Document.findByIdAndUpdate()
		console.log("body" + req);
		// foundDocument.content = req.body.content;
		await foundDocument.updateOne({ content: req.body.content });
		// await foundDocument.save();
		return res.status(200).json(foundDocument);
	} catch (err) {
		next(err);
	}
};

module.exports.deleteDocument = async (req, res, next) => {
	try {
		let foundDocument = await db.Document.findById(req.params.document_id);
		// let collaborators = await Promise.all(
		// 	foundDocument.collaborators.map(async (collaborator) => {
		// 		foundCollaborator = await db.Document.findById(collaborator);
		// 		foundCollaborator.documents.filter(
		// 			(doc) => doc !== req.params.id
		// 		);
		// 		await collaborator.save();
		// 	})
		// );
		await foundDocument.remove();
		return res.status(200).json(foundDocument);
	} catch (err) {
		next(err);
	}
};

module.exports.addCollaborator = async (req, res, next) => {
	try {
		let foundDocument = await db.Document.findById(req.params.document_id);
		console.log("Adding collaborator");
		console.log(req.body);
		console.log(foundDocument);
		let foundUser = await db.User.findOne({
			username: req.body.username,
		});
		console.log(foundUser);
		foundUser.documents.push(foundDocument.id);
		await foundUser.save();
		foundDocument.collaborators.push(foundUser.id);
		await foundDocument.save();
		return res.status(200).json(foundDocument);
	} catch (err) {
		next(err);
	}
};

module.exports.removeCollaborator = async (req, res, next) => {
	try {
		let foundUser = await db.User.find({
			username: req.body.username,
		});
		foundUser.do;
		await foundUser.save();
		let foundDocument = await db.Document.findById(req.params.document_id);
		foundDocument.collaborators.push(foundUser.id);
		await foundDocument.save();
	} catch (err) {
		next(err);
	}
};
