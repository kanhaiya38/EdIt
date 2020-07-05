import React, { Component } from "react";
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
import createToolbarPlugin, { Separator } from "draft-js-static-toolbar-plugin";
import {
	ItalicButton,
	BoldButton,
	UnderlineButton,
	CodeButton,
	HeadlineOneButton,
	HeadlineTwoButton,
	HeadlineThreeButton,
	UnorderedListButton,
	OrderedListButton,
	BlockquoteButton,
	CodeBlockButton,
} from "draft-js-buttons";

import { addCollaborator } from "../store/actions/documents";

import "draft-js-static-toolbar-plugin/lib/plugin.css";
import editorStyles from "./editorStyles.css";
import { setCurrentEditor } from "../store/actions/editor";
// import buttonStyles from "./buttonStyles.css";
// import toolbarStyles from "./toolbarStyles.css";
// =========================== SOCKET.IO =================================
// import { API } from "../services/api";
// import io from "socket.io-client";
// import { openEditor } from "../store/actions/editor";
// const socket = io("http://localhost:5000");
// ======================================================================
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];
const text = "Hey you start writing";

class RichEditor extends Component {
	constructor() {
		super();
		this.state = {
			editorState: createEditorStateWithText(text),
			collaborator: "",
		};
		// this.onChange = (editorState) => this.setState({ editorState });
		this.onChange = this.onChange.bind(this);
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
		this.focusEditor = this.focusEditor.bind(this);
		this.saveContent = this.saveContent.bind(this);
	}

	componentDidMount() {
		// fetchEditorContent();
		let { currentUser, documentId } = this.props;
		// console.log(currentUser.user.id + " " + documentId);
		this.props.fetchEditorState(currentUser.user.id, documentId);
		// let content = convertFromRaw(rawContent);
		// if (content) {
		// } else {
		// this.setState({ editorState: EditorState.createEmpty() });
		// }
		// if (rawContent) {
		// 	this.setState({
		// 		editorState: EditorState.createWithContent(
		// 			convertFromRaw(rawContent)
		// 		),
		// 	});
		// } else {
		// 	this.setState({ editorState: EditorState.createEmpty() });
		// }
	}

	onChange(editorState) {
		this.setState({ editorState });
		// socket.emit("doc", convertToRaw(editorState.currentContent));
		// socket.emit("doc", editorState);
	}

	handleKeyCommand(command) {
		let newState = RichUtils.handleKeyCommand(
			this.state.editorState,
			command
		);
		if (newState) {
			this.onChange(newState);
			return "handled";
		}
		return "not-handled";
	}

	// setEditor(editor) {
	// 	this.editor = editor;
	// }

	focusEditor() {
		this.editor.focus();
	}

	saveContent() {
		let contentState = this.state.editorState.getCurrentContent();
		// let contentState = editorState.getCurrentContent();
		let rawContent = convertToRaw(contentState);
		console.log(rawContent);
		this.props.saveDocument(JSON.stringify(rawContent));
	}

	render() {
		return (
			<div className="container">
				<h1>Editor</h1>
				{/* <form
					onSubmit={(event) => {
						event.preventDefault();
						console.log(this.state.collaborator);
						addCollaborator(this.props.currentUser, this.state.collaborator);
					}}
					className="form-inline"
				>
					<input
						className="form-control"
						value={this.state.collaborator}
						onChange={(e) =>
							this.setState({ collaborator: e.target.value })
						}
					></input>
					<button className="btn btn-primary">
						add collaborator
					</button>
				</form> */}
				<button
					className="btn btn-primary btn-sm"
					onClick={this.saveContent}
				>
					Save
				</button>
				<div
					className={editorStyles.editor}
					style={{
						// border: "10px solid black",
						boxShadow: "inset 0px 1px 8px -3px #ababab",
					}}
					onClick={this.focusEditor}
				>
					<Toolbar>
						{(externalProps) => (
							<div>
								<BoldButton {...externalProps} />
								<ItalicButton {...externalProps} />
								<UnderlineButton {...externalProps} />
								<CodeButton {...externalProps} />
								<Separator {...externalProps} />
								{/* <HeadlinesButton {...externalProps} /> */}
								<HeadlineOneButton {...externalProps} />
								<HeadlineTwoButton {...externalProps} />
								<HeadlineThreeButton {...externalProps} />
								<Separator {...externalProps} />
								<UnorderedListButton {...externalProps} />
								<OrderedListButton {...externalProps} />
								<BlockquoteButton {...externalProps} />
								<CodeBlockButton {...externalProps} />
							</div>
						)}
					</Toolbar>
					<Editor
						editorState={this.state.editorState}
						onChange={this.onChange}
						// handleKeyCommand={this.handleKeyCommand}
						plugins={plugins}
						ref={(element) => {
							this.editor = element;
						}}
					/>
				</div>
			</div>
		);
	}
}

export default RichEditor;
