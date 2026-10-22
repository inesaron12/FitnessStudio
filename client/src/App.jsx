import { useState } from 'react'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { Classes } from './components/Classes'
import { Staff } from './components/Staff'
import { Membership } from './components/Membership'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Home />
      <Classes />
      <Staff />
      <Membership />
      <Contact />
      <Footer />

    </div>
  )
}

export default App
