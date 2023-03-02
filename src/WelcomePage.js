import './WelcomePage.css';
import React, {useState} from "react";
import image from './Images/image.png';
import { useNavigate } from 'react-router-dom';
import {Typography, ThemeProvider, createTheme, Button} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react'
import theme from './Theme'

const WelcomePage = () => {
    const navigate = useNavigate()
    const {loginWithRedirect} = useAuth0();
    const {logout} = useAuth0();

    const {user, isAuthenticated, isLoading} = useAuth0();

    const OnClickButton1 = () => {
        navigate("/test")
    }

return (
    
    <div className="Overlay" >
    <ThemeProvider theme={theme}>
    <div className="Container">
        <img className="board2" src={image} alt="Chess Board"/>
        <div className="textButton">

        <Typography color="white" variant="h2">Structured training for faster learning</Typography> 
        <Button variant="contained" sx={{bgcolor: 'text.light'}} onClick={OnClickButton1}>Test</Button>
        
        </div>
    </div>
    </ThemeProvider>
    </div>
)

}

export default WelcomePage;