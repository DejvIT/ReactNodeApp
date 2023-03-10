import React, { Component } from "react";
import styles from '../styles/form.module.scss'
import {Link} from "react-router-dom";
import TicketService from '../services/ticket.service'
import {toast} from "react-toastify";

const emailFormat = (value) => {
  if (!value || value === '') {
    return true;
  } else {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!value.match(emailRegex);
  }
};

export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.handleMessage = this.handleMessage.bind(this);
    this.validateBeforeSend = this.validateBeforeSend.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeGdpr = this.onChangeGdpr.bind(this);

    this.state = {
      name: '',
      nameValid: true,
      email: '',
      emailValid: true,
      emailFormatValid: true,
      subject: '',
      subjectValid: true,
      content: '',
      contentValid: true,
      gdpr: false,
      gdprValid: true,
      sendingMessage: false,

      currentUser: props.currentUser,
    };
  }

  onChangeName(e) {
    console.log(e)
    this.setState({
      name: e.target.value,
      nameValid: !(!e.target.value || e.target.value === ""),
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
      emailValid: !(!e.target.value || e.target.value === ""),
      emailFormatValid: emailFormat(e.target.value),
    });
  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value,
      subjectValid: !(!e.target.value || e.target.value === ""),
    });
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value,
      contentValid: !(!e.target.value || e.target.value === ""),
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
    const subject = !(!this.state.subject || this.state.subject === "");
    const content = !(!this.state.content || this.state.content === "");
    const gdpr = this.state.gdpr;
    this.setState({
      nameValid: name,
      emailValid: email,
      subjectValid: subject,
      contentValid: content,
      gdprValid: gdpr,
    });

    return name && email && emailFormat && subject && content && gdpr;
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

      TicketService.createTicket(data).then(response => {
        if (response.status === 200) {
          toast.success('Va??e zpr??va byla ??sp????n?? odesl??na');
          const user = this.state.currentUser;
          this.setState({
            name: user.username,
            nameValid: true,
            email: user.email,
            emailValid: true,
            emailFormatValid: true,
            subject: '',
            subjectValid: true,
            content: '',
            contentValid: true,
            gdpr: false,
            gdprValid: true,
          });
        }
        this.setState({
          sendingMessage: false,
        });
      }).catch(() => {
        this.setState({
          sendingMessage: false,
        });
      })
    }
  }

  componentDidMount() {
    const user = this.state.currentUser;

    if (user) {
      this.setState({
        name: user.username,
        email: user.email
      })
    }
  }

  render() {
    return (
      <div className={styles.pageForm + ' row'}>
        <div className="col-12 text-center">
          <h1 className="microbagr-green-color">Kontaktujte n??s</h1>
        </div>
        <div className="col-12">
          <form
            className="text-center border border-light p-5"
            onSubmit={this.handleMessage}
          >
            <p className="text-center w-responsive mx-auto mb-5">
              M??te n??jak?? ot??zky? Nev??hejte n??s kontaktovat. N???? t??m se s v??mi spoj?? jakmile to p??jde a pom????e v??m s va????m dotazem ??i probl??mem.
            </p>

            <div className="row">
              <div className="col-md-6 pt-1">
                <div className="md-form">
                  <input
                    type="text"
                    id="form1"
                    name="name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    onBlur={this.onChangeName}
                  />
                  <label htmlFor="form1" className={this.state.name ? 'active' : ''}>Va??e jm??no</label>
                  {!this.state.nameValid && (
                    <div className="text-left text-danger">Toto pole je povinn??!</div>
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
                  <label htmlFor="form2" className={this.state.email ? 'active' : ''}>V???? email</label>
                  {!this.state.emailValid && (
                    <div className="text-left text-danger">Toto pole je povinn??!</div>
                  )}
                  {!this.state.emailFormatValid && (
                    <div className="text-left text-danger">Zadan?? emailov?? adresa m?? ??patn?? form??t!</div>
                  )}
                </div>
                <div className="md-form">
                  <input
                    type="text"
                    id="form3"
                    name="subject"
                    className="form-control"
                    value={this.state.subject}
                    onChange={this.onChangeSubject}
                    onBlur={this.onChangeSubject}
                  />
                  <label htmlFor="form3">P??edm??t zpr??vy</label>
                  {!this.state.subjectValid && (
                    <div className="text-left text-danger">Toto pole je povinn??!</div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="md-form" style={{ marginTop: 30 + 'px' }}>
                  <textarea
                    id="textarea-char-counter"
                    length="120"
                    rows="7"
                    name="content"
                    className="form-control md-textarea"
                    value={this.state.content}
                    onChange={this.onChangeContent}
                    onBlur={this.onChangeContent}
                  />
                  <label htmlFor="textarea-char-counter">Sem napi??te va??i zpr??vu...</label>
                  {!this.state.contentValid && (
                    <div className="text-left text-danger">Toto pole je povinn??!</div>
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
                    Odesl??n??m tohoto formul????e vyjad??uji souhlas se <Link to={"/gdpr"}>zpracov??n??m osobn??ch ??daj??</Link> pro marketingov?? ????ely spole??nosti microbagr.tech. M??m pr??vo tento souhlas kdykoliv <Link to={"/terms"}>odvolat</Link>.
                  </label>
                  {!this.state.gdprValid && (
                    <div className="text-left text-danger">Pro ??sp????n?? odesl??n?? formul????e mus??te souhlasit se zpracov??n??m osobn??ch ??daj??.</div>
                  )}
                </div>
              </div>

              <div className="col-12 text-center mt-3">
                <button
                  className={styles.sendButton + ' btn btn-outline-primary'}
                  data-mdb-ripple-color="dark"
                  disabled={this.state.sendingMessage}
                >
                  Odeslat zpr??vu
                  {this.state.sendingMessage && (
                    <span className="spinner-border spinner-border-sm ml-2"/>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}