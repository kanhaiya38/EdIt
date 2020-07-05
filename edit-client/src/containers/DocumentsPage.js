import React from "react";
import { Switch, Route, useRouteMatch, withRouter } from "react-router-dom";
import DocumentList from "../components/DocumentList";
import DocumentForm from "../components/DocumentForm";
import { connect } from "react-redux";
import {
	fetchDocuments,
	deleteDocument,
	createDocument,
} from "../store/actions/documents";

const DocumentsPage = (props) => {
	let match = useRouteMatch();
	let {
		currentUser,
		documents,
		errors,
		fetchDocuments,
		deleteDocument,
		createDocument,
	} = props;
	return (
		<Switch>
			<Route exact path={`${match.path}/`}>
				<DocumentList
					errors={errors}
					currentUser={currentUser}
					documents={documents}
					fetchDocuments={fetchDocuments}
					deleteDocument={deleteDocument}
				/>
			</Route>
			<Route exact path={`${match.path}/new`}>
				<DocumentForm
					errors={errors}
					currentUser={currentUser}
					createDocument={createDocument}
					{...props}
				/>
			</Route>
		</Switch>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
		documents: state.documents,
		errors: state.errors,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		fetchDocuments,
		deleteDocument,
		createDocument,
	})(DocumentsPage)
);
