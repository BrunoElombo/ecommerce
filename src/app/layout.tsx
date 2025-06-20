import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import HeaderSection from "./modules/HeaderSection";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "JK wears",
  description: "We craft timeless pieces with a focus on sustainability, Using eco-friendly materials and ethical production practices. We use innovative fabrics and ergonomic designs to help you build your wardrobe that is STYLISH, RESPONSIBLE AND FITS FOR YOUR FITNESS GOALS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <HeaderSection />
        {children}
      </body>
    </html>
  );
}
