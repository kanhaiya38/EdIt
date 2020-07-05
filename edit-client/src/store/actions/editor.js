import { API } from "../../services/api";
import { addError, removeError } from "./errors";
import { SAVE_DOCUMENT, SET_CURRENT_EDITOR } from "../actionTypes";

export const setCurrentEditor = (editor) => ({
	type: "SET_CURRENT_EDITOR",
	editor,
});

// export const modify = (document) => ({
// 	type: MODIFY_DOCUMENT,
// 	document,
// });

export const save = (document) => ({
	type: SAVE_DOCUMENT,
	document,
});

export const fetchEditorState = (userId, documentId) => async (dispatch) => {
	try {
		console.log("getting editor state");
		let res = await API.get(`users/${userId}/documents/${documentId}`);
		dispatch(setCurrentEditor(res.data));
	} catch (err) {
		dispatch(addError(err));
	}
};

export const saveDocument = (userId, documentId, content) => async (
	dispatch
) => {
	try {
		let res = await API.post(`users/${userId}/documents/${documentId}`, {
			content,
		});
		console.log(res.data);
		dispatch(save(res.data));
	} catch (err) {
		dispatch(addError(err));
		throw err;
	}
};

// export const addCollaborator = (userId, documentId, username) => async (
// 	dispatch
// ) => {
// 	try {
// 		console.log("hey i am here");
// 		let res = await API.post(`users/${userId}/documents/${documentId}`, {
// 			username,
// 		});
// 		dispatch(modify(res.data));
// 	} catch (err) {
// 		dispatch(addError(err.message));
// 		throw err;
// 	}
// };
