import React, { Component } from 'react';

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }
  handleChange(e) {
    this.setState({
      fullname: e.target.value,
    });
  }
  handleJoin(e) {
    e.preventDefault();
    this.props.onJoin(this.state.fullname);
  }
  render() {
    return (
      <form onSubmit={ this.handleJoin }>
        <div className="form-group">
          <label htmlFor="fullname">Full name</label>
          <input
            className="form-control"
            id="fullname"
            placeholder="Full name"
            onChange={ this.handleChange }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Join</button>
      </form>
    );
  }
};

export default Join;
