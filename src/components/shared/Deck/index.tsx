import { CardI } from "src/types";
import styles from "./deck.module.scss";
import Card from "src/components/ui/Card";

import back from "src/assets/cards/backs/red.svg";
import { useRef } from "react";
import { moveCardFromDeck } from "src/utils";

interface DeckProps {
   trumpCard?: CardI;
}

const Deck = ({ trumpCard }: DeckProps) => {
   const deckRef = useRef<HTMLImageElement>(null);

   const handleClick = () => {
      moveCardFromDeck("cards-Player 2", deckRef, 400);
   };

   return (
      <>
         <div onClick={handleClick} className={styles.deck_wrapper}>
            <img className={styles.stack} src={back} ref={deckRef}></img>
            {trumpCard && <Card {...trumpCard} className={styles.trump} />}
         </div>
      </>
   );
};

export default Deck;
