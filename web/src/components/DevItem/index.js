import React from "react";

import "./styles.css";

const DevItem = ({ dev }) => {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt="kibutzzz" />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil do github
      </a>
    </li>
  );
};

export default DevItem;
