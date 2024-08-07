// src/VideoPlayer.js
import React, { useRef, useState, useEffect } from "react";
import "./VideoPlayer.css";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const Indicator = ({
  id,
  start,
  end,
  duration,
  highlighted,
  setHighlighted,
  setCurrentTime,
  handleSliderChange,
}) => {
  // const [clicked, setClicked] = useState(highlighted);

  const handleClick = () => {
    setHighlighted(id);
    setCurrentTime(start);
    handleSliderChange({ target: { value: (start / duration) * 100 } });
  };

  const width = ((end - start) / duration) * 100;
  const indicatorPercentage = (start / duration) * 100;

  return (
    <div
      className={`indicator ${highlighted ? "clicked" : ""}`}
      style={{
        left: `${indicatorPercentage + 1}%`,
        width: `${width}%`,
      }}
      onClick={handleClick}
    ></div>
  );
};

const VideoPlayer = ({ src, highlightTime }) => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSliderChange = (event) => {
    console.log(event.target.value);
    const newTime = (event.target.value / 100) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    console.log("duration", duration);
  }, [duration]);

  const percentage = (currentTime / duration) * 100;

  const [highlighted, setHighlighted] = useState(0);

  return (
    <div className="video-player">
      <video ref={videoRef} src={src} controls={false} />
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="100"
          value={percentage || 0}
          onChange={handleSliderChange}
          style={{
            background: `linear-gradient(to right, #FFFFFF ${percentage}%, #959595 ${percentage}%)`,
          }}
        />
        {highlightTime.map((time, index) => (
          <Indicator
            id={time.id}
            start={time.start}
            end={time.end}
            duration={duration}
            key={time.id}
            highlighted={
              (highlighted === time.id &&
                currentTime >= time.start &&
                currentTime < time.end) ||
              (currentTime >= time.start && currentTime < time.end)
            }
            setHighlighted={setHighlighted}
            setCurrentTime={setCurrentTime}
            handleSliderChange={handleSliderChange}
          />
        ))}
      </div>
      <div className="time-stamps">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
