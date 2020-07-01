import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="container-fluid">
					<Link to="/">
						<img src="" alt="EdIt" />
					</Link>
					<ul className="nav navbar-nav navbar-right">
						<li>
							<Link to="/signup">Sign up</Link>
						</li>
						<li>
							<Link to="/signin">Sign in</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

const mapStatetoProps = (state) => {
	return { currentUser: state.currentUser };
};

export default connect(mapStatetoProps)(Navbar);
