import React from "react";
import {Route, Routes} from "react-router-dom"
import Appbar from './Components/Appbar'
import WelcomePage from './WelcomePage'
import Test from './Test'
import MateInOne from './MateInOne'
import Schedule from './Schedule'
import About from './About'
import AltWelcomePage from './AltWelcomePage'

function Router() {
    return(
        <div>
        <Appbar />
        <Routes>
            <Route path="/" element={<AltWelcomePage />}/>
            <Route path="/test" element={<Test />} />
            <Route path="/mateinone" element={<MateInOne />} />
            <Route path="/schedule" element={<Schedule /> } />
            <Route path="/about" element={<About />} />
            <Route path="/altWelcome" element={<WelcomePage />} />
        </Routes>
        </div>
    )
}

export default Router;