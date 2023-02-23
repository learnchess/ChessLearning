import Chessground from '@react-chess/chessground'
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

const SetupPractice = () => {

    return (
        <Chessground 
            width={600}
            height={600}
        />
    )
}

export default SetupPractice