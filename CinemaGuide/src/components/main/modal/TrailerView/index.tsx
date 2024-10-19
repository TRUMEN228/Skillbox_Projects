import { FC, useRef, useState } from "react";
import { Movie } from "../../../../api/types";
import "./style.css";
import { TrailerButton } from "../TrailerButton";

interface ITrailerView {
  film: Movie;
}

export const TrailerView: FC<ITrailerView> = ({
  film
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [trailerState, setTrailerState] = useState<"pause" | "play" | "loading">("loading");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  var controlsOpacity = 1;
  var titleOpacity = 0;

  const handleWaiting = () => {
    setTrailerState("loading");
    setIsLoading(true);
    controlsOpacity = 1;
    titleOpacity = 0;
  }

  const handleCanPlay = () => {
    setIsLoading(false);
    setTrailerState("play");
    videoRef.current?.play();
    controlsOpacity = 0;
    titleOpacity = 0;
  }

  const handlePause = () => {
    if (isLoading) {
      return;
    }

    setTrailerState("pause");
    videoRef.current?.pause();
    controlsOpacity = 1;
    titleOpacity = 1;
  }

  const handlePlay = () => {
    if (isLoading) {
      setTrailerState("loading");
      videoRef.current?.play();
      controlsOpacity = 1;
      titleOpacity = 0;
      return;
    }

    setTrailerState("play");
    videoRef.current?.play();
    controlsOpacity = 0;
    titleOpacity = 0;
  }

  return (
    <div className="trailer__container" onClick={handlePause}>
      <video
        className="trailer__video"
        onWaiting={handleWaiting}
        onCanPlay={handleCanPlay}
        src={film.trailerUrl}
        ref={videoRef}
      ></video>
      <div className="trailer__controls" style={{ opacity: controlsOpacity }}>
        <TrailerButton state={trailerState} onPause={handlePause} onPlay={handlePlay}/>
        <div className="trailer__info" style={{ opacity: titleOpacity }}>
          {film.title}
        </div>
      </div>
    </div>
  );
}