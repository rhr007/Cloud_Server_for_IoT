import { useState } from 'react'

import {Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import About from './About'
import Contact from './components/Contact'
import Feature from './Feature'
import Home from './Home'
import SignIn from './components/Signin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='feature' element={<Feature />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='signin' element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App
