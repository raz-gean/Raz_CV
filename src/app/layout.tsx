import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Gean T. Raz | Full-stack web developer",
  description:
    "CV of Gean T. Raz, a fourth-year BSIT student at Davao del Norte State College building full-stack web apps, mobile apps and games.",
  authors: [{ name: "Gean T. Raz" }],
  openGraph: {
    title: "Gean T. Raz | Full-stack web developer",
    description:
      "BSIT student building full-stack web apps, mobile apps and games. Open to internships, OJT and freelance work.",
    images: ["/imgs/profile.jpg"],
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f2f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1325" },
  ],
};

// Runs before paint so a saved theme never flashes the wrong colors.
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
