import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "../store";
import Navbar from "./Navbar";
import Main from "./Main";
import MyEditor from "./MyEditor";

const store = configureStore();

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<div className="onboarding">
					<Navbar />
					<Main />
					{/* <MyEditor /> */}
				</div>
			</Router>
		</Provider>
	);
};

export default App;
