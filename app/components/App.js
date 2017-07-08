import React from 'react';
import io from 'socket.io-client';

import Header from './Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'disconnected',
    };

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }
  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
  }
  connect() {
    this.setState({
      status: 'connected',
    });
  }
  disconnect() {
    this.setState({
      status: 'disconnected',
    });
  }
  render() {
    return (
      <Header
        status={ this.state.status }
        title="New Header"
      />
    );
  }
};

export default App;
