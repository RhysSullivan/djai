import { useSpotifyPlayer } from "react-spotify-web-playback-sdk";
import styles from "./PlayerController.module.css";
import { useState } from "react";
import { useTokenContext } from "./provider";

export function takeControl(input: { accessToken: string; deviceId: string }) {
  void fetch(`https://api.spotify.com/v1/me/player`, {
    method: "PUT",
    body: JSON.stringify({
      device_ids: [input.deviceId],
      play: false,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${input.accessToken}`,
    },
  });
}

export const PlayerController = () => {
  const player = useSpotifyPlayer();
  const { token } = useTokenContext();
  const [volume, setVolumeRaw] = useState(player?._options?.volume ?? 0.0);
  const setVolume = (v: number, player: Spotify.Player) => {
    setVolumeRaw(v);
    void player.setVolume(v);
  };
  if (player === null) return null;

  return (
    <div className={styles.root}>
      <div className={styles.buttons}>
        <button
          className={styles.action}
          onClick={() => player.previousTrack()}
        >
          <code>player.previousTrack</code>
        </button>
        <button className={styles.action} onClick={() => player.togglePlay()}>
          <code>player.togglePlay</code>
        </button>
        <button className={styles.action} onClick={() => player.nextTrack()}>
          <code>player.nextTrack</code>
        </button>
        <button className={styles.action} onClick={() => player.pause()}>
          <code>player.pause</code>
        </button>
        <button className={styles.action} onClick={() => player.resume()}>
          <code>player.resume</code>
        </button>
        <button className={styles.action} onClick={() => player.connect()}>
          <code>player.connect</code>
        </button>
        <button className={styles.action} onClick={() => player.disconnect()}>
          <code>player.disconnect</code>
        </button>
        <button
          className={styles.action}
          onClick={() =>
            takeControl({
              accessToken: token,
              deviceId: player._options.id,
            })
          }
        >
          <code>player.takeControl</code>
        </button>
        {/* slider for 0 to 1 volumne */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value), player)}
        />
      </div>
    </div>
  );
};
