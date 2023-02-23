import './WelcomePage.css';
import React from "react";
import image from './image.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import {Typography} from '@mui/material';

const WelcomePage = () => {
    const navigate = useNavigate()
    
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
        </div>
    </div>
)

}

export default WelcomePage;