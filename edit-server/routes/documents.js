const express = require("express");
const router = express.Router();

// /api/users/:user_id/documents => get => list of user's documents
// /api/users/:user_id/documents => post => create a new document
router.route("/documents").get(getiAllDocuments).post(createDocument);

// /api/users/:user_id/documents/:document_id => get =>  edit the document
// /api/users/:user_id/documents/:document_id => post =>  add a collaborator
// /api/users/:user_id/documents/:document_id => delete => delete the document
router
	.route("/documents/:document_id")
	.get(getDocument)
	.post(addCollaborator)
	.delete(deleteDocument);
