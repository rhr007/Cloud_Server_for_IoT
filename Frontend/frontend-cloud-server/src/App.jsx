import { useState } from 'react'

import {Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import About from './components/About'
import Contact from './components/Contact'
import Feature from './components/Feature'
import Home from './components/Home'
import SignIn from './components/Signin'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app-container'>
      <Navbar />
      
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='feature' element={<Feature />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='signin' element={<SignIn />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
