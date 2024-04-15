"use client";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import stylesS from "./components/PlayerContent.module.css";
import { PlayerController } from "./components/PlayerController";
import { Player } from "./player";
import { StateConsumer } from "./components/StateConsumer";
import { TokenProvider } from "./components/provider";

export const PlayerProvider = (props: { token: string }) => {
  return (
    <TokenProvider token={props.token}>
      <WebPlaybackSDK
        initialDeviceName="Spotify Player on Next.js"
        getOAuthToken={(callback) => callback(props.token)}
        connectOnInitialized={true}
        initialVolume={0.05}
      >
        <Player />
        <PlayerController />
        <div className={stylesS.stateConsumer}>
          <StateConsumer />
        </div>
      </WebPlaybackSDK>
    </TokenProvider>
  );
};
