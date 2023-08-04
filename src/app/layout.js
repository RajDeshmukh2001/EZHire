'use client'

import './globals.css'
import { Exo_2, Signika } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { ThemeProvider } from 'styled-components';

const exo = Exo_2({ weight: ['300', '400', '500', '600', '700', '800'], subsets: ['latin'], display: 'swap' });

const theme = {
  mainColor: "#203647",
  textColor: "#888"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={exo.className}>
        <ThemeProvider theme={theme}>
          <div className="container">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
