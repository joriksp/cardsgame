import styles from "./playercards.module.scss";
import { useGame } from "src/contexts/GameContext";
import Card from "src/components/ui/Card";
import { CSSProperties } from "react";

const PlayerCards = () => {
   const { hand } = useGame();

   let gap = 154;
   const length = hand.length;

   if (length >= 30) gap = 154;
   else if (length >= 20) gap = 152;
   else if (length >= 15) gap = 148;
   else if (length >= 10) gap = 141;
   else if (length >= 8) gap = 135;
   else if (length >= 5) gap = 122;
   else if (length >= 3) gap = 90;
   else if (length >= 2) gap = 40;

   return (
      <div
         className={styles.root}
         style={
            {
               "--gap": -gap + "px",
            } as CSSProperties
         }
      >
         {hand.map((card) => (
            <Card draggable {...card} key={card.id} />
         ))}
      </div>
   );
};

export default PlayerCards;
