import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SchoolStickerApp - Créateur d\'étiquettes',
  description: 'Application web pour créer, personnaliser et imprimer des feuilles d\'étiquettes autocollantes pour l\'école',
  keywords: ['étiquettes', 'stickers', 'école', 'impression', 'personnalisation'],
  authors: [{ name: 'SchoolStickerApp Team' }],
  creator: 'SchoolStickerApp',
  publisher: 'SchoolStickerApp',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}