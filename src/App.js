import "./App.css";
import React, { Fragment, Component, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar.js";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import axios from "axios";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  // clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );

    setRepos(res.data);
    setLoading(false);
  };
  // Get Single Github User
  const getUser = async (username) => {
    const res =
      await axios.get(`https://api.github.com/users/${username}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    setUser(res.data);
    setLoading(false);
  };

  //set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };
  // Search Github Users
  const searchUsers = async (text) => {
    setLoading(true);
    let githubClientId = process.env.GITHUB_CLIENT_ID;
    let githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            ></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
