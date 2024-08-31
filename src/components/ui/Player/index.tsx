import { CSSProperties, memo } from "react";
import styles from "./player.module.scss";

interface PlayerProps {
   name?: string;
   avatar?: string;
   cardsCount: number;
}

import red_back from "src/assets/cards/backs/red.svg";
import Avatar from "../Avatar";
import { varibleGap } from "src/utils";

const Player = ({ name, avatar, cardsCount }: PlayerProps) => {
   const gap = varibleGap(
      [5, 7, 10, 15, 19],
      [18, 20, 26, 27, 29, 34],
      cardsCount
   );

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

         <div className={styles.cards} id={`cards-${name}`}>
            {Array.from({ length: cardsCount }).map((_, index) => (
               <img key={index} src={red_back} className={styles.card} />
            ))}
         </div>
      </div>
   );
};

export default memo(Player);
