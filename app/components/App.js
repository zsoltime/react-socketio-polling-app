import React from 'react';
import io from 'socket.io-client';

import Header from './Header';

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
      <Header
        status={ this.state.status }
        title={ this.state.title }
      />
    );
  }
};

export default App;
