import Player from "../../ui/Player";
import PlayerCards from "../PlayerCards";
import Table from "../Table";
import styles from "./gamefield.module.scss";

const GameField = () => {
   return (
      <div className={styles.field}>
         <div className={styles.players}>
            <Player name="Player 1" cardsCount={25} />
            <Player name="Player 2" cardsCount={10} />
            <Player name="Player 2" cardsCount={5} />
         </div>

         <Table />

         <PlayerCards />
      </div>
   );
};

export default GameField;
