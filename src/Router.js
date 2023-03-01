import React from "react";
import {Route, Routes} from "react-router-dom"
import Appbar from './Components/Appbar'
import WelcomePage from './WelcomePage'
import {Test} from './Test'
import MateInOne from './MateInOne'
import Schedule from './Schedule'
import About from './About'
import AltWelcomePage from './AltWelcomePage'
import Home from './Oniperate Template/Home'
import Dashboard from './DashboardFolder/Dashboard'

function Router() {
    return(
        <div>
        <Appbar />
        <Routes>
            <Route path="/" element={<WelcomePage />}/>
            <Route path="/test" element={<Test />} />
            <Route path="/mateinone" element={<MateInOne />} />
            <Route path="/schedule" element={<Schedule /> } />
            <Route path="/about" element={<About />} />
            <Route path="/altWelcome" element={<AltWelcomePage />} />
            <Route path="/oniperateHome" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </div>
    )
}

export default Router;