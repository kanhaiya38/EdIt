import React, { Component } from "react";

class RegisterForm extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props
			.authUser("signup", this.state)
			.then(() => {
				this.props.history.push("/documents");
			})
			.catch(() => {
				return;
			});
	}

	render() {
		const { errors, removeError, history } = this.props;

		history.listen(() => {
			removeError();
		});

		return (
			<div>
				<div className="row justify-content-md-centrer text-center">
					<div className="col-md-6">
						<form onSubmit={this.handleSubmit}>
							<h2>Register</h2>
							{errors.message && (
								<div className="alert alert-danger">
									{errors.message}
								</div>
							)}
							<label htmlFor="username">Username: </label>
							<input
								type="text"
								className="form-control"
								id="username"
								name="username"
								onChange={this.handleChange}
								value={this.state.email}
							/>
							<label htmlFor="password">Password: </label>
							<input
								type="password"
								className="form-control"
								id="password"
								name="password"
								onChange={this.handleChange}
							/>
							<button
								type="submit"
								className="btn btn-primary btn-block btn-lg"
							>
								Register
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default RegisterForm;
