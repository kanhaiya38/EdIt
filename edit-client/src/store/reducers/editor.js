import { SET_EDITOR_STATE, SAVE_EDITOR_STATE } from "../actionTypes";

const editor = (state = {}, action) => {
	switch (action.type) {
		case SET_EDITOR_STATE:
			return action.editor;
		case SAVE_EDITOR_STATE:
			return { ...state, content: action.editor.content };
		default:
			return state;
	}
};

export default editor;
