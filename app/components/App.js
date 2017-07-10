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
      answer: false,
      audience: [],
      currentQuestion: false,
      member: {},
      questions: [],
      speaker: '',
      status: false,
      title: '',
    };

    this.ask = this.ask.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.emit = this.emit.bind(this);
    this.joined = this.joined.bind(this);
    this.onAnswer = this.onAnswer.bind(this);
    this.onAsk = this.onAsk.bind(this);
    this.onJoin = this.onJoin.bind(this);
    this.onStart = this.onStart.bind(this);
    this.start = this.start.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('joined', this.joined);
    this.socket.on('welcome', this.updateState);
    this.socket.on('audience', this.updateState);
    this.socket.on('start', this.start);
    this.socket.on('end', this.updateState);
    this.socket.on('ask', this.ask);
  }
  ask(currentQuestion) {
    this.setState({ currentQuestion });
  }
  connect() {
    const member = sessionStorage.member
      ? JSON.parse(sessionStorage.member)
      : null;

    if (member && member.type === 'member') {
      this.emit('join', member);
    } else if (member && member.type === 'speaker') {
      this.emit('start', {
        name: member.name,
        title: sessionStorage.title,
      });
    }

    this.setState({ status: true });
  }
  disconnect() {
    this.setState({
      status: false,
      title: 'Disconnected',
      speaker: '',
    });
  }
  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  }
  joined(member) {
    sessionStorage.member = JSON.stringify(member);
    this.setState({ member });
  }
  onAnswer(payload) {
    this.emit('answer', payload);
    this.setState({ answer: payload });
    sessionStorage.answer = payload;
  }
  onAsk(payload) {
    this.emit('ask', payload);
  }
  onJoin(payload) {
    this.emit('join', payload);
  }
  onStart(payload) {
    this.emit('start', payload);
  }
  start(presentation) {
    if (this.state.member.type === 'speaker') {
      sessionStorage.title = presentation.title;
    }
    this.setState(presentation);
  }
  updateState(payload) {
    this.setState(payload);
  }
  render() {
    return (
      <Router>
        <div>
          <Header {...this.state} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Audience
                  {...this.state}
                  onJoin={this.onJoin}
                  onAnswer={this.onAnswer} />
              )}
            />
            <Route
              path="/board"
              render={() => <Board {...this.state} />}
            />
            <Route
              path="/speaker"
              render={() => (
                <Speaker
                  {...this.state}
                  onAsk={this.onAsk}
                  onStart={this.onStart} />
              )}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;
