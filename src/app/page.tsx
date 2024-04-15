import { clerkClient, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { PlayerProvider } from "./player-provider";

export default async function HomePage() {
  const signedInUser = await currentUser();

  // TODO: Handle
  if (!signedInUser?.id) return null;
  const tokens = await clerkClient.users.getUserOauthAccessToken(
    signedInUser.id,
    "oauth_spotify",
  );
  const validToken = tokens?.find((token) => token.token);

  // TODO: Handle
  if (!validToken)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Link href="/api/auth/signin">
          <a className="text-3xl font-bold">Sign in with Spotify</a>
        </Link>
      </main>
    );
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-8 text-white">
      <PlayerProvider token={validToken.token} />
    </main>
  );
}
