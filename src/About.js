import './About.css'
import {Typography} from '@mui/material'
import youngImage from './youngImage.png'
import streetMe from './StreetMe.png'
import yesuntumur from './yesuntumur.png'
import SuperStates from './SuperStates.png'

function About() {
    return (
        <div className="container">
            <div className="block1">
                <div className="item1">
                <Typography sx={{fontWeight: 'bold'}} variant="h2" className="sect1" color="white">Hi, I'm Gabriel</Typography>
                <Typography variant="subtitle1" className="sect1" color="white">
                    My name is Gabriel Eidelman, and I am currently 17 years old. I have been playing chess since the age of 6. Since then, I have developed a deep love and passion for it and have played in tournaments in Greece, Brazil, Canada, the Czech Republic, and all over the United States.  I became a National Master at age 13, and have been a top player for my age my entire life. </Typography>
                </div>
                <img id="youngMe" className="item1" src={youngImage} alt="Young Me"/>
            </div>

            <div className="block2">
                <img id="streetMe" src={streetMe} alt="Young Me" />
            </div>

            <div className="block3">
                <img id="yesuntumur" src={yesuntumur} alt="Young Me" />
            </div>

            <div className="block4">
                <img id="SuperStates" src={SuperStates} alt="Young Me" />
            </div>
        </div>
    )
}

export default About;