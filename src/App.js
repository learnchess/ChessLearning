import './App.css';
import Chessground from '@react-chess/chessground'
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import {useState} from 'react';
import {Chess, SQUARES} from 'chess.js'
import {Button, Typography} from '@mui/material'

//puzzle 1
const firstPuzzleFen = "8/5p2/5N2/5p2/1p3P2/3k3p/P2r2r1/3RR2K w - - 3 42";
const firstPuzzleOrig = {from: 'e1', to: 'g1'}

const chess = new Chess(firstPuzzleFen);
function App() {
  const [fen, setFen] = useState(firstPuzzleFen);
  
  const squaros = SQUARES;
  const turnColor = chess.turn() === "w" ? "white" : "black";
  const toDests = (chess) => {
    const dests = new Map();
    squaros.forEach(s => {
      const ms = chess.moves({square: s, verbose: true});
      if (ms.length) dests.set(s, ms.map(m => m.to));
    });
    return dests;
  }
  

  const handleMove = (from, to) => {
    chess.move({ from, to });
    setFen(chess.fen());
  };


  return (
<Chessground 

  width={400}
  height={400}
  config={
    {
    fen: fen,
    movable: {
        color: turnColor, 
        free: false, 
        dests: toDests(chess),
        showDests: true
      },
      draggable: {
        showGhost: true
      },
      events: {
        move: handleMove
      }
      
    }
  }
/>
  );
}

export default App;
