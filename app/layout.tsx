import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "MAMMAMIA - Verse Shoarma & Mixed Grill Specialiteiten",
  description:
    "Bestel verse shoarma en mixed grill online. Kipshoarma, lamsshoarma, kapsalon en meer. Snelle bezorging in Amsterdam.",
  keywords: ["shoarma", "mixed grill", "kapsalon", "online bestellen", "Amsterdam", "Rotterdam", "bezorgen"],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c8522e",
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
