import React from "react";
import { Link } from "react-router-dom";
import { Switch, Route, useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Homepage = ({ currentUser }) => {
	if (!currentUser.isAuthenticated) {
		return (
			<div className="home-hero">
				<h1>Whats Happening?</h1>
				<h4>New to EdIt?</h4>
				<Link to="auth/signup" className="btn btn-primary">
					Sign up
				</Link>
			</div>
		);
	} else {
		return <div>Homepage</div>;
	}
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
		errors: state.errors,
	};
};

export default withRouter(connect(mapStateToProps)(Homepage));
