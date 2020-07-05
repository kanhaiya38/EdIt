import React from "react";
import { useRouteMatch, Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

const AuthPage = (props) => {
	let match = useRouteMatch();
	let { errors, removeError, authUser } = props;
	return (
		<Switch>
			<Route path={`${match.path}/signup`}>
				<RegisterForm
					errors={errors}
					removeError={removeError}
					authUser={authUser}
					{...props}
				/>
			</Route>
			<Route path={`${match.path}/signin`}>
				<LoginForm
					errors={errors}
					removeError={removeError}
					authUser={authUser}
					{...props}
				/>
			</Route>
		</Switch>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
		errors: state.errors,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		authUser,
		removeError,
	})(AuthPage)
);
