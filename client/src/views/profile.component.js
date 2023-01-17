import React, { useState, useEffect, useRef, useCallback } from "react";
import {Redirect, useParams, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from "../services/user.service";
import {toast} from "react-toastify";

import ProfileReservationsTable from "../components/ProfileReservationsTable";
import ProfileReservationsCalendar from "../components/reservation/ReservationCalendar";

const emailFormat = (value) => {
  if (!value || value === '') {
    return true;
  } else {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!value.match(emailRegex);
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

const passwordConfirmFormat = (value, password) => {
  if ((!value || value === "") && (!password || password === '')) {
    return true;
  } else {
    return password === value;
  }
}

const useMountedState = () => {
  const mountedRef = useRef(false)
  const isMounted = useCallback(() => mountedRef.current, [])

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  return isMounted
}

function Profile ({ user }){
  const params = useParams();
  const history = useHistory();

  const [loading, setLoading] = React.useState(true);
  const [reservationTab, setReservationTab] = React.useState("table");

  const [showModeratorBoard, setShowModeratorBoard] = React.useState(false);
  const [showAdminBoard, setShowAdminBoard] = React.useState(false);

  const [name, setName] = React.useState("");
  const [nameValid, setNameValid] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(true);
  const [emailFormatValid, setEmailFormatValid] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [passwordFormatValid, setPasswordFormatValid] = React.useState(true);
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [passwordConfirmValid, setPasswordConfirmValid] = React.useState(true);

  const [reservationTimeFilter, setReservationTimeFilter] = React.useState("upcoming")
  const [reservationDeleteFilter, setReservationDeleteFilter] = React.useState(false)
  const [reservationUserFilter, setReservationUserFilter] = React.useState("me")

  const isMounted = useMountedState()

  React.useEffect(() => {
    // console.log("prihlaseny uzivatel", params, user);
    if (user) {
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      if (params.id) {
        if(user.roles.includes("ROLE_ADMIN") || parseInt(params.id) === user.id) {
          UserService.getUserById(params.id).then(response => {
            console.log(response, showAdminBoard);
            if (isMounted()) {
              if (response.status === 200 && response.data) {
                setName(response.data.username);
                setEmail(response.data.email);
              }
              setLoading(false);
            }
          })
        } else {
          setLoading(false);
          history.push({
            pathname:  "/home",
          });
          toast.error("Uživatel se zadaným id neexistuje nebo nemáte potřebné oprávnění.");
        }
      } else {
        setName(user.username);
        setEmail(user.email);
        setLoading(false);
      }
    } else {
      history.push({
        pathname:  "/login",
      });
    }
  }, [isMounted]);

  const onChangeName = (e) => {
    setName(e.target.value);
    setNameValid(!(!e.target.value || e.target.value === ""));
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailValid(!(!e.target.value || e.target.value === ""));
    setEmailFormatValid(emailFormat(e.target.value));
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordFormatValid(passwordFormat(e.target.value));
  }

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value)
    setPasswordConfirmValid(passwordConfirmFormat(e.target.value, password));
  }

  const onChangeTab = (type) => {
    console.log('zmena tabu', type);
    if (type !== reservationTab) {
      setReservationTab(type);
    }
  }

  const onChangeReservationTimeFilter = (e) => {
    setReservationTimeFilter(e.target.value);
  }

  const onChangeReservationDeleteFilter = () => {
    console.log(!reservationDeleteFilter);
    setReservationDeleteFilter(!reservationDeleteFilter);
  }

  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div className="container">
      {user ? (
        <div className="row">
          {loading ? (
            <span>loading</span>
          ) : (
            <div className="col-12 p-0">
              <div className="row">
                <div className="col-md-6 pt-1">
                  <div className="md-form">
                    <input
                      type="text"
                      id="form1"
                      name="name"
                      className="form-control"
                      value={name}
                      onChange={onChangeName}
                      onBlur={onChangeName}
                    />
                    <label htmlFor="form1" className={name ? 'active' : ''}>Vaše jméno</label>
                    {!nameValid && (
                      <div className="text-left text-danger">Toto pole je povinné!</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 pt-1">
                  <div className="md-form">
                    <input
                      type="text"
                      id="form2"
                      name="email"
                      className="form-control"
                      value={email}
                      onChange={onChangeEmail}
                      onBlur={onChangeEmail}
                    />
                    <label htmlFor="form2" className={email ? 'active' : ''}>Váš email</label>
                    {!emailValid && (
                      <div className="text-left text-danger">Toto pole je povinné!</div>
                    )}
                    {!emailFormatValid && (
                      <div className="text-left text-danger">Zadaná emailová adresa má špatný formát!</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 pt-1">
                  <div className="md-form">
                    <input
                      type="password"
                      id="form3"
                      name="password"
                      className="form-control"
                      value={password}
                      onChange={onChangePassword}
                      onBlur={onChangePassword}
                    />
                    <label htmlFor="form3" className={password ? 'active' : ''}>Vaše nové heslo</label>
                    {!passwordFormatValid && (
                      <div className="text-left text-danger">Použijte minimálně osm znaků, alespoň jedno velké písmeno, jedno malé písmeno a jedno číslo.</div>
                    )}
                  </div>
                  <div className="md-form">
                    <input
                      type="password"
                      id="form4"
                      name="password_confirmation"
                      className="form-control"
                      value={passwordConfirm}
                      onChange={onChangePasswordConfirm}
                      onBlur={onChangePasswordConfirm}
                    />
                    <label htmlFor="form4" className={passwordConfirm ? 'active' : ''}>Potvrzení nového hesla</label>
                    {!passwordConfirmValid && (
                      <div className="text-left text-danger">Potvrzení se neshoduje se zadaným heslem.</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 pt-1">
                  // todo asi neco s rolema
                </div>
              </div>

              <div className="row">
                <div className="col-12 mb-4">
                  <div className="d-inline-block mr-4">
                    {showAdminBoard ? (
                      <div className="btn-toolbar justify-content-between" role="toolbar"
                           aria-label="Toolbar with button groups">
                        <div className="btn-group btn-group-sm" role="group" aria-label="First group">
                          <button
                            type="button"
                            className={ reservationUserFilter === 'me' ? 'btn btn-success' : 'btn btn-outline-success'}
                            onClick={() => setReservationUserFilter('me')}
                          >
                            Tvoje rezervace
                          </button>
                          <button
                            type="button"
                            className={ reservationUserFilter === 'all' ? 'btn btn-success' : 'btn btn-outline-success'}
                            onClick={() => setReservationUserFilter('all')}
                          >
                            Všechny rezervace
                          </button>
                        </div>
                      </div>
                    ) : (
                      <h4>Tvoje rezervace</h4>
                    )}
                  </div>
                  <div className="d-inline-block mr-4">
                    <div className="btn-toolbar justify-content-between" role="toolbar"
                         aria-label="Toolbar with button groups">
                      <div className="btn-group btn-group-sm" role="group" aria-label="First group">
                        <button
                          type="button"
                          className={ reservationTab === 'table' ? 'btn btn-success' : 'btn btn-outline-success'}
                          onClick={() => setReservationTab('table')}
                        >
                          Tabulka
                        </button>
                        <button
                          type="button"
                          className={ reservationTab === 'calendar' ? 'btn btn-success' : 'btn btn-outline-success'}
                          onClick={() => setReservationTab('calendar')}
                        >
                          Kalendář
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="d-inline-block">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="filterReservations"
                        id="inlineRadio1"
                        value="upcoming"
                        checked={reservationTimeFilter === 'upcoming'}
                        style={{ marginTop: 0.25 + 'rem' }}
                        onChange={onChangeReservationTimeFilter}
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">Nadcházející</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="filterReservations"
                        id="inlineRadio2"
                        value="all"
                        checked={reservationTimeFilter === 'all'}
                        style={{ marginTop: 0.25 + 'rem' }}
                        onChange={onChangeReservationTimeFilter}
                      />
                      <label className="form-check-label" htmlFor="inlineRadio2">Všechny</label>
                    </div>
                  </div>
                  <div className="d-inline-block ml-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="true"
                        checked={reservationDeleteFilter}
                        id="flexCheckIndeterminate"
                        onChange={onChangeReservationDeleteFilter}
                      />
                      <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                        Včetně smazaných
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {reservationTab === "table" && (
                    <ProfileReservationsTable currentUser={user} admin={showAdminBoard} filter={{ time: reservationTimeFilter, users: reservationUserFilter, deleted: reservationDeleteFilter }}/>
                  )}
                </div>
              </div>

              {showAdminBoard && (
                <div className="row">
                  <div className="col-12">
                    // som admin
                  </div>
                </div>
              )}
              {showModeratorBoard && (
                <div className="row">
                  <div className="col-12">
                    // som moderator
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Redirect to={'/login'}/>
      )}
    </div>
  )

    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         showModeratorBoard: false,
    //         showAdminBoard: false,
    //     };
    // }
    //
    // componentDidMount() {
    //   const user = this.props.currentUser;
    //   console.log('prihlaseny user', user);
    //
    //   if (user) {
    //     this.setState({
    //         showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
    //         showAdminBoard: user.roles.includes("ROLE_ADMIN"),
    //     });
    //   }
    // }
    //
    // render() {
    // const { user: currentUser } = this.props;
    // const { showAdminBoard } = this.state;
    //
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
