import { Sora as SoraFont } from "next/font/google";

export const Sora = SoraFont({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-Sora",
});
