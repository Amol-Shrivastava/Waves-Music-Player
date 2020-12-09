import React, { useRef } from "react";

const LibrarySongs = ({
  songs,
  song,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
}) => {
  const selectSongHandler = async () => {
    const id = song.id;
    await setCurrentSong(song);
    const selectedSong = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(selectedSong);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={selectSongHandler}
      className={`librarySong_container ${song.active ? "selected" : ""}`}
    >
      <figure className="song_imgBox">
        <img src={song.cover} alt={song.name} className="song_img" />
      </figure>
      <figcaption className="song_descBox">
        <p className="song_name">{song.name}</p>
        <p className="song_artist">{song.artist}</p>
      </figcaption>
    </div>
  );
};

export default LibrarySongs;
