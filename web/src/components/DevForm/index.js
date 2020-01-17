import React, { useState, useEffect } from "react";

import "./styles.css";

function DevForm({ onSubmit }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [github_username, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },

      error => {
        console.log(error);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    
    
    await onSubmit({
        github_username,
        techs,
        latitude,
        longitude
    });
    
    setGithubUsername("");
    setTechs("");
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="input-block">
        <label htmlFor="username_github">Usuário Github</label>
        <input
          name="username_github"
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
          id="username_github"
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          value={techs}
          onChange={e => setTechs(e.target.value)}
          id="techs"
          required
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            onChange={e => setLatitude(e.target.value)}
            id="latitude"
            value={latitude}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            onChange={e => setLongitude(e.target.value)}
            id="longitude"
            value={longitude}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
