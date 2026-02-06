import './globals.css'
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'LuxTours - Premium Tour Booking',
  description: 'Experience the world in style.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pt-20">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
