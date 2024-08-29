import { CSSProperties, memo } from "react";
import styles from "./player.module.scss";

interface PlayerProps {
   name?: string;
   avatar?: string;
   cardsCount: number;
}

import red_back from "src/assets/cards/backs/red.svg";
import Avatar from "../Avatar";

const Player = ({ name, avatar, cardsCount }: PlayerProps) => {
   const gapSizes = [5, 7, 10, 15, 19];
   const gapValues = [10, 14, 22, 25, 26, 28];

   let gap = gapValues[0];

   for (let i = 0; i < gapSizes.length; i++) {
      if (cardsCount > gapSizes[i]) {
         gap = gapValues[i + 1];
      }
   }

   return (
      <div
         className={styles.player}
         style={
            {
               "--gap": -gap + "px",
            } as CSSProperties
         }
      >
         <Avatar src={avatar} name={name} />

         <div className={styles.cards}>
            {Array.from({ length: cardsCount }).map((_, index) => (
               <img key={index} src={red_back} className={styles.card} />
            ))}
         </div>
      </div>
   );
};

export default memo(Player);
