import { API } from "../../services/api";
import { SET_EDITOR_STATE, SAVE_EDITOR_STATE } from "../actionTypes";
import { addError } from "./errors";

export const setEditorState = (editor) => ({
	type: SET_EDITOR_STATE,
	editor,
});

export const saveEditor = (editor) => ({
	type: SAVE_EDITOR_STATE,
	editor,
});

export const fetchEditorState = (userId, documentId) => async (dispatch) => {
	try {
		let res = await API.get(`users/${userId}/documents/${documentId}`);
		dispatch(setEditorState(res.data));
		return res.data;
	} catch (err) {
		dispatch(addError(err.message));
		throw err;
	}
};

export const saveEditorState = (userId, documentId, content) => async (
	dispatch
) => {
	try {
		console.log(typeof content);
		let res = await API.patch(`users/${userId}/documents/${documentId}`, {
			content,
		});
		console.log(res.data);
		dispatch(saveEditor(res.data));
	} catch (err) {
		dispatch(addError(err.message));
	}
};
// export const fetchEditorState = (userId, documentId) => async (dispatch) => {
// 	try {
// 		let res = await API.get(`users/${userId}/documents/${documentId}`);
// 		dispatch(setEditorState(res.data));
// 	} catch (err) {
// 		dispatch(addError(err));
// 	}
// };
