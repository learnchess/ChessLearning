import './AltWelcomePage.css';
import React from "react";
import image from './Images/imageOfMe.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import {Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fe6048',
    },
  },
});

const WelcomePage = () => {
    const navigate = useNavigate()
    
    const Button1 = () => (
    <div>
    <ThemeProvider theme={theme}>
        <Button color='primary' size="large" variant="contained" onClick={OnClickButton1}>About Me</Button>
        </ThemeProvider>
      </div>
      )

    const OnClickButton1 = () => {
        navigate("/about")
    }
return (
    <div className="ContainerAlt">
        <div className = "intText firstItem">
        <h1 className="text1">Chess Lessons from a 17 year old National Master</h1> 
        <Button1 />
        </div>
        <img className="board firstItem" src={image} alt="Chess Board"/>
    </div>
)

}

export default WelcomePage;