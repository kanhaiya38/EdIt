import React, { Component } from "react";
import DocumentItem from "../components/DocumentItem";
import { setCurrentEditor } from "../store/actions/editor";

class DocumentList extends Component {
	componentDidMount() {
		this.props.fetchDocuments(this.props.currentUser.user.id);
	}

	render() {
		let {
			currentUser,
			documents,
			deleteDocument,
			// setCurrentEditor,
		} = this.props;
		// let setCurrentEditor = (i, j) => console.log("stuck " + i + j);
		console.log(this.props);
		let documentList = documents.map(
			({ _id, createdAt, documentName, author }) => {
				return (
					<DocumentItem
						key={_id}
						id={_id}
						date={createdAt}
						documentName={documentName}
						author={author.username}
						// setCurrentEditor={setCurrentEditor.bind(
						// 	this,
						// 	author._id,
						// 	_id
						// )}
						deleteDocument={deleteDocument.bind(
							this,
							author._id,
							_id
						)}
						isCorrectUser={currentUser.user.id === author._id}
					/>
				);
			}
		);
		return (
			<div>
				<div className="offset-1 col-sm-10">
					<ul className="list-group" id="documents">
						{documentList}
					</ul>
				</div>
			</div>
		);
	}
}

export default DocumentList;
