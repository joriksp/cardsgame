import Card from "src/components/ui/Card";
import styles from "./table.module.scss";
import { useGame } from "src/contexts/GameContext";
import { useDroppable } from "@dnd-kit/core";

const Table = () => {
   const { slots } = useGame();

   const { isOver, setNodeRef } = useDroppable({
      id: "gametable",
   });

   return (
      <div
         className={`${styles.wrapper} ${isOver ? styles.drop : ""}`}
         ref={setNodeRef}
      >
         {slots.map((slot) => (
            <div className={styles.slot} key={slot.id}>
               {slot.cards.map((card) => (
                  <Card key={card.id} {...card} randomRotate />
               ))}
            </div>
         ))}
      </div>
   );
};

export default Table;
