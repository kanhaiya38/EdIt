import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import EditorPage from "./EditorPage";
import DocumentsPage from "./DocumentsPage";
import AuthPage from "./AuthPage";

const Main = () => {
	return (
		<div className="container">
			<Switch>
				<Route exact path="/">
					<Homepage />
				</Route>
				<Route path="/auth">
					<AuthPage />
				</Route>
				<Route path="/documents">
					<DocumentsPage />
				</Route>
				<Route
					path="/document/:documentId"
				>
					<EditorPage />
				</Route>
			</Switch>
		</div>
	);
};

export default Main;
