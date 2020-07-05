import React, { Component } from "react";
import DocumentItem from "../components/DocumentItem";

class DocumentList extends Component {
	componentDidMount() {
		let res = this.props.fetchDocuments(this.props.currentUser.user.id);
		console.log(res);
	}

	render() {
		let {
			currentUser,
			documents,
			deleteDocument,
		} = this.props;
		let documentList = documents.map(
			({ _id, createdAt, documentName, author }) => {
				return (
					<DocumentItem
						key={_id}
						id={_id}
						date={createdAt}
						documentName={documentName}
						author={author.username}
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
