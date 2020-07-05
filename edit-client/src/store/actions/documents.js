import { API } from "../../services/api";
import { addError, removeError } from "./errors";
import {
	LOAD_DOCUMENTS,
	DELETE_DOCUMENT,
	CREATE_DOCUMENT,
} from "../actionTypes";

export const fetch = (documents) => ({
	type: LOAD_DOCUMENTS,
	documents,
});

export const remove = (id) => ({
	type: DELETE_DOCUMENT,
	id,
});

export const create = (document) => ({
	type: CREATE_DOCUMENT,
	document,
});

export const fetchDocuments = (user_id) => async (dispatch) => {
	try {
		// console.log("Loading Documents");
		let res = await API.get(`/users/${user_id}/documents`);
		dispatch(fetch(res.data));
	} catch (err) {
		dispatch(addError(err.message));
	}
};

export const deleteDocument = (userId, documentId) => async (dispatch) => {
	try {
		await API.delete(`users/${userId}/documents/${documentId}`);
		dispatch(remove(documentId));
	} catch (err) {
		dispatch(addError(err.message));
	}
};

export const createDocument = (userId, documentName) => async (dispatch) => {
	try {
		// console.log(user_id);
		// console.log(documentName);

		let res = await API.post(`users/${userId}/documents`, {
			documentName,
		});
		// console.log(res.data);
		dispatch(create(res.data));
	} catch (err) {
		dispatch(addError(err.message));
	}
};
