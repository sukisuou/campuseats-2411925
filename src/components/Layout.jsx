// handles the header and footer, as well as content in the middle

import { Outlet } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}