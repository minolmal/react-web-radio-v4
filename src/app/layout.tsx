import type { Metadata } from "next";
import { Assistant } from "next/font/google";

import "@/styles/app.scss";

const assistant = Assistant({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Web Radio",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={assistant.className}>
        {/* initial spinner */}
        <div id="_spnr">
          {/* <svg
            width="100"
            height="100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className="lds-ring">
            <circle cx="50" cy="50" fill="none" r="40" stroke="#8086a0" stroke-width="10"></circle>
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="40"
              stroke="#1e1f30"
              stroke-width="6"
              stroke-linecap="round"
              stroke-dasharray="150 100"></circle>
          </svg> */}
          <noscript>
            This applications requires Javascript to run. Make sure Javascript is enabled in your
            web browser settings and try again.
            <a href="https://www.enable-javascript.com/" target="_blank">
              Visit this link
            </a>
            for more information on how to enable Javascript.
          </noscript>
        </div>

        <div className="app-wrap">
          <main className="player-wrap" style={{ opacity: 1 }}>
            <figure className="player-bg" />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
