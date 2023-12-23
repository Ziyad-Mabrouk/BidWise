import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'

const App = () => {
  return (
    <div className='App'>
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/bidwise/home' element={<Home/>}/>
            </Routes>
        </Router>
    </div>
  )
}

export default App