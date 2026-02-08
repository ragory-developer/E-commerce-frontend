

// app/layout.js
import '../styles/globals.css'
import { Poppins } from 'next/font/google'

// Import Poppins globally
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  title: 'My E-Commerce Site',
  description: 'Next.js E-Commerce',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>{children}</body>
    </html>
  )
}
