import animationService from "src/contexts/animationService";
import { useTransition, animated } from "react-spring";
import { useCallback } from "react";
import styles from "./deck.module.scss";

import { CardI } from "src/types";
import back from "src/assets/cards/backs/red.svg";
import Card from "src/components/ui/Card";

interface DeckProps {
   trumpCard?: CardI;
   isVisible?: boolean;
}

const Deck = ({ trumpCard, isVisible = true }: DeckProps) => {
   const transitions = useTransition(isVisible, {
      from: { opacity: 0, transform: "translateX(-30px)" },
      enter: { opacity: 1, transform: "translateX(0)" },
      leave: { opacity: 0, transform: "translateX(-30px)" },
      config: { tension: 300 },
   });

   const setDeckRef = useCallback((node: HTMLImageElement | null) => {
      if (node) {
         animationService.deckRef.current = node;
      }
   }, []);

   return transitions(
      (style, item) =>
         item && (
            <animated.div className={styles.deck_wrapper} style={style}>
               <img
                  id="deck"
                  className={styles.stack}
                  src={back}
                  ref={setDeckRef}
               ></img>
               {trumpCard && <Card {...trumpCard} className={styles.trump} />}
            </animated.div>
         )
   );
};

export default Deck;
