import React, { Component } from "react";
import PropTypes from "prop-types";

export class search extends Component {
  state = {
    text: "",
  };
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
  };
  render() {
    return (
      <div>
        <form className="form">
          <input
            type="text"
            name="text"
            placeholder="Search User..."
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            className="btn btn-dark btn-block"
            value="Search"
            onClick={this.onSubmit}
          />
        </form>
      </div>
    );
  }
}

export default search;
