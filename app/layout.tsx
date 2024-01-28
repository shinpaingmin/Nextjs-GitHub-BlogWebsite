import './globals.css'
import Navbar from './components/Navbar'
import MyProfilePic from './components/MyProfilePic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Shin's Blog",
  description: 'Created by Shin Paing Min',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='dark:bg-slate-800'>
        <Navbar />
        <MyProfilePic />
        {children}
      </body>
    </html>
  )
}
