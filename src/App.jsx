import React from 'react'
import './litera-bootstrap.css'
import { Container, Row, Col } from 'react-bootstrap'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AboutPage from './pages/AboutPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function App() {


  return (
    <div className="App">
        <HashRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </HashRouter>
        {/* <LandingPage /> */}
    </div>
  )
}

export default App
