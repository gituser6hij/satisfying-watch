import { Geist, Geist_Mono } from "next/font/google";
import { Roboto, Orbitron, Montserrat } from "next/font/google"; // Import the new fonts
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define the new Google Fonts
const roboto = Roboto({
  weight: ["400", "700"], // Specify weights you want
  subsets: ["latin"],
  variable: "--font-roboto",
});

const orbitron = Orbitron({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Watch",
  description: "Crafted by user137",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${orbitron.variable} ${montserrat.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
