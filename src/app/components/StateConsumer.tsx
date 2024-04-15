import { memo, useEffect } from "react";
import {
  usePlaybackState,
  usePlayerDevice,
  useErrorState,
  useWebPlaybackSDKReady,
} from "react-spotify-web-playback-sdk";
import styles from "./StateConsumer.module.css";
import { StateSummary } from "./StateSummary";
import { useTokenContext } from "./provider";

export const StateConsumer = () => {
  const playbackState = usePlaybackState(true, 100);
  const playerDevice = usePlayerDevice();
  const errorState = useErrorState();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();

  return (
    <div className={styles.root}>
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
