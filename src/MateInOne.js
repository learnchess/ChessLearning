import "./MateInOne.css";
import Chessground from "@react-chess/chessground";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { useState } from "react";
import { Chess, SQUARES } from "chess.js";
import { Button, Typography } from "@mui/material";

//puzzle 1
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

function MateInOne() {
  console.log(numCorrect);
  const [frame, runFrame] = useState(false);
  const [showButton1, setShowButton1] = useState(false);
  const [showButton2, setShowButton2] = useState(false);

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
  const Button1 = () => (
    <div className="button">
      <Button variant="contained" onClick={OnClickButton1}>
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

  const OnClickButton1 = () => {
    if (puzzleStatus === 1) {
      fenNoUpdate = secondPuzzleFen;
      origMove = secondPuzzleOrig;
    } else if (puzzleStatus === 2) {
      fenNoUpdate = thirdPuzzleFen;
      origMove = thirdPuzzleOrig;
    } else {
      return;
    }

    chess.load(fenNoUpdate);
    firstPuzzleMove(origMove);
    if (chess.turn() === "w") {
      orientationColor = "b";
    } else if (chess.turn() === "b") {
      orientationColor = "w";
    }
    puzzleStatus++;
    if(incorrectPuzzle===false) {
      numCorrect++;
    }
    else {
      incorrectPuzzle=false;
    }
    setShowButton1(false);
  };

  const onClickButton2 = () => {
    incorrectPuzzle=true;
    chess.undo();
    fenNoUpdate = chess.fen();
    setShowButton2(false);
  };

  const checkOneMovePuzzle = (theMove, theCorrectMove) => {
    if (theMove === theCorrectMove) {
      setShowButton1(true);
    } else {
      setShowButton2(true);
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
    <div className="container">
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
          {turnColor === "w" ? (
            <Typography variant="h3">White To Move</Typography>
          ) : (
            <Typography variant="h3">Black To Move</Typography>
          )}
        </div>

        <div>
          {showButton1 ? <Button1 /> : null}
          {showButton2 ? <Button2 /> : null}
        </div>
      </div>
    </div>
  );
}

export default MateInOne;
