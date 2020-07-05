import {
	MODIFY_DOCUMENT,
	SAVE_DOCUMENT,
	OPEN_EDITOR,
	SET_CURRENT_EDITOR,
} from "../actionTypes";

const editor = (state = {}, action) => {
	console.log(action.type);
	switch (action.type) {
		case SET_CURRENT_EDITOR:
			console.log("at least here");
			return action.editor;
		// case SAVE_DOCUMENT:
		// 	let newState = state.filter(
		// 		(document) => document._id !== action.document.id
		// 	);
		// 	return [...newState, action.document];
		default:
			return state;
	}
};

export default editor;
