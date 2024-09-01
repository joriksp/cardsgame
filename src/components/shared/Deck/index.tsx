import { CardI } from "src/types";
import styles from "./deck.module.scss";
import Card from "src/components/ui/Card";

import back from "src/assets/cards/backs/red.svg";
import animationService from "src/contexts/AnimationContext";

interface DeckProps {
   trumpCard?: CardI;
}

const Deck = ({ trumpCard }: DeckProps) => {
   return (
      <>
         <div className={styles.deck_wrapper}>
            <img
               id="deck"
               className={styles.stack}
               src={back}
               ref={(node) => {
                  if (node) {
                     animationService.deckRef.current = node;
                  }
               }}
            ></img>
            {trumpCard && <Card {...trumpCard} className={styles.trump} />}
         </div>
      </>
   );
};

export default Deck;
