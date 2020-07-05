import { combineReducers } from "redux";
import errors from "./errors";
import currentUser from "./currentUser";
import documents from "./documents";
import editor from "./editor";

const rootReducer = combineReducers({
	errors,
	currentUser,
	documents,
	editor,
});

export default rootReducer;
