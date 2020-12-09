import React from "react";

const Song = ({ currentSong }) => {
  return (
    <div className="song_container">
      <img
        src={currentSong.cover}
        alt={currentSong.name}
        className="song_cover"
      ></img>
      <h2 className="song_name">{currentSong.name}</h2>
      <h2 className="song_artist">{currentSong.artist}</h2>
    </div>
  );
};

export default Song;
