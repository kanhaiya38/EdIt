import React from "react";
import { Link } from "react-router-dom";

const Homepage = ({ currentUser }) => {
	if (!currentUser.isAuthenticated) {
		return (
			<div className="home-hero">
				<h1>Whats Happening?</h1>
				<h4>New to EdIt?</h4>
				<Link to="/signup" className="btn btn-primary">
					Sign up
				</Link>
			</div>
		);
	} else {
		return <div>Hello</div>;
	}
};

export default Homepage;
