import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";

const Main = (props) => {
	const { authUser } = props;
	return (
		<div className="container">
			<Switch>
				<Route
					exact
					path="/"
					render={(props) => <Homepage {...props} />}
				/>
				<Route
					exact
					path="/signup"
					render={(props) => (
						<AuthForm
							// errors = {e}
							signUp
							onAuth={authUser}
							heading="Start collaborating"
							buttonText="Sign up"
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/signin"
					render={(props) => (
						<AuthForm
							onAuth={authUser}
							heading="Welcome Back"
							buttonText="Sign in"
							{...props}
						/>
					)}
				/>
			</Switch>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
		// errors: state.errors,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		authUser,
	})(Main)
);
