// Je configure le layout racine avec les polices et le theme medical
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CardioAI - Prediction de Maladies Cardiaques par Consensus IA",
  description:
    "Plateforme de prediction de maladies cardiaques utilisant 3 modeles d'intelligence artificielle en consensus. Projet academique Master Big Data & IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
        <div className="page-glow bg-accent-red/20 -top-[200px] -left-[200px]" />
        <div className="page-glow bg-accent-red-dark/20 -bottom-[200px] -right-[200px]" />

        <Navbar />
        <main className="relative z-10 pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
