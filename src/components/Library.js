import React from "react";
import LibrarySongs from "./LibrarySongs";
const Library = ({
  songs,
  audioRef,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library_container ${libraryStatus ? "show" : ""}`}>
      <div className="library_heading">Playlist</div>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySongs
            songs={songs}
            song={song}
            setSongs={setSongs}
            key={song.id}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
