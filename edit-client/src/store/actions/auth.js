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
		const res = await API.post(`/auth/${type}`, userData);
		const { token, ...user } = res.data;

		localStorage.setItem("jwtToken", token);
		setAuthorizationToken(token);
		dispatch(setCurrentUser(user));
		dispatch(removeError());
	} catch (err) {
		dispatch(addError(err.message));
		throw err;
	}
};

export const logout = () => async (dispatch) => {
	try {
		localStorage.clear();
		setHeaderToken(false);
		dispatch(setCurrentUser({}));
	} catch (err) {
		dispatch(addError(err.message));
		throw err;
	}
};
