import Card from "src/components/ui/Card";
import styles from "./table.module.scss";
import { Slot as SlotI, useGame } from "src/contexts/GameContext";
import { useDroppable } from "@dnd-kit/core";

import Test from "../Test";
import animationService from "src/contexts/animationService";

interface SlotProps {
   slot: SlotI;
}

const Slot = ({ slot }: SlotProps) => {
   const { isOver, setNodeRef } = useDroppable({
      id: `slot-${slot.id}`,
      disabled: !slot.cards.length,
   });
   const isDropping = isOver && slot.cards.length;

   return (
      <div
         className={`${styles.slot} ${isDropping ? styles.drop : ""}`}
         key={slot.id}
         ref={(node) => {
            setNodeRef(node);
         }}
      >
         {slot.cards.map((card) => (
            <Card
               key={card.id}
               {...card}
               ref={(node: HTMLDivElement | null) => {
                  if (node && card.id) {
                     animationService.tableCardsRef.current[card.id] = node;
                  }
               }}
               randomRotate
            />
         ))}
      </div>
   );
};

const Table = () => {
   const { slots } = useGame();
   const { isOver, setNodeRef } = useDroppable({ id: "table" });

   return (
      <div
         className={`${styles.wrapper} ${isOver ? styles.drop : ""}`}
         ref={setNodeRef}
      >
         <Test />
         {slots.map((slot) => (
            <Slot key={slot.id} slot={slot} />
         ))}
      </div>
   );
};

export default Table;
