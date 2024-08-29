import styles from "./playercards.module.scss";
import { useGame } from "src/contexts/GameContext";
import Card from "src/components/ui/Card";

const PlayerCards = () => {
   const { hand } = useGame();

   return (
      <div className={styles.root}>
         {hand.map((card) => (
            <Card draggable {...card} key={card.id} />
         ))}
      </div>
   );
};

export default PlayerCards;
