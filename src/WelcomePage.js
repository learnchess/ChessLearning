import './WelcomePage.css';
import React, {useState} from "react";
import image from './Images/image.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import {Typography} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react'

const WelcomePage = () => {
    const navigate = useNavigate()
    const {loginWithRedirect} = useAuth0();
    const {logout} = useAuth0();

    const {user, isAuthenticated, isLoading} = useAuth0();
    const [logged, setLogged] = useState(false)
    

    const Button1 = () => (
        <div className="button">
        <Button variant="contained" onClick={OnClickButton1}>Test</Button>
      </div>
      )

    const OnClickButton1 = () => {
        navigate("/test")
    }

return (
    <div className="Container">
        <img id="board2" src={image} alt="Chess Board"/>
        <div className = "introText">
        <Typography>Welcome! We use personalized methods to make sure you're learning as quickly and effectively as possible. To get started, we'll test your level so that we don't waste your time on uneccesary lessons.</Typography> 
        <Button1 />
        {isLoading ? <h2>Loading</h2> : user}
        {isAuthenticated ? <Button variant="contained" onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}>Log Out</Button> : <Button variant="contained" onClick={() => loginWithRedirect()}>Log In</Button> }
        
        </div>
    </div>
)

}

export default WelcomePage;