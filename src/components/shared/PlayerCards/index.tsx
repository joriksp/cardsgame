import { Card as CardType } from "src/types";
import styles from "./playercards.module.scss";
import Card from "src/components/ui/Card";

interface PlayerCardsProps {
   cards: CardType[];
}

const PlayerCards = ({ cards }: PlayerCardsProps) => {
   return (
      <div className={styles.root}>
         {cards.map((card) => (
            <Card {...card} />
         ))}
      </div>
   );
};

export default PlayerCards;
