import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import BackgroundGlow from "@/components/shared/BackgroundGlow";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Academic Portfolio | Computer Science",
    template: "%s | Academic Portfolio",
  },
  description:
    "Academic & Data Science Portfolio showcasing Jupyter notebooks, research papers, and computational projects. Bridging Code & Theory.",
  keywords: [
    "Computer Science",
    "Data Science",
    "Machine Learning",
    "Algorithms",
    "Research",
    "Portfolio",
  ],
  authors: [{ name: "CS Undergraduate" }],
  creator: "CS Undergraduate",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Academic Portfolio | Computer Science",
    description: "Academic & Data Science Portfolio - Bridging Code & Theory",
    siteName: "Academic Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academic Portfolio | Computer Science",
    description: "Academic & Data Science Portfolio - Bridging Code & Theory",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BackgroundGlow />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
