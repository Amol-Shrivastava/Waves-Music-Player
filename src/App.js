import React, { useState, useRef } from "react";

//components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
//styles
import "./styles/app.scss";

//data
import songList from "./data";

function App() {
  //states
  const [songs, setSongs] = useState(songList());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const [libraryStatus, setLibraryStatus] = useState(false);

  //Ref
  const audioRef = useRef(null);
  //functions
  const updateTimeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate Percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const songEndHandler = async () => {
    let currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        songs={songs}
        audioRef={audioRef}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={updateTimeHandler}
        onLoadedMetadata={updateTimeHandler}
        ref={audioRef}
        src={currentSong.src}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
