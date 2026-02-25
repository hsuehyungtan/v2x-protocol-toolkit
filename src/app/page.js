import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 bg-white dark:bg-black sm:items-start gap-12">
        <Image
          className="dark:invert relative left-[50%] -translate-x-[50%] sm:left-0 sm:translate-x-0"
          src={getAssetPath("/next.svg")}
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <div className="flex w-full flex-col gap-6 max-w-md">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">V2X Protocol Toolkit</h1>
            <p className="text-base text-zinc-500 dark:text-zinc-400">Tools and utilities for working with V2X protocols</p>
          </div>

          <div className="grid gap-4 w-full">
            <Link
              href="/time-calculator"
              className="group rounded-lg border px-5 py-4 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-800 border-zinc-200 dark:hover:border-zinc-700 hover:dark:bg-zinc-800/50"
            >
              <h2 className="mb-3 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                Time Calculator{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 text-sm text-zinc-500 dark:text-zinc-400">
                Convert MOY and Timestamp to standard Date and Time.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
