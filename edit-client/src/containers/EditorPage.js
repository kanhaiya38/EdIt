import React from "react";
import RichEditor from "../components/RichEditor";
import {
	Switch,
	Route,
	useRouteMatch,
	withRouter,
	useParams,
} from "react-router-dom";
import { connect } from "react-redux";
import { saveDocument, fetchEditorState } from "../store/actions/editor";

const EditorPage = (props) => {
	let match = useRouteMatch();
	let { documentId } = useParams();
	let { errors, currentUser, editor, saveDocument } = props;
	return (
		<Switch>
			<Route exact path={`${match.path}/edit`}>
				<p>{props.match.documentId}</p>
				<RichEditor
					errors={errors}
					currentUser={currentUser}
					documentId={documentId}
					// editor={editor}
					// openEditor={openEditor}
					fetchEditorState={fetchEditorState}
					saveDocument={saveDocument}
				/>
			</Route>
		</Switch>
	);
};

// export default EditorPage;

const mapStateToProps = (state) => {
	return {
		errors: state.errors,
		currentUser: state.currentUser,
		editor: state.editor,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		saveDocument,
		fetchEditorState,
	})(EditorPage)
);
