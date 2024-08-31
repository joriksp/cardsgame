import { Ranks, Suits } from "src/types";
import Player from "../../ui/Player";
import Deck from "../Deck";
import PlayerCards from "../PlayerCards";
import Table from "../Table";
import styles from "./gamefield.module.scss";

const GameField = () => {
   return (
      <div className={styles.field}>
         <div className={styles.players}>
            <Player name="Player 1" cardsCount={14} />
            <Player name="Player 2" cardsCount={10} />
            <Player name="Player 3" cardsCount={5} />
         </div>

         <Table />
         <Deck
            trumpCard={{
               id: 1,
               suit: Suits.Club,
               rank: Ranks.Eight,
            }}
         />

         <PlayerCards />
      </div>
   );
};

export default GameField;
