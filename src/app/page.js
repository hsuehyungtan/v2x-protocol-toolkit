import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import { ToolCard } from "@/components/features/ToolCard";

export default function Home() {
  const tools = [
    {
      href: "/time-calculator",
      title: "Time Calculator",
      description: "Convert MOY and Timestamp to standard Date and Time."
    }
  ];

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
            {tools.map((tool) => (
              <ToolCard
                key={tool.href}
                href={tool.href}
                title={tool.title}
                description={tool.description}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
