import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

class Navbar extends Component {
	logout(e) {
		e.preventDefault();
		this.props.logout();
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<Link to="/" className="navbar-brand">
						EdIt
					</Link>
					{this.props.currentUser.isAuthenticated ? (
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to="/documents/new" className="nav-link">
									Create a New Document
								</Link>
							</li>
							{/* <li className="nav-item">
								<Link to="/" className="nav-link">
									{this.props.currentUser.user.username}
								</Link>
							</li> */}
							<li className="nav-item">
								<a
									href="/"
									onClick={this.logout.bind(this)}
									className="nav-link"
								>
									logout
								</a>
							</li>
						</ul>
					) : (
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<NavLink
									// to={{ pathname: "/auth/signup" }}
									to="/auth/signup"
									className="nav-link"
								>
									Register
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									// to={{ pathname: "/auth/signin" }}
									to="/auth/signin"
									className="nav-link"
								>
									Login
								</NavLink>
							</li>
						</ul>
					)}
				</div>
			</nav>
		);
	}
}

const mapStatetoProps = (state) => {
	return { currentUser: state.currentUser };
};

export default connect(mapStatetoProps, { logout })(Navbar);
