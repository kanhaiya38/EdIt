import { setHeaderToken, API } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export const setCurrentUser = (user) => {
	return {
		type: SET_CURRENT_USER,
		user,
	};
};

export const setAuthorizationToken = (token) => {
	setHeaderToken(token);
};

export const authUser = (type, userData) => async (dispatch) => {
	try {
		// console.log("i am here");
		// console.log(userData);

		const res = await API.post(`/auth/${type}`, userData);
		// console.log(res);

		const { token, ...user } = res.data;

		localStorage.setItem("jwtToken", token);
		// setHeaderToken(token);
		setAuthorizationToken(token);
		dispatch(setCurrentUser(user));
		dispatch(removeError());
	} catch (err) {
		// console.log(err.message);
		dispatch(addError(err.message));
		throw err;
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
		throw err;
	}
};
