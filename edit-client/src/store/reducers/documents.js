import {
	LOAD_DOCUMENTS,
	DELETE_DOCUMENT,
	CREATE_DOCUMENT,
} from "../actionTypes";

const documents = (state = [], action) => {
	console.log(action.type);
	switch (action.type) {
		case LOAD_DOCUMENTS:
			return [...action.documents];
		case DELETE_DOCUMENT:
			return state.filter((document) => document._id !== action.id);
		case CREATE_DOCUMENT:
			return [...state, action.document];
		default:
			return state;
	}
};

export default documents;
