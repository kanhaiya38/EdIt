import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { configureStore } from "../store";
import Navbar from "./Navbar";
import Main from "./Main";
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";

const store = configureStore();

if (localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	try {
		let decodedToken = jwtDecode(localStorage.jwtToken);
		store.dispatch(setCurrentUser(decodedToken));
	} catch (err) {
		store.dispatch(setCurrentUser({}));
	}
}

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<div className="onboarding">
					<Navbar />
					<Main />
				</div>
			</Router>
		</Provider>
	);
};

export default App;
