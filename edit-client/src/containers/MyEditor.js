import React, { Component } from "react";
import { EditorState, RichUtils } from "draft-js";
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
// import buttonStyles from "./buttonStyles.css";
// import toolbarStyles from "./toolbarStyles.css";

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];
const text = "Hey you start writing";

class HeadlinesPicker extends Component {
	componentDidMount() {
		setTimeout(() => {
			window.addEventListener("click", this.onWindowClick);
		});
	}

	UNSAFE_componentWillMount() {
		window.removeEventListener("click", this.onWindowClick);
	}

	onWindowClick = () => {
		this.props.onOverrideContent(undefined);
	};

	render() {
		const buttons = [
			HeadlineOneButton,
			HeadlineTwoButton,
			HeadlineThreeButton,
		];

		// console.log(editorStyles);
		// console.log("het");

		return (
			<div>
				{buttons.map((Button, id) => (
					<Button key={id} {...this.props} />
				))}
			</div>
		);
	}
}
class HeadlinesButton extends Component {
	onClick = () => {
		this.props.onOverrideContent(HeadlinesPicker);
	};

	render() {
		// console.log(editorStyles);
		return (
			<div style={{ display: "inline-block" }}>
				<button
					onClick={this.onClick}
					className={editorStyles.headlineButton}
					style={{
						background: "#fbfbfb",
						color: "#888",
						fontSize: "18px",
						border: "0",
						paddingTop: "5px",
						verticalAlign: "bottom",
						height: "34px",
						width: "36px",
					}}
				>
					H
				</button>
			</div>
		);
	}
}

class MyEditor extends Component {
	constructor() {
		super();
		this.state = { editorState: createEditorStateWithText(text) };
		// this.onChange = (editorState) => this.setState({ editorState });
		this.onChange = this.onChange.bind(this);
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
		this.focusEditor = this.focusEditor.bind(this);
	}

	onChange(editorState) {
		this.setState({ editorState });
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

	render() {
		console.log(editorStyles.editor);
		console.log("help");

		return (
			<div className="container">
				<h1>Editor</h1>
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
								<HeadlinesButton {...externalProps} />
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

// const styles = {
// 	editor: {
// 		border: "1px solid grey",
// 		minHeight: "6em",
// 	},
// };

export default MyEditor;
