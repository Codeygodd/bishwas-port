import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Bishwas Pandey - Full Stack Developer",
  description: "Full-Stack Developer passionate about creating innovative web solutions that make a difference.",
  generator: "v0.app",
  keywords: ["Bishwas Pandey", "Full Stack Developer", "React", "Next.js", "TypeScript", "Nepal"],
  authors: [{ name: "Bishwas Pandey" }],
  openGraph: {
    title: "Bishwas Pandey - Full Stack Developer",
    description: "Full-Stack Developer passionate about creating innovative web solutions that make a difference.",
    url: "https://pandeybishwas.com.np",
    siteName: "Bishwas Pandey Portfolio",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.jpg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
