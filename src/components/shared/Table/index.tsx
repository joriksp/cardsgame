import Card from "src/components/ui/Card";
import styles from "./table.module.scss";
import { useGame } from "src/contexts/GameContext";
import { useDroppable } from "@dnd-kit/core";
import { useRef } from "react";
import { clearTableAnimated } from "src/utils";

const Table = () => {
   const { slots, clearTable } = useGame();
   const { isOver, setNodeRef } = useDroppable({ id: "table" });
   const cardRefs = useRef<{
      [id: string]: HTMLElement;
   }>({});

   const handleClearTable = () => {
      clearTableAnimated(cardRefs, clearTable);
   };

   return (
      <div
         className={`${styles.wrapper} ${isOver ? styles.drop : ""}`}
         ref={setNodeRef}
         onClick={handleClearTable}
      >
         {slots.map((slot) => (
            <div className={styles.slot} key={slot.id}>
               {slot.cards.map((card) => (
                  <Card
                     key={card.id}
                     {...card}
                     ref={(ref: HTMLElement | null) => {
                        if (ref) {
                           cardRefs.current[card.id] = ref;
                        }
                     }}
                     randomRotate
                  />
               ))}
            </div>
         ))}
      </div>
   );
};

export default Table;
