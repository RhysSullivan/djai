"use client";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { Player } from "./player";
import { TokenProvider } from "./components/provider";
import { SpotifyDevTools } from "~/lib/react-spotify/dev-tools";
import { Button } from "~/components/ui/button";
import { generateAudio } from "./actions";

export const PlayerProvider = (props: { token: string }) => {
  return (
    <TokenProvider token={props.token}>
      <WebPlaybackSDK
        initialDeviceName="DJ AI Spotify Player"
        getOAuthToken={(callback) => callback(props.token)}
        connectOnInitialized={false}
        initialVolume={0.05}
      >
        <Player />
        <Button
          onClick={async () => {
            // result is readable
            const audio = await generateAudio().then((result) => result!);
            const uint8Array = new Uint8Array(audio);
            const arrayBuffer = uint8Array.buffer;

            // Create Blob from ArrayBuffer
            const blob = new Blob([arrayBuffer], { type: "audio/wav" });
            const url = URL.createObjectURL(blob);
            const audioElement = document.createElement("audio");
            audioElement.src = url;
            await audioElement.play();
          }}
        >
          Test TTS
        </Button>
        <SpotifyDevTools />
      </WebPlaybackSDK>
    </TokenProvider>
  );
};
