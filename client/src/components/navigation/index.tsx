import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {login, logout} from "../../actions/auth";

import logo from '../../media/navbar_logo.png';
import styles from "../../styles/form.module.scss";
interface Props {
  logOut: () => void;
  state: {
    showModeratorBoard: boolean,
    showAdminBoard: boolean,
    currentUser: any,
  }
}

interface Props {
  user: string;
  dispatch: any;
}
interface State {
  showModeratorBoard: boolean;
  showAdminBoard: boolean;
  currentUser: Props["user"];
}

class Navigation extends Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: props.user,
    };
  }

  logOut() {
    this.props.dispatch(logout());
    window.location.reload();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            <img src={logo} alt="" width="200" height="75"/>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {currentUser ? (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">Muj Profil</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/contact_us"} className="nav-link">Kontakt</Link>
                </li>
                <li className="nav-item">
                  <button className={styles.logout + ' nav-link'} onClick={ this.logOut }>Odhlasit se</button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">Přihlášení</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/contact_us"} className="nav-link">Kontakt</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      // <nav className="navbar navbar-expand navbar-dark bg-dark">
      //   <Link to={"/"} className="navbar-brand">
      //     bezKoder
      //   </Link>
      //   <div className="navbar-nav mr-auto">
      //     <li className="nav-item">
      //       <Link to={"/home"} className="nav-link">
      //         Home
      //       </Link>
      //     </li>
      //
      //     {showModeratorBoard && (
      //       <li className="nav-item">
      //         <Link to={"/mod"} className="nav-link">
      //           Moderator Board
      //         </Link>
      //       </li>
      //     )}
      //
      //     {showAdminBoard && (
      //       <li className="nav-item">
      //         <Link to={"/admin"} className="nav-link">
      //           Admin Board
      //         </Link>
      //       </li>
      //     )}
      //
      //     {currentUser && (
      //       <li className="nav-item">
      //         <Link to={"/user"} className="nav-link">
      //           User
      //         </Link>
      //       </li>
      //     )}
      //   </div>
      //
      //   {currentUser ? (
      //     <div className="navbar-nav ml-auto">
      //       <li className="nav-item">
      //         <Link to={"/profile"} className="nav-link">
      //           {currentUser.username}
      //         </Link>
      //       </li>
      //       <li className="nav-item">
      //         <a href="/login" className="nav-link" onClick={this.logOut}>
      //           LogOut
      //         </a>
      //       </li>
      //     </div>
      //   ) : (
      //     <div className="navbar-nav ml-auto">
      //       <li className="nav-item">
      //         <Link to={"/login"} className="nav-link">
      //           Login
      //         </Link>
      //       </li>
      //
      //       <li className="nav-item">
      //         <Link to={"/register"} className="nav-link">
      //           Sign Up
      //         </Link>
      //       </li>
      //     </div>
      //   )}
      // </nav>
    )
  }
}

function mapStateToProps(state: any) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Navigation);
