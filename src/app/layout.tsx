import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AuthProvider } from "@/lib/tienda/AuthContext";
import { CartProvider } from "@/lib/tienda/CartContext";
import BotonCarritoFlotante from "@/components/tienda/BotonCarritoFlotante";
import BotonWhatsApp from "@/components/tienda/BotonWhatsApp";
import RegistrarServiceWorker from "@/components/tienda/RegistrarServiceWorker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Escuela de los Haikus Gnósticos",
  description: "Bienvenido a la magia del Kaos",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/tienda/pwa/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#4c1d95",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="metricool"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"fd491e9a4336f6d1e67302e8eebc831d"})});`
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            {children}
            <BotonWhatsApp />
            <BotonCarritoFlotante />
          </CartProvider>
        </AuthProvider>
        <RegistrarServiceWorker />
      </body>
    </html>
  );
}