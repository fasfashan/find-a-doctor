import {
  Geist,
  Geist_Mono,
  Inter,
  Plus_Jakarta_Sans,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: " --font-inter",

  subsets: ["latin"],
});
const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  variable: " --font-inter",

  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Murni Hospitals | Find a Doctor Simulation",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${plus_Jakarta_Sans.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
