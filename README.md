# V2X Protocol Toolkit

A Next.js web application that serves as a utility toolkit for V2X (Vehicle-to-Everything) protocol development. Currently, it features a **V2X Message Time Calculator** to convert MOY (MinuteOfTheYear) and Timestamp into standard DateTime formats and calculate TimeMark.

## Features

- **DateTime Conversion**: Convert V2X MOY (MinuteOfTheYear) and Timestamp (ms) into a standard Date/Time.
- **TimeMark Calculation**: Automatically calculates the TimeMark (tenths of a second since the start of the hour).
- **ISO 8601 Output**: Provides standard ISO string representation of the calculated time.

## Tech Stack

This project is built with a modern web stack, adhering to a Clean Architecture approach:

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (ES6+)
- **Compiler**: React Compiler
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm

## Getting Started

First, install the dependencies using pnpm:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the application.

## Development Standards

- **Server Components**: Prioritized where possible.
- **Styling**: Exclusively Tailwind CSS with a mobile-first responsive design approach.
- **Static Export**: The application is configured for static export.

## License

This project is licensed under the MIT License.
