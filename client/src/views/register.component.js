import React, { Component } from "react";

import { connect } from "react-redux";
import {login, register} from "../actions/auth";
import styles from "../styles/form.module.scss";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const emailFormat = (value) => {
  if (!value || value === '') {
    return true;
  } else {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!value.match(emailRegex);
  }
};

const nameFormat = (value) => {
  if (!value || value === '') {
    return true;
  } else {
    const nameRegex = /^[a-zA-Z]+([.\s]?[a-zA-Z]+)*$/;
    return !!value.match(nameRegex);
  }
};


const passwordFormat = (value) => {
  if (!value || value === '') {
    return true;
  } else {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return !!value.match(passwordRegex);
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.validateBeforeSend = this.validateBeforeSend.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.onChangeGdpr = this.onChangeGdpr.bind(this);

    this.state = {
      name: '',
      nameValid: true,
      nameFormatValid: true,
      email: '',
      emailValid: true,
      emailFormatValid: true,
      password: '',
      passwordValid: true,
      passwordFormatValid: true,
      passwordConfirm: '',
      passwordConfirmValid: true,
      gdpr: false,
      gdprValid: true,
      loading: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      name: e.target.value,
      nameValid: !(!e.target.value || e.target.value === ""),
      nameFormatValid: nameFormat(e.target.value),
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
      emailValid: !(!e.target.value || e.target.value === ""),
      emailFormatValid: emailFormat(e.target.value),
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      passwordValid: !(!e.target.value || e.target.value === ""),
      passwordFormatValid: passwordFormat(e.target.value),
    });
  }

  onChangePasswordConfirm(e) {
    this.setState({
      passwordConfirm: e.target.value,
      passwordConfirmValid: !(!e.target.value || e.target.value === "") && (e.target.value === this.state.password),
    });
  }

  onChangeGdpr(e) {
    this.setState({
      gdpr: !this.state.gdpr,
      gdprValid: !this.state.gdpr,
    });
  }

  validateBeforeSend() {
    const name = !(!this.state.name || this.state.name === "");
    const email = !(!this.state.email || this.state.email === "");
    const password = !(!this.state.password || this.state.password === "");
    const passwordConfirm = !(!this.state.passwordConfirm || this.state.passwordConfirm === "");
    const gdpr = this.state.gdpr;
    this.setState({
      nameValid: name,
      emailValid: email,
      passwordValid: password,
      passwordConfirmValid: passwordConfirm && (password === passwordConfirm),
      gdprValid: gdpr,
      loading: false,
    });

    return name && email && emailFormat && password && passwordConfirm && gdpr;
  }

  handleRegister(e) {
    e.preventDefault();
    const valid = this.validateBeforeSend();
    console.log('validate before send', valid);
    if (valid) {
      this.setState({
        successful: false,
      });

      const { dispatch, history } = this.props;
      dispatch(
          register(this.state.name, this.state.email, this.state.password)
      ).then(() => {
        this.setState({
          successful: true,
        });
        dispatch(login(this.state.email, this.state.password))
          .then(() => {
            history.push("/profile");
            window.location.reload();
          })
          .catch(() => {
            toast.error(this.props.message);
            this.setState({
              loading: false
            });
          });
      })
      .catch(() => {
        toast.error(this.props.message);
        this.setState({
          successful: false,
        });
      });
    }
  }

  render() {
    const { message } = this.props;

    return (
        <div className={styles.pageForm + ' row'}>
          <div className="col-6 offset-3 text-center">
            <h1 className="microbagr-green-color">Registrace</h1>
            <form
                className="text-center border border-light p-5"
                onSubmit={this.handleRegister}
            >
              <div className="row">
                <div className="col-md-12 pt-1">
                  <div className="md-form">
                    <input
                        type="text"
                        id="form1"
                        name="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeUsername}
                        onBlur={this.onChangeUsername}
                    />
                    <label htmlFor="form1" className={this.state.name ? 'active' : ''}>Vaše jméno</label>
                    {!this.state.nameValid && (
                        <div className="text-left text-danger">Toto pole je povinné!</div>
                    )}
                    {!this.state.nameFormatValid && (
                        <div className="text-left text-danger">Je-li víceslovné jméno, použijte pouze znaky a mezeru!</div>
                    )}
                  </div>
                  <div className="md-form">
                    <input
                        type="text"
                        id="form2"
                        name="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        onBlur={this.onChangeEmail}
                    />
                    <label htmlFor="form2" className={this.state.email ? 'active' : ''}>Váš email</label>
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
                        id="form3"
                        name="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        onBlur={this.onChangePassword}
                    />
                    <label htmlFor="form3">Heslo</label>
                    {!this.state.passwordValid && (
                        <div className="text-left text-danger">Toto pole je povinné!</div>
                    )}
                    {!this.state.passwordFormatValid && (
                        <div className="text-left text-danger">Použijte minimálně osm znaků, alespoň jedno velké písmeno, jedno malé písmeno a jedno číslo.</div>
                    )}
                  </div>
                  <div className="md-form">
                    <input
                        type="password"
                        id="form4"
                        name="password"
                        className="form-control"
                        value={this.state.passwordConfirm}
                        onChange={this.onChangePasswordConfirm}
                        onBlur={this.onChangePasswordConfirm}
                    />
                    <label htmlFor="form4">Heslo znova</label>
                    {!this.state.passwordConfirmValid && (
                        <div className="text-left text-danger">Hesla se nezhoduji!</div>
                    )}
                  </div>
                </div>

                <div className="col-12 text-left">
                  <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.state.gdpr}
                        id="flexCheckChecked"
                        checked={this.state.gdpr}
                        onChange={this.onChangeGdpr}
                    />
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                      Odesláním tohoto formuláře vyjadřuji souhlas se <Link to={"/gdpr"}>zpracováním osobních údajů</Link> pro marketingové účely společnosti microbagr.tech. Mám právo tento souhlas kdykoliv <Link to={"/terms"}>odvolat</Link>.
                    </label>
                    {!this.state.gdprValid && (
                        <div className="text-left text-danger">Pro úspěšné odeslání formuláře musíte souhlasit se zpracováním osobních údajů.</div>
                    )}
                  </div>
                </div>

                <div className="col-12 text-center">
                  <button
                      className={styles.sendButton + ' btn btn-outline-primary mt-4'}
                      data-mdb-ripple-color="dark"
                      disabled={this.state.loading}
                  >
                    Zaregistrovat
                    {this.state.loading && (
                        <span className="spinner-border spinner-border-sm ml-2"/>
                    )}
                  </button>
                </div>
                <div className="col-12">
                  <p className={'my-3'}>Účet mám, chci se <a href={"/login"}>přihlásit.</a></p>
                </div>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
