import type { Metadata } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import { ENTITY, faqJsonLd, organizationJsonLd } from "@/lib/aeo/entity";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: { default: `${ENTITY.name} — ${ENTITY.tagline}`, template: `%s · ${ENTITY.name}` },
  description: ENTITY.description,
  keywords: ENTITY.knowsAbout,
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
        {children}
      </body>
    </html>
  );
}
