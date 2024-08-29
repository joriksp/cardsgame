import { Card as CardProps } from "src/types";
import styles from "./card.module.scss";
import { suits } from "src/icons";

const Card = ({ suit, rank }: CardProps) => {
   return (
      <div className={styles.card}>
         <div className={styles.corner}>
            <p>{rank}</p>
            {suits[suit]}
         </div>

         {suits[suit]}

         <div className={styles.corner + " " + styles.bottomRight}>
            <p>{rank}</p>
            {suits[suit]}
         </div>
      </div>
   );
};

export default Card;
