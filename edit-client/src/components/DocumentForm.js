import React, { Component } from "react";
// import { connect } from "react-redux";
// import { createDocument } from "../store/actions/documents";

class DocumentForm extends Component {
	constructor() {
		super();
		this.state = { documentName: "" };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ documentName: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.createDocument(
			this.props.currentUser.user.id,
			this.state.documentName
		);
		this.setState({ documentName: "" });
		this.props.history.push("/documents");
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="form-inline my-5">
				<div className="form-group mb-2">
					<label className="" htmlFor="documentName">
						Document Name
					</label>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						id="documentName"
						name="documentName"
						value={this.state.documentName}
						onChange={this.handleChange}
						// placeholder="Jane Doe"
					/>
				</div>
				<button type="submit" className="btn btn-primary mb-2">
					Submit
				</button>
			</form>
		);
	}
}

export default DocumentForm;
