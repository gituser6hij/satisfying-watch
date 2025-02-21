import { Geist, Geist_Mono } from "next/font/google";
import { 
  Roboto, Orbitron, Montserrat, Fira_Code, Poppins, Playfair_Display, 
  Space_Mono, Pacifico, Bebas_Neue, Lobster, Raleway, Cinzel, 
  Press_Start_2P, Major_Mono_Display, Rubik, Abril_Fatface, Quicksand, Righteous, Monoton, VT323, Share_Tech_Mono 
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "700"],
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

// Define additional fonts with correct formatting
const firaCode = Fira_Code({ 
  variable: "--font-fira-code", 
  subsets: ["latin"] 
});

const poppins = Poppins({ 
  variable: "--font-poppins", 
  subsets: ["latin"], 
  weight: ["400", "700"]
});

const playfairDisplay = Playfair_Display({ 
  variable: "--font-playfair", 
  subsets: ["latin"], 
  weight: ["400", "700"]
});

const spaceMono = Space_Mono({ 
  variable: "--font-space-mono", 
  subsets: ["latin"], 
  weight: ["400", "700"]
});

const pacifico = Pacifico({ 
  variable: "--font-pacifico", 
  subsets: ["latin"], 
  weight: ["400"]
});

const bebasNeue = Bebas_Neue({ 
  variable: "--font-bebas-neue", 
  subsets: ["latin"], 
  weight: ["400"]
});

const lobster = Lobster({ 
  variable: "--font-lobster", 
  subsets: ["latin"], 
  weight: ["400"]
});

const raleway = Raleway({ 
  variable: "--font-raleway", 
  subsets: ["latin"], 
  weight: ["400", "700"]
});

const cinzel = Cinzel({ 
  variable: "--font-cinzel", 
  subsets: ["latin"], 
  weight: ["400", "700"]
});

const pressStart2P = Press_Start_2P({ 
  variable: "--font-press-start", 
  subsets: ["latin"], 
  weight: ["400"]
});

const majorMonoDisplay = Major_Mono_Display({ 
  variable: "--font-major-mono", 
  subsets: ["latin"], 
  weight: ["400"]
});

const rubik = Rubik({ 
  variable: "--font-rubik", 
  subsets: ["latin"], 
  weight: ["400", "700"]
});

const abrilFatface = Abril_Fatface({ 
  variable: "--font-abril-fatface", 
  subsets: ["latin"], 
  weight: ["400"]
});

const quicksand = Quicksand({ 
  variable: "--font-quicksand", 
  subsets: ["latin"], 
  weight: ["400", "700"]
});

const righteous = Righteous({ 
  variable: "--font-righteous", 
  subsets: ["latin"], 
  weight: ["400"]
});

const monoton = Monoton({ 
  variable: "--font-monoton", 
  subsets: ["latin"], 
  weight: ["400"]
});

const vt323 = VT323({ 
  variable: "--font-vt323", 
  subsets: ["latin"], 
  weight: ["400"]
});

const shareTechMono = Share_Tech_Mono({ 
  variable: "--font-share-tech-mono", 
  subsets: ["latin"], 
  weight: ["400"]
});

export const metadata = {
  title: "Watch",
  description: "Crafted by user137",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} 
          ${roboto.variable} ${orbitron.variable} ${montserrat.variable}
          ${firaCode.variable} ${poppins.variable} ${playfairDisplay.variable} 
          ${spaceMono.variable} ${pacifico.variable} ${bebasNeue.variable}
          ${lobster.variable} ${raleway.variable} ${cinzel.variable}
          ${pressStart2P.variable} ${majorMonoDisplay.variable} ${rubik.variable}
          ${abrilFatface.variable} ${quicksand.variable}
          ${righteous.variable} ${monoton.variable} ${vt323.variable} 
          ${shareTechMono.variable}
        `}
      >
        {children}
      </body>
    </html>
  );
}
