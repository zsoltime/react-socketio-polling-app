import React, { Component } from 'react';

class JoinSpeaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      title: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleStart(e) {
    e.preventDefault();
    this.props.onStart({
      name: this.state.fullname,
      title: this.state.title,
    });
  }
  render() {
    return (
      <form onSubmit={ this.handleStart }>
        <div className="form-group">
          <label htmlFor="fullname">Full name</label>
          <input
            className="form-control"
            id="fullname"
            name="fullname"
            placeholder="Full name"
            onChange={ this.handleChange }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Presentation Title</label>
          <input
            className="form-control"
            id="title"
            name="title"
            placeholder="Presentation title"
            onChange={ this.handleChange }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Join</button>
      </form>
    );
  }
};

export default JoinSpeaker;
