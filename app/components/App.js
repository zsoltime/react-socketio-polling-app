import React from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Audience from './Audience';
import Board from './Board';
import Speaker from './Speaker';
import Page404 from './Page404';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      audience: [],
      member: {},
      status: false,
      title: '',
    };

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.emit = this.emit.bind(this);
    this.joined = this.joined.bind(this);
    this.onJoin = this.onJoin.bind(this);
    this.updateAudience = this.updateAudience.bind(this);
    this.welcome = this.welcome.bind(this);
  }
  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('joined', this.joined);
    this.socket.on('welcome', this.welcome);
    this.socket.on('audience', this.updateAudience);
  }
  connect() {
    const member = sessionStorage.member ? JSON.parse(sessionStorage.member) : null;

    if (member) { this.emit('join', member); }

    this.setState({ status: true });
  }
  disconnect() {
    this.setState({
      status: false,
    });
  }
  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  }
  joined(member) {
    sessionStorage.member = JSON.stringify(member);
    this.setState({ member });
  }
  onJoin(name) {
    this.emit('join', { name });
    console.log(name);
  }
  updateAudience(audience) {
    this.setState({ audience });
  }
  welcome({ title }) {
    this.setState({ title });
  }
  render() {
    return (
      <Router>
        <div>
          <Header status={ this.state.status } title={ this.state.title } />
          <Switch>
            <Route exact path="/" render={() => <Audience {...this.state} onJoin={ this.onJoin } />} />
            <Route path="/board" render={() => <Board {...this.state} />} />
            <Route path="/speaker" render={() => <Speaker {...this.state} />} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;
