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
import "draft-js-static-toolbar-plugin/lib/plugin.css";
import editorStyles from "./editorStyles.css";
import { fetchEditorState } from "../store/actions/editor";
import currentUser from "../store/reducers/currentUser";
// =========================== SOCKET.IO =================================
// import { API } from "../services/api";
// import io from "socket.io-client";
// ======================================================================
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];
const text = "Loading";

class RichEditor extends Component {
	constructor() {
		super();
		this.state = {
			editorState: createEditorStateWithText(text),
		};
		this.onChange = this.onChange.bind(this);
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
		this.focusEditor = this.focusEditor.bind(this);
		this.saveContent = this.saveContent.bind(this);
		// this.socket = io.connect("http://localhost:5000");
		// this.socket.on("doc", (content) => {
		// 	let newContentState = convertFromRaw(JSON.parse(content));
		// 	// console.log(convertToRaw(newContentState));
		// 	let newEditorState = EditorState.createWithContent(newContentState);
		// 	if (newEditorState !== this.state.editorState) {
		// 		this.setState({ editorState: newEditorState });
		// 	}
		// });
	}

	componentDidMount() {
		let { editor, fetchEditorState, currentUser, documentId } = this.props;
		fetchEditorState(currentUser.user.id, documentId)
			.then((res) => res)
			.then((res, err) => {
				if (err) {
					return;
				}
				console.log(res);
				let rawContent = res.content;
				if (rawContent !== "") {
					let contentState = convertFromRaw(rawContent);
					let newEditorState = EditorState.createWithContent(
						contentState
					);
					this.setState({ editorState: newEditorState });
				} else {
					this.setState({ editorState: EditorState.createEmpty() });
				}
			});
	}
	onChange(editorState) {
		// let { previousState, editorState } = this.state;
		// let currentContent = editorState.getCurrentContent();
		// this.socket.emit("doc", JSON.stringify(convertToRaw(currentContent)));
		// this.setState({ previousState: this.state.editorState });
		this.setState({ editorState });
		// socket.on("doc", (data) => {
		// 	let jsonData = JSON.parse(data);
		// 	let rawContent = convertFromRaw(jsonData);
		// 	this.setState({
		// 		editorState: EditorState.createWithContent(rawContent),
		// 	});
		// });
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

	focusEditor() {
		this.editor.focus();
	}

	saveContent() {
		let { currentUser, documentId, saveEditorState } = this.props;
		let contentState = this.state.editorState.getCurrentContent();
		// let contentState = editorState.getCurrentContent();
		let rawContent = convertToRaw(contentState);
		let content = JSON.stringify(rawContent);
		saveEditorState(currentUser.user.id, documentId, content);
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
						handleKeyCommand={this.handleKeyCommand}
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
