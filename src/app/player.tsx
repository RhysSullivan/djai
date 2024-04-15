"use client";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import styles from "./player.module.css";
import { PlayerHeader } from "./components/PlayerHeader";
import { PlayerContent } from "./components/PlayerContent";

export const Player = (props: { token: string }) => {
  return (
    <WebPlaybackSDK
      initialDeviceName="Spotify Player on Next.js"
      getOAuthToken={(callback) => callback(props.token)}
      connectOnInitialized={true}
      initialVolume={0.05}
    >
      <div className={styles.root}>
        <div className={styles.header}>
          <PlayerHeader />
        </div>
        <main className={styles.player}>
          <PlayerContent access_token={props.token} />
        </main>
      </div>
    </WebPlaybackSDK>
  );
};
