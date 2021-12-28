import React from "react";
import RepoItem from "./RepoItem.js";
import PropTypes from "prop-types";
const Repos = ({ repos }) => {
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
};

Repos.propTypes = {
  repo: PropTypes.array.isRequired,
};
export default Repos;