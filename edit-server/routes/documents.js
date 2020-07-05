const express = require("express");
const router = express.Router({ mergeParams: true });
// const {  } = require("../handlers/document");
const {
	getAllDocuments,
	createDocument,
	getDocument,
	saveDocument,
	addCollaborator,
	deleteDocument,
} = require("../handlers/document");

// /api/users/:user_id/documents => get => list of user's documents
// /api/users/:user_id/documents => post => create a new document
router.route("/documents").get(getAllDocuments).post(createDocument);

// /api/users/:user_id/documents/:document_id => get =>  edit the document
// /api/users/:user_id/documents/:document_id => post =>  save the document
// /api/users/:user_id/documents/:document_id => delete => delete the document
router
	.route("/documents/:document_id")
	.get(getDocument)
	.post(saveDocument)
	.delete(deleteDocument);

module.exports = router;
