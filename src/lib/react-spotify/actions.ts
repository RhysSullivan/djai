export function takeControl(input: { accessToken: string; deviceId: string }) {
  void fetch(`https://api.spotify.com/v1/me/player`, {
    method: "PUT",
    body: JSON.stringify({
      device_ids: [input.deviceId],
      play: false,
    }),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${input.accessToken}`,
    },
  });
}
