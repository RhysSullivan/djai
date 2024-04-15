"use client";
import { useState, useEffect } from "react";

type Props = {
  token: string;
};

export const WebPlayback = ({ token }: Props) => {
  const [is_paused, setPaused] = useState<boolean>(false);
  const [is_active, setActive] = useState<boolean>(false);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [current_track, setTrack] = useState<Spotify.Track | null>(null);
  console.log(player);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 1,
      });
      console.log("setting player");
      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        void player.getCurrentState().then((state) => {
          if (!state) {
            setActive(false);
          } else {
            setActive(true);
          }
        });
      });

      void player.connect();
    };
  }, [token]);

  if (!player) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>Spotify Player is null</b>
          </div>
        </div>
      </>
    );
  } else if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>
              Instance not active. Transfer your playback using your Spotify app
            </b>
          </div>
        </div>
      </>
    );
  }
  console.log("player is", player);
  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          <div className=""></div>
          {current_track?.album.images[0]?.url ? (
            <img
              src={current_track.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />
          ) : null}

          <div className="now-playing__side">
            <div className="now-playing__name">{current_track?.name}</div>
            <div className="now-playing__artist">
              {current_track?.artists[0]?.name}
            </div>

            <button
              className="btn-spotify"
              onClick={() => {
                void player.previousTrack();
              }}
            >
              &lt;&lt;
            </button>

            <button
              className="btn-spotify"
              onClick={() => {
                console.log("playing");
                void player.togglePlay();
              }}
            >
              {is_paused ? "PLAY" : "PAUSE"}
            </button>

            <button
              className="btn-spotify"
              onClick={() => {
                void player.nextTrack();
              }}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};