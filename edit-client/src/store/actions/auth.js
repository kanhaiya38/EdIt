import { setHeaderToken, API } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export const setCurrentUser = (user) => {
	return {
		type: SET_CURRENT_USER,
		user,
	};
};

export const authUser = (type, userData) => async (dispatch) => {
	try {
		await console.log("i am here");
		const res = await API.post("/auth/signup", userData);
		const { token, ...user } = res.data;
		localStorage.setItem("jwtToken", token);
		setHeaderToken(token);
		dispatch(setCurrentUser(user));
		dispatch(removeError());
	} catch (err) {
		dispatch(addError(err.message));
	}
};

export const logout = () => async (dispatch) => {
	try {
		localStorage.clear();
		setHeaderToken(false);
		dispatch(setCurrentUser({}));
		dispatch(removeError());
	} catch (err) {
		dispatch(addError(err.message));
	}
};
