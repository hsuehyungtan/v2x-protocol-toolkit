import Link from "next/link";
import React from "react";

export const ToolCard = ({ href, title, description }) => {
    return (
        <Link
            href={href}
            className="group rounded-lg border px-5 py-4 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-800 border-zinc-200 dark:hover:border-zinc-700 hover:dark:bg-zinc-800/50"
        >
            <h2 className="mb-3 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                {title}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                </span>
            </h2>
            <p className="m-0 text-sm text-zinc-500 dark:text-zinc-400">
                {description}
            </p>
        </Link>
    );
};
