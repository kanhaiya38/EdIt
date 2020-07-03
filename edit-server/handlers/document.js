const db = require("../models");

module.exports.getAllDocuments = async (req, res, next) => {
	try {
		let user = await db.User.findById(req.params.user_id);
		return res.status(200).json(user.documents);
	} catch (err) {
		next(err);
	}
};

module.exports.createDocument = async (req, res, next) => {
	try {
		let document = await db.Document.create({
			documentName: req.body.documentName,
			author: req.params.user_id,
        });
        
		document.collaborators.push(document.author);
		await document.save();
        
        let foundUser = await db.User.findById(req.params.user_id);
		foundUser.documents.push(document.id);
		await foundUser.save();
        
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

module.exports.addCollaborator = async (req, res, next) => {
    try {
        let foundUser = await db.User.find({
            username: req.body.username,
        });
        foundUser.documents.push(req.params.document_id);
        await foundUser.save();
        let foundDocument = await db.Document.findById(req.params.document_id);
        foundDocument.collaborators.push(foundUser.id);
        await foundDocument.save();
    } catch(err) {
        next(err)
    }
}

module.exports.removeCollaborator = async(req, res, next) => {
    try {
        let foundUser = await db.User.find({
            username: req.body.username,
        });
        foundUser.do
        await foundUser.save();
        let foundDocument = await db.Document.findById(req.params.document_id);
        foundDocument.collaborators.push(foundUser.id);
        await foundDocument.save();
    } catch(err) {
        next(err);
    }
}

// module.exports.saveDocument = async (req, res, next) => {
// 	try {
// 	} catch (err) {
// 		next(err);
// 	}
// };

// module.exports.deleteDocument = async (req, res, next) => {
// 	try {
//         let foundDocument = await db.Document.findById(req.params.document_id);
//         foundDocument.collaborators.forEach(collaborator => {
//             let foundUser = await db.User.findById(collaborator);
//             foundUser.document.fin
//         });
//         await foundDocument.remove();
//         return res.status(200).json(foundDocument);
// 	} catch (err) {
// 		next(err);
// 	}
// };
