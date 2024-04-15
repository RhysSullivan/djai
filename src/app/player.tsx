import { useEffect } from "react";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
} from "react-spotify-web-playback-sdk";
import { takeControl } from "./components/PlayerController";
import { useTokenContext } from "./components/provider";

function ConnectedIndicator() {
  const playbackState = usePlaybackState(true, 100);

  // Red circle if not connected, green circle if connected
  if (!playbackState?.playback_id) {
    return <div className="h-4 w-4 rounded-full bg-red-500"></div>;
  }
  return <div className="h-4 w-4 rounded-full bg-green-500"></div>;
}

export function Player() {
  const token = useTokenContext();
  const playerDevice = usePlayerDevice();
  console.log(playerDevice);

  // TODO: Make auto transfer work
  useEffect(() => {
    if (playerDevice?.device_id === undefined) return;

    // https://developer.spotify.com/documentation/web-api/reference/#endpoint-transfer-a-users-playback
    void takeControl({
      accessToken: token.token,
      deviceId: playerDevice.device_id,
    });
  }, [playerDevice?.device_id, token]);
  return (
    <div>
      <h1>Player</h1>
      <ConnectedIndicator />
    </div>
  );
}
