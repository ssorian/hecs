import type { Metadata } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valdez Stairs and Trim — Custom Stair Installation | Free Estimates",
  description:
    "Custom hardwood stair installation, trim, and finish carpentry in Texas. White oak, maple, walnut staircases and full millwork packages. Get a free estimate in 2 minutes. Licensed, insured, 18+ years of experience.",
  keywords: ["stair installation", "hardwood stairs", "custom staircase", "trim", "millwork", "crown molding", "stair refinishing", "Texas"],
  openGraph: {
    title: "Valdez Stairs and Trim — Custom Stair Specialists",
    description: "Get your free stair installation estimate in 2 minutes. No calls, no waiting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${raleway.variable}`}>
      <head>
        {/* Preload hero background for LCP */}
        {/* Path kept in sync with CONTENT.hero.heroImage in lib/content.ts */}
        <link
          rel="preload"
          as="image"
          href="https://picsum.photos/id/1078/1920/1080"
        />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
