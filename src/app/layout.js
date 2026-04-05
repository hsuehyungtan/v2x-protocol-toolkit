import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import packageJson from "../../package.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "V2X Protocol Toolkit",
  description: "Convert MOY and Timestamp into standard DateTime for V2X protocols",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <main className="flex-grow flex flex-col w-full">
          {children}
        </main>
        <footer className="w-full py-4 text-center text-sm text-gray-500">
          v{packageJson.version}
        </footer>
      </body>
    </html>
  );
}
