import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('data:image/jpeg;base64,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')" }}>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div>
      </main>
    </HydrateClient>
  );
}
