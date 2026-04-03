import { Outlet } from 'react-router-dom'
import { TopBar } from './TopBar'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
