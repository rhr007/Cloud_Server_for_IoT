import { useState } from 'react'

import {Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import About from './components/About'
import Contact from './components/Contact'
import Feature from './components/Feature'
import Home from './components/Home'
import SignIn from './components/SignIn'
import Footer from './components/Footer'
import Activate from './components/Activate'
import Dashboard from './components/Dashboard'
import CreateProject from './components/CreateProject'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app-container'>
      {/* <Navbar /> */}
      
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='feature' element={<Feature />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='activate' element={<Activate />} />
        <Route path='dashboard'element={<Dashboard />} />
        <Route path='create-project' element={<CreateProject />}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
