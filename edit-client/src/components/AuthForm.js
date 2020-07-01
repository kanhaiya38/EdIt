import React, { Component } from "react";

class AuthForm extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	async handleSubmit(event) {
		try {
			event.preventDefault();
			const authType = this.props.signUp ? "signup" : "signin";
			console.log(this.state);

			this.props.onAuth(authType, this.state);
			this.props.history.push("/");
		} catch (err) {
			return;
		}
	}

	render() {
		const { username, password } = this.state;
		const { heading, buttonText } = this.props;
		return (
			<div>
				<div className="row justify-content-md-centrer text-center">
					<div className="col-md-6">
						<form onSubmit={this.handleSubmit}>
							<h2>{heading}</h2>
							<label htmlFor="username">Username: </label>
							<input
								type="text"
								className="form-control"
								id="username"
								name="username"
								onChange={this.handleInputChange}
								value={this.state.email}
							/>
							<label htmlFor="password">Password: </label>
							<input
								type="password"
								className="form-control"
								id="password"
								name="password"
								onChange={this.handleInputChange}
							/>
							<button
								type="submit"
								className="btn btn-primary btn-large"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AuthForm;
