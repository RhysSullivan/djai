import {
  usePlaybackState,
  usePlayerDevice,
  useErrorState,
  useWebPlaybackSDKReady,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import { useState } from "react";
import React from "react";
import { useTokenContext } from "~/app/components/provider";
import { takeControl } from "./actions";
import { SpotifyIcon } from "./icons";

const StateSummary = ({
  state,
  summary,
}: {
  summary: string;
  state: unknown;
}) => {
  return (
    <details className="pt-2">
      <summary>
        <code>{summary}</code>
      </summary>
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </details>
  );
};

const StateConsumer = () => {
  const playbackState = usePlaybackState(true, 100);
  const playerDevice = usePlayerDevice();
  const errorState = useErrorState();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();

  return (
    <div className="flex flex-col">
      <StateSummary
        summary="useWebPlaybackSDKReady"
        state={webPlaybackSDKReady}
      />
      <StateSummary summary="usePlaybackState" state={playbackState} />
      <StateSummary summary="usePlayerDevice" state={playerDevice} />
      <StateSummary summary="useErrorState" state={errorState} />
    </div>
  );
};

const PlayerController = () => {
  const player = useSpotifyPlayer();
  const { token } = useTokenContext();
  const [volume, setVolumeRaw] = useState(player?._options?.volume ?? 0.0);
  const setVolume = (v: number, player: Spotify.Player) => {
    setVolumeRaw(v);
    void player.setVolume(v);
  };
  if (player === null) return null;

  return (
    <div className="flex flex-col gap-2">
      <button
        className={
          "rounded-md bg-neutral-800 p-2 text-start hover:bg-neutral-700"
        }
        onClick={() => player.previousTrack()}
      >
        <code>player.previousTrack</code>
      </button>
      <button
        className={
          "rounded-md bg-neutral-800 p-2 text-start hover:bg-neutral-700"
        }
        onClick={() => player.togglePlay()}
      >
        <code>player.togglePlay</code>
      </button>
      <button
        className={
          "rounded-md bg-neutral-800 p-2 text-start hover:bg-neutral-700"
        }
        onClick={() => player.nextTrack()}
      >
        <code>player.nextTrack</code>
      </button>
      <button
        className={
          "rounded-md bg-neutral-800 p-2 text-start hover:bg-neutral-700"
        }
        onClick={() => player.pause()}
      >
        <code>player.pause</code>
      </button>
      <button
        className={
          "rounded-md bg-neutral-800 p-2 text-start hover:bg-neutral-700"
        }
        onClick={() => player.resume()}
      >
        <code>player.resume</code>
      </button>
      <button
        className={
          "rounded-md bg-neutral-800 p-2 text-start hover:bg-neutral-700"
        }
        onClick={() => player.connect()}
      >
        <code>player.connect</code>
      </button>
      <button
        className={
          "rounded-md bg-neutral-800 p-2 text-start hover:bg-neutral-700"
        }
        onClick={() => player.disconnect()}
      >
        <code>player.disconnect</code>
      </button>
      <button
        className={
          "rounded-md bg-neutral-800 p-2 text-start hover:bg-neutral-700"
        }
        onClick={() =>
          takeControl({
            accessToken: token,
            deviceId: player._options.id,
          })
        }
      >
        <code>player.takeControl</code>
      </button>
      <div className="flex flex-col">
        Volume {volume}
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

export function SpotifyDevTools() {
  const [devToolsActive, setDevToolsActive] = useState(false);
  if (!devToolsActive)
    return (
      <button
        onClick={() => setDevToolsActive(true)}
        className="absolute bottom-5 left-5"
      >
        <SpotifyIcon
          className="h-16 w-16
        transform text-white transition-transform
        hover:scale-110"
        />
      </button>
    );
  return (
    <div className="absolute bottom-5 left-5 flex h-[600px] w-[75vw] max-w-[1000px] flex-row gap-4 rounded-xl bg-neutral-900/90 p-4">
      <button
        onClick={() => setDevToolsActive(false)}
        className="absolute right-2 top-2 text-2xl"
      >
        X
      </button>
      <div className="shrink-0 overflow-auto">
        <PlayerController />
      </div>
      <div className="mr-4 overflow-auto">
        <StateConsumer />
      </div>
    </div>
  );
}
