import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
// those imports are important
import qualitySelector from "videojs-hls-quality-selector";
import contribQualityLevels from "videojs-contrib-quality-levels";

const VideoPlayer = ({ videoLink }) => {
  const videoRef = useRef();
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      fluid: true,
      responsive: true,
      sources: [
        {
          src: videoLink,
        },
      ],
    };

    videojs.registerPlugin("qualityLevels", contribQualityLevels);
    const p = videojs(
      videoRef.current,
      videoJsOptions,
      function onPlayerReaady() {
        console.log("onPlayerReady");
      }
    );
    setPlayer(p);
    return () => {
      if (player) player.dispose();
    };
  }, []);

  useEffect(() => {
    if (player) player.hlsQualitySelector({ displayCurrentQuality: true });
  }, [player]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"
      ></video>
    </div>
  );
};

export default VideoPlayer;
