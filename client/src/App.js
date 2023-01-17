import React, { Component } from "react";
import { connect } from "react-redux";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import routes from './router';
import WebSocketProvider from './sockets/chatbot';
import ChatService from './services/chat.service';

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.min.css';
import "./App.scss";

import Navigation from './components/navigation';
import Footer from './components/footer';
import Chatbot from "./components/chatbot";

import { clearMessage } from "./actions/message";
import { updateChatLogsAll } from "./actions/chatbot";

import { history } from './helpers/history';

class App extends Component {
  constructor(props) {
    super(props);

    this.loadChats = this.loadChats.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: props.user ? props.user : undefined,
      mountWindowHeight: 0,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  async loadChats(user) {
    return await ChatService.findAllByUserId(user.id).then(response => {
      return response.data;
    }).catch(err => {
      console.log(err)
      return []
    })
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
      this.loadChats(user).then(r => {
        this.props.dispatch(updateChatLogsAll(r));
      });
    }

    this.updateWindowHeight()
    // window.addEventListener('resize', this.updateWindowHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowHeight);
  }

  updateWindowHeight = () => {
    let numberToDeduct = 410;
    if (window.innerHeight < 992) {
      numberToDeduct = 378;
    } else if (window.innerHeight > 1170) {
      numberToDeduct = 361;
    }
    this.setState({
      mountWindowHeight: window.innerHeight - numberToDeduct,
    })
  }

  render() {
    const { mountWindowHeight, currentUser } = this.state;
    return (
      <Router history={history}>
        <WebSocketProvider>
          <div className="App">
            <header>
              <Navigation currentUser={currentUser} />
            </header>

            <div className="container mt-3" style={{ minHeight: mountWindowHeight + 'px' }}>
              <Switch>
                {routes(currentUser).map((route, key) => {
                  return route.type === 'route' ? (
                    <Route key={key} exact path={route.path} component={route.component} />
                  ) : (
                    <Redirect key={key} to={route.path}/>
                  )
                })}
              </Switch>
            </div>

            <Footer />
            <ToastContainer />
            {currentUser && (
              <Chatbot currentUser={currentUser}/>
            )}
          </div>
        </WebSocketProvider>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { chatLog } = state.chatbot;
  return {
    user,
    chatLog,
  };
}

export default connect(mapStateToProps)(App);
