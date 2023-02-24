import React, {useState} from 'react';
import './Test.css'
import {Button, Typography} from '@mui/material'
import Chessground from "@react-chess/chessground";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { Chess, SQUARES } from "chess.js";
import Dashboard from './DashboardFolder/Dashboard'

const firstPuzzleFen = "8/5p2/5N2/5p2/1p3P2/3k3p/P2r2r1/3RR2K w - - 3 42";
const firstPuzzleOrig = "Rg1";

//puzzle 2
const secondPuzzleFen =
  "2r3k1/pp2R1bp/2qp1r2/5pN1/5P2/2PQ2PK/P6P/3R4 w - - 1 28";
const secondPuzzleOrig = "Rde1";
//puzzle 3
const thirdPuzzleFen =
  "rbb2rk1/1pqn1ppp/p4n2/3B1N2/2P1p3/2N1P3/PPQB1PPP/R4RK1 w - - 0 1";
const thirdPuzzleOrig = "Nxe4";
let puzzleStatus = 1;

const chess = new Chess(firstPuzzleFen);
let fenNoUpdate = firstPuzzleFen;
let origMove = firstPuzzleOrig;
let orientationColor = "";
let firstRun = 1;
let incorrectPuzzle=false;
let numCorrect=0;
let Choice = ""
let level = [-1, [-1, -1]]
//level[0] is self-assesment
//level[1] is tactical abilities
//level[1][0] is checkmates
//

function Test() {
  /* MATE IN ONE SET */
  //
  //
  //
  //
  function MateInOne() {

    const [frame, runFrame] = useState(false);
    const [showButton1, setShowButton1] = useState(false);
    const [showButton2, setShowButton2] = useState(false);
    const [showNoClueButton, setShowNoClueButton] = useState(true);
  
    const firstPuzzleMove = () => {
      // setTimeout(() => {
      chess.move(origMove);
      fenNoUpdate = chess.fen();
      runFrame(!frame);
      // }, 1000);
    };
    if (firstRun === 1) {
      firstRun++;
      firstPuzzleMove();
    }
  
    const NoClueButton = () => (
      <div className="button">
        <Button variant="contained" onClick={onClickNoClueButton}>
          I Don't Know
        </Button>
      </div>
    );
    const Button1 = () => (
      <div className="button">
        <Button variant="contained" onClick={onClickButton1}>
          Continue
        </Button>
      </div>
    );
  
    const Button2 = () => (
      <div className="button">
        <Button variant="contained" onClick={onClickButton2}>
          Try Again.
        </Button>
      </div>
    );
    
    const onClickNoClueButton = () => {

      level[1][0] = 0;
      setShowMateInOne(false);
      setShowNewPlayer(true);
    };
  
    const onClickButton1 = () => {
      if(puzzleStatus!==3) {
      if (puzzleStatus === 1) {
        fenNoUpdate = secondPuzzleFen;
        origMove = secondPuzzleOrig;
      } else if (puzzleStatus === 2) {
        fenNoUpdate = thirdPuzzleFen;
        origMove = thirdPuzzleOrig;
      }
  
      chess.load(fenNoUpdate);
      firstPuzzleMove(origMove);
      if (chess.turn() === "w") {
        orientationColor = "b";
      } else if (chess.turn() === "b") {
        orientationColor = "w";
      }
      if(incorrectPuzzle===false) {
        numCorrect++;
      }
      else {
        incorrectPuzzle=false;
      }
      setShowNoClueButton(true);
    }
      else if(puzzleStatus===3) {
        if(incorrectPuzzle===false) {
        numCorrect++;
        }
        if(numCorrect===0) {
          level[1][0] = 0;
        }
        else if(numCorrect===1 || numCorrect===2 ) {
          level[1][0] = 1;
         }
         else if(numCorrect===3) {
          level[1][0] = 2;
         }
         setShowMateInOne(false);
         setShowNewPlayer(true);
         console.log(level[0] + ' ' + level[1][0])
      }
  
      puzzleStatus++;
      setShowButton1(false);
  
    };
  
    const onClickButton2 = () => {
      incorrectPuzzle=true;
      chess.undo();
      fenNoUpdate = chess.fen();
      setShowButton2(false);
      setShowNoClueButton(true);
    };
  
    const checkOneMovePuzzle = (theMove, theCorrectMove) => {
      if (theMove === theCorrectMove) {
        setShowButton1(true);
        setShowNoClueButton(false);
      } else {
        setShowButton2(true);
        setShowNoClueButton(false);
      }
    };
  
    const squaros = SQUARES;
    const turnColor = chess.turn() === "w" ? "white" : "black";
    const toDests = (chess) => {
      const dests = new Map();
      squaros.forEach((s) => {
        const ms = chess.moves({ square: s, verbose: true });
        if (ms.length)
          dests.set(
            s,
            ms.map((m) => m.to)
          );
      });
      return dests;
    };
  
    const handleMove = (from, to) => {
      let newMove = chess.move({ from, to });
      fenNoUpdate = chess.fen();
      if (puzzleStatus === 1) {
        checkOneMovePuzzle(newMove.san, "Rh2#");
      } else if (puzzleStatus === 2) {
        checkOneMovePuzzle(newMove.san, "Rh6#");
      } else if (puzzleStatus === 3) {
        checkOneMovePuzzle(newMove.san, "Qxh2#");
      }
      runFrame(!frame);
    };
  
    return (
      <div className="container4">
        <div className="item">
      
        <Chessground
            width={400}
            height={400}
            config={{
              fen: fenNoUpdate,
              orientation: turnColor === "w" ? "white" : "black",
              movable: {
                // color: turnColor==='w' ? 'white' : "black",
                free: false,
                dests: toDests(chess),
                showDests: true,
              },
              draggable: {
                showGhost: true,
                deleteOnDropOff: false,
              },
              events: {
                move: handleMove,
              },
              drawable: {
                defaultSnapToValidMove: false,
                enabled: true,
                visible: true,
                eraseOnClick: false,
              },
            }}
          />
        </div>
        <div className="button-text">
          <div className="item">
          {puzzleStatus===1 ? <div className="introText"><Typography variant="h6">What's the best move in this position? If you have no idea what this is, just click I don't know.</Typography></div> : null }
            {turnColor === "w" ? (
              <Typography variant="h3">White To Move</Typography>
            ) : (
              <Typography variant="h3">Black To Move</Typography>
            )}
          </div>
  
          <div>
            {showButton1 ? <Button1 /> : null}
            {showButton2 ? <Button2 /> : null}
            {showNoClueButton ? <NoClueButton /> : null}

          </div>
        </div>
      </div>
    );
  }

  /* END MATE IN ONE SET */
  //
  //
  //
  //

  function NewPlayer() {

    function ClickDashboard() {
      setShowNewPlayer(false);
      setShowDashboard(true);
    }
    return(
    <div>
      <h2>Great, thanks for completing the test! We've got all the info we need, so it's head over to dashboard and start learning!</h2>
    <Button onClick={ClickDashboard}>Dashboard</Button>
    </div>
    )
  }

    const [showQuestion1, setShowQuestion1] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isNewSelected, SetNewSelected] = useState(false);
    const [isBeginSelected, SetBeginSelected] = useState(false);
    const [isInterSelected, SetInterSelected] = useState(false);
    const [isAdvSelected, SetAdvSelected] = useState(false);
    const [runFrame, SetRunFrame] = useState(false);
    const [showMateInOne, setShowMateInOne] = useState(false);
    const [showNewPlayer, setShowNewPlayer] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);

    const Next = () => {
      if (isNewSelected === true) {
        Choice = "new";
        level[0] = 0;
        setShowQuestion1(false);
        setShowNewPlayer(true);
        setCurrentQuestion(currentQuestion + 1);
      } else if (isBeginSelected === true) {
        Choice = "beginner";
        level[0]=1;
        setShowQuestion1(false);
        setShowMateInOne(true);
        setCurrentQuestion(currentQuestion + 1);
      } else if (isInterSelected) {
        Choice = "intermediate";
        level[0]=2;
        setShowQuestion1(false);
        setShowMateInOne(true);
        setCurrentQuestion(currentQuestion + 1);
      } else if (isAdvSelected) {
        Choice = "advanced";
        level[0]=3;
        setShowQuestion1(false);
        setShowMateInOne(true);
        setCurrentQuestion(currentQuestion + 1);
      }
      else {
        alert("please click one of the options")
      }
    };
  
    const Select = (s) => {
      if (s === "new") {
        SetNewSelected(!isNewSelected);
        SetBeginSelected(false);
        SetInterSelected(false);
        SetAdvSelected(false);
      } else if (s === "beginner") {
        SetBeginSelected(!isBeginSelected);
        SetNewSelected(false);
        SetInterSelected(false);
        SetAdvSelected(false);
      } else if (s === "intermediate") {
        SetInterSelected(!isInterSelected);
        SetBeginSelected(false);
        SetNewSelected(false);
        SetAdvSelected(false);
      } else if (s === "advanced") {
        SetAdvSelected(!isAdvSelected);
        SetBeginSelected(false);
        SetInterSelected(false);
        SetNewSelected(false);
      }
    };

    const Question = () => {
        return(
<div className="test">
    {/* 1. Header */}
    <h1>Test</h1>

    {/* Question Card */}
    <div className="question-card">
      <h2>Question {currentQuestion + 1} out of 3</h2>
      <h3 className="question-text">
        How would you best describe your level?
      </h3>

      <ul>
        <li
          onClick={() => Select("new")}
          className={isNewSelected ? "selected" : "hello"}
        >
          Completely New{" "}
        </li>
        <li
          onClick={() => Select("beginner")}
          className={isBeginSelected ? "selected" : "hello"}
        >
          Beginner
        </li>
        <li
          onClick={() => Select("intermediate")}
          className={isInterSelected ? "selected" : "hello"}
        >
          Intermediate
        </li>
        <li
          onClick={() => Select("advanced")}
          className={isAdvSelected ? "selected" : "hello"}
        >
          Advanced
        </li>
      </ul>
      <Button onClick={Next} variant="contained" className="nextButton">
        Submit
      </Button>
    </div>
  </div>
        )
    }

return (
    <div>
    {showQuestion1 ? <Question /> : null }
    {showMateInOne ? <MateInOne /> : null}
    {showNewPlayer ? <NewPlayer /> : null}
    {showDashboard ? <Dashboard /> : null}

    </div>
)

}

export default Test;