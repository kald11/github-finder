import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/layout/Navbar.js";
import Users from "./components/users/Users";
import Search from "./components/users/search";
import axios from "axios";
class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  // Search Github Users
  searchUsers = async (text) => {
    this.setState({ loading: false });
    let githubClientId = process.env.GITHUB_CLIENT_ID;
    let githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    this.setState({ users: res.data.items, loading: false });
  };
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users}></Users>
        </div>
      </div>
    );
  }
}
export default App;
