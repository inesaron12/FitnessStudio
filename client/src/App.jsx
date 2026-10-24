import { BrowserRouter, Routes, Route } from 'react-router'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { Classes } from './components/Classes'
import { Staff } from './components/Staff'
import { Membership } from './components/Membership'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Login } from './components/Login'

// Main landing page wrapper component
function HomePage() {
  return (
    <>
      <Home />
      <Classes />
      <Staff />
      <Membership />
      <Contact />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark text-main">
        <Header />
        <Routes>
          {/* Main landing route */}
          <Route path="/" element={<HomePage />} />

          {/* Authentication routes passing the active mode */}
          <Route path="/login" element={<Login mode="signin" />} />
          <Route path="/signup" element={<Login mode="signup" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App