import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/layout/Navbar.js";
import UserItem from "./components/users/UserItem";
class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <UserItem></UserItem>
      </div>
    );
  }
}
export default App;
