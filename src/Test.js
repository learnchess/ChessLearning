import React, {useState} from 'react';
import './Test.css'
import {Button, IconButton, Typography} from '@mui/material'
import Chessground from "@react-chess/chessground";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { Chess, SQUARES } from "chess.js";
import {DoneOutline, Close} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Dashboard from './DashboardFolder/Dashboard'

const firstPuzzleFen = "8/5p2/5N2/5p2/1p3P2/3k3p/P2r2r1/3RR2K w - - 3 42";
const firstPuzzleOrig = "Rg1";

//puzzle 2
const secondPuzzleFen =
  "r4rk1/1p3pp1/p2p1n1p/3P4/1P1Q1Bqn/P1N5/2B2PPP/2R1R1K1 w - - 0 1";
const secondPuzzleOrig = "g3";
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
let move = 1;
export let level = [-1, -1, [-1, -1]]
//level[0] is self-assesment
//level[1] is tactical abilities
//level[1][0] is checkmates
//

export function Test() {
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
    const [showNextPuzzleMove, setShowNextPuzzleMove] = useState(false);
    
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
        <Button variant="contained" color="success" onClick={onClickButton1}>
          Continue
        </Button>
      </div>
    );
  
    const Button2 = () => (
      <div className="button">
        <Button variant="contained" color="error" onClick={onClickButton2}>
          Try Again.
        </Button>
      </div>
    );
    
    const onClickNoClueButton = () => {

      //fill in logic later.
      setShowTestSet(false);
      setShowNewPlayer(true);
    };
  
    const onClickButton1 = () => {
      if(puzzleStatus!==3) {
        move=1;
      if (puzzleStatus === 1) {
        if(incorrectPuzzle===false) {
          level[2][0]=1;
        }
        else {
          level[2][0]=0;
        }
        fenNoUpdate = secondPuzzleFen;
        origMove = secondPuzzleOrig;
      } else if (puzzleStatus === 2) {
        if(incorrectPuzzle===false) {
          level[2][1]=1;
        }
        else {
          level[2][1]=0;
        }
        fenNoUpdate = thirdPuzzleFen;
        origMove = thirdPuzzleOrig;
      }
  
      chess.load(fenNoUpdate);
      //setTimeout
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
        level[1]=numCorrect;
         setShowTestSet(false);
         setShowNewPlayer(true);
         console.log(level)
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
const checkTwoMovePuzzle = (theMove, correctFirstMove, theResponse, correctSecondMove) => {
  if(move===1) {
    if(theMove===correctFirstMove) {

       chess.move(theResponse);      
       fenNoUpdate = chess.fen();
       move++;
        setShowNextPuzzleMove(true);
     }
     else {
       setShowButton2(true);
       setShowNoClueButton(false);
     }
   }
   else if(move===2) {
    setShowNextPuzzleMove(false);
     if(theMove===correctSecondMove) {
       setShowButton1(true);
       setShowNoClueButton(false);
     }
     else {
       setShowButton2(true);
       setShowNoClueButton(false);
     }
   }
}
    // const checkOneMovePuzzle = (NewMove: any, from1: string, to1: string) => {
//   if(NewMove.from===from1 && NewMove.to===to1) {
//     setShowButton1(true);
//   }
//   else {
//     setShowButton2(true);
//   }
// }

  
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
        checkTwoMovePuzzle(newMove.san, "Nf3+", "Kg2", "Nxd4");
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
      
          <div className="anItem">
          
            {turnColor === "w" ? (
              <Typography variant="h3">White To Move</Typography>
            ) : (
              <Typography variant="h3">Black To Move</Typography>
            )}
            {showButton1 ? <Button1 /> : null}
            {showButton2 ? <Button2 /> : null}
            {showNoClueButton ? <NoClueButton /> : null}
            
            {puzzleStatus===1 && showButton1===false && showButton2===false && incorrectPuzzle===false ? <div className="introText"><Typography variant="h6">What's the best move in this position? If you have no idea what this is, just click I don't know.</Typography></div> : null }
            {showNextPuzzleMove ? <div className="nextPuzzle"><Typography color="green" variant="h6">Correct! Can you find the next move?</Typography></div> : null}
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
    const navigate = useNavigate()
    function ClickDashboard() {
      navigate('/dashboard')
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
    const [isNotNewSelected, SetNotNewSelected] = useState(false);
    const [runFrame, SetRunFrame] = useState(false);
    const [showTestSet, setShowTestSet] = useState(false);
    const [showNewPlayer, setShowNewPlayer] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);

    const Next = (s) => {
      if (s==='new') {
        Choice = "new";
        level[0] = 0;
        setShowQuestion1(false);
        setShowNewPlayer(true);
      } else if (s==='not new') {
        Choice= "not new";
        level[0]=1;
        setShowQuestion1(false);
        setShowTestSet(true);
        setCurrentQuestion(currentQuestion + 1);
      }
      else {
        alert("please click one of the options")
      }
    };

    const Question = () => {
        return(
<div className="test">

    {/* Question Card */}
    <div className="question-card">
      <h3 className="question-text">
        Are you new to chess?
      </h3>
        <div className="button5">
        <Button color="success" variant="outlined" startIcon={<DoneOutline />} onClick={() => Next("new")}>
          Yes
        </Button>
        <Button color="error" variant="outlined" startIcon={<Close />} onClick={() => Next("not new")}>
          No
        </Button>
        </div>
    </div>
  </div>
        )
    }

return (
    <div className="page">
    {showQuestion1 ? <Question /> : null }
    {showTestSet ? <MateInOne /> : null}
    {showNewPlayer ? <NewPlayer /> : null}
    {showDashboard ? <Dashboard /> : null}

    </div>
)

}