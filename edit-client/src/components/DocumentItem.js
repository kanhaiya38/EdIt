import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const DocumentItem = ({
	id,
	date,
	documentName,
	author,
	deleteDocument,
	isCorrectUser,
	// setCurrentEditor,
}) => {
	console.log(id);
	return (
		<div>
			<li className="list-group-item my-3">
				<Link to={`documents/${id}/edit`} >
					<h5>{documentName}</h5>
				</Link>
				<div className="message-area">
					<Link to="/">@{author} &nbsp;</Link>
					<span className="text-muted">
						<Moment className="text-muted" format="DD-MM-YYYY">
							{date}
						</Moment>
					</span>
					{/* {isCorrectUser && (
						<Link
							className="btn btn-danger"
							onClick={deleteDocument}
						>
							Delete
						</Link>
					)} */}
				</div>
			</li>
		</div>
	);
};

export default DocumentItem;
