/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pElUF6n
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useEffect } from "react";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import { useTokenContext } from "./components/provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { DotFilledIcon, PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { takeControl } from "~/lib/react-spotify/actions";
function ConnectedIndicator() {
  const playbackState = usePlaybackState(true, 100);

  // Red circle if not connected, green circle if connected
  return (
    <Popover>
      <PopoverTrigger>
        <DotFilledIcon
          className={`h-12 w-12 ${
            playbackState?.playback_id
              ? "stroke-green-500 text-green-500"
              : "stroke-red-500 text-red-500"
          }`}
        />
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
}

export function Player() {
  const token = useTokenContext();
  const playerDevice = usePlayerDevice();
  const playback = usePlaybackState();
  const player = useSpotifyPlayer();

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
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md dark:bg-zinc-900">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <svg
            className=" h-6 w-6 text-yellow-500"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          <div className="mx-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
              {playback?.track_window?.current_track?.name ?? "No track"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {playback?.track_window?.current_track?.artists[0]?.name ??
                "No artist"}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <ConnectedIndicator />
        </div>
      </div>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={playback?.track_window?.current_track?.name ?? "No track"}
          className="h-64 w-full object-cover"
          height="300"
          src={
            playback?.track_window?.current_track?.album?.images[0]?.url ?? ""
          }
          width="300"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button onClick={() => player?.togglePlay()}>
            {playback?.paused ? (
              <PlayIcon className="h-16 w-16 text-white" />
            ) : (
              <PauseIcon className="h-16 w-16 text-white" />
            )}
          </button>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center">
          <svg
            className=" h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          </svg>
          <div className="mx-3 w-full">
            <div className="relative mt-1 h-1 overflow-hidden rounded bg-gray-200 dark:bg-gray-800">
              <div className="absolute left-0 top-0 h-full w-1/2 bg-yellow-500" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">50%</p>
        </div>
        <div className="mt-3 flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>00:00</span>
          <span>3:35</span>
        </div>
      </div>
    </div>
  );
}
