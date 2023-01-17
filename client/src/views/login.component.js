import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { toast } from 'react-toastify';
import { login } from "../actions/auth";
import styles from "../styles/form.module.scss";

const emailFormat = (value) => {
  if (!value || value === '') {
    return true;
  } else {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!value.match(emailRegex);
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.validateBeforeSend = this.validateBeforeSend.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: '',
      emailValid: true,
      emailFormatValid: true,
      password: '',
      passwordValid: true,
      loading: false,

      currentUser: null,
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  validateBeforeSend() {
    const email = !(!this.state.email || this.state.email === "");
    const password = !(!this.state.password || this.state.password === "");
    this.setState({
      emailValid: email,
      passwordValid: password,
    });

    return email && password;
  }

  handleMessage(e) {
    e.preventDefault();
    const valid = this.validateBeforeSend();
    console.log('validate before send', valid);
    if (valid) {
      this.setState({
        sendingMessage: true,
      });

      const data = {
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        content: this.state.content,
        gdpr: this.state.gdpr,
      }

      console.log('odeslat formular', e, data)
    }
  }

  handleLogin(e) {
    e.preventDefault();

    const valid = this.validateBeforeSend();
    console.log('validate before send', valid);
    if (valid) {
      this.setState({
        loading: true,
      });
      const { dispatch, history } = this.props;
      dispatch(login(this.state.email, this.state.password))
        .then(() => {
          history.push("/profile");
          window.location.reload();
          toast.success('Přihlášení bylo úspěšné');
        })
        .catch(() => {
          toast.error(this.props.message);
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/profile" />;
    }

    return (
      <div className={styles.pageForm + ' row'}>
        <div className="col-6 offset-3 text-center">
          <h1 className="microbagr-green-color">Přihlásit se</h1>
          <form
              className="text-center border border-light p-5"
              onSubmit={this.handleLogin}
          >
            <div className="row">
              <div className="col-12 pt-1">
                <div className="md-form">
                  <input
                      type="text"
                      id="form1"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      onBlur={this.onChangeEmail}
                  />
                  <label htmlFor="form1" className={this.state.email ? 'active' : ''}>Váš email</label>
                  {!this.state.emailValid && (
                      <div className="text-left text-danger">Toto pole je povinné!</div>
                  )}
                  {!this.state.emailFormatValid && (
                      <div className="text-left text-danger">Zadaná emailová adresa má špatný formát!</div>
                  )}
                </div>
                <div className="md-form">
                  <input
                      type="password"
                      id="form2"
                      name="subject"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      onBlur={this.onChangePassword}
                  />
                  <label htmlFor="form2">Heslo</label>
                  {!this.state.passwordValid && (
                      <div className="text-left text-danger">Toto pole je povinné!</div>
                  )}
                </div>
              </div>

              <div className="col-12 text-center">
                <button
                    className={styles.sendButton + ' btn btn-outline-primary'}
                    data-mdb-ripple-color="dark"
                    disabled={this.state.loading}
                >
                  Přihlásit
                  {this.state.loading && (
                      <span className="spinner-border spinner-border-sm ml-2"/>
                  )}
                </button>
              </div>
              <div className="col-12">
                <p className={'my-3'}>Nemám účet, chci se <a href={"/register"}>zaregistrovat.</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);
