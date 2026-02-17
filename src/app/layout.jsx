

// app/layout.js
import Header from "@/components/layout/Header/Header";
import '../styles/globals.css'
import { Poppins } from 'next/font/google'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "@/components/layout/Footer/Footer";
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
      <Header />
      <body>{children}</body>
      <Footer />
    </html>
  );
}
