import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlay,
  faBackward,
  faForward,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setSongs,
  audioRef,
  songInfo,
  setSongInfo,
}) => {
  const activeLibraryHandler = (nextPrev) => {
    const selectedSong = songs.map((song) => {
      if (song.id === nextPrev.id) {
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
  };

  //EventHandler
  const playPauseHandler = () => {
    // console.log(audioRef.current.currentTime);
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const dragHandler = (e) => {
    const currentTime = e.target.value;
    audioRef.current.currentTime = currentTime;
    setSongInfo({
      ...songInfo,
      currentTime: currentTime,
    });
  };

  const changeSongHandler = async (direction) => {
    let currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    if (direction === "skip-back") {
      let calc = (currentSongIndex - 1) % songs.length;
      if (calc !== -1) {
        await setCurrentSong(songs[calc]);
        activeLibraryHandler(songs[calc]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[songs.length - 1]);
      activeLibraryHandler(songs[songs.length - 1]);
    } else if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentSongIndex + 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  //time formatting
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //Add the styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  const linearBG = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  //Output
  return (
    <div className="player_container">
      <div className="time_control">
        <span className="start_control">{getTime(songInfo.currentTime)}</span>
        <div style={linearBG} className="track">
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0.0}
            value={songInfo.currentTime}
            className="music-range"
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>

        <span className="end_control">
          {songInfo.duration ? getTime(songInfo.duration) : "0.00"}
        </span>
      </div>

      <div className="play_control">
        <FontAwesomeIcon
          onClick={() => changeSongHandler("skip-back")}
          className="skip_back"
          icon={faBackward}
          size="2x"
        />
        <FontAwesomeIcon
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={playPauseHandler}
        />
        <FontAwesomeIcon
          onClick={() => changeSongHandler("skip-forward")}
          className="skip_forward"
          icon={faForward}
          size="2x"
        />
      </div>
    </div>
  );
};

export default Player;
