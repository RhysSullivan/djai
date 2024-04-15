"use client";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { Player } from "./player";
import { TokenProvider } from "./components/provider";
import { SpotifyDevTools } from "~/lib/react-spotify/dev-tools";

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
        <SpotifyDevTools />
      </WebPlaybackSDK>
    </TokenProvider>
  );
};
