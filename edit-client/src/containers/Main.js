import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import EditorPage from "./EditorPage";
import DocumentsPage from "./DocumentsPage";
import AuthPage from "./AuthPage";

const Main = (props) => {
	return (
		<div className="container">
			<Switch>
				<Route exact path="/">
					<Homepage />
				</Route>
				<Route path="/auth">
					<AuthPage />
				</Route>
				<Route exact path="/documents">
					<DocumentsPage />
				</Route>
				<Route
					// exact
					path="/documents/:documentId"
					// render={(props) => <div>{props.match.documentId}</div>}
					// component={EditorPage}
				>
					<EditorPage />
				</Route>
			</Switch>
		</div>
	);
};

export default Main;
