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
      status: false,
      title: '',
    };

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.welcome = this.welcome.bind(this);
  }
  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
  }
  connect() {
    this.setState({
      status: true,
    });
  }
  disconnect() {
    this.setState({
      status: false,
    });
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
            <Route exact path="/" render={() => <Audience {...this.state} />} />
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
