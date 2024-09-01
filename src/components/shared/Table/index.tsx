import Card from "src/components/ui/Card";
import styles from "./table.module.scss";
import { Slot as SlotI, useGame } from "src/contexts/GameContext";
import { useDroppable } from "@dnd-kit/core";
import { forwardRef, useRef } from "react";
import { clearTableAnimated } from "src/utils";
import useAnimateElement from "src/hooks/useAnimateElement";

interface SlotProps {
   slot: SlotI;
   cardRefs: React.MutableRefObject<{
      [id: string]: HTMLElement;
   }>;
}

const Slot = forwardRef<HTMLDivElement, SlotProps>(
   ({ slot, cardRefs }, ref) => {
      const { isOver, setNodeRef } = useDroppable({
         id: `slot-${slot.id}`,
         disabled: !slot.cards.length,
      });
      const isDropping = isOver && !!slot.cards.length;

      return (
         <div
            className={`${styles.slot} ${isDropping ? styles.drop : ""}`}
            key={slot.id}
            ref={(node) => {
               setNodeRef(node);
               if (typeof ref === "function") ref(node);
               else if (ref) ref.current = node;
            }}
         >
            {slot.cards.map((card) => (
               <Card
                  key={card.id}
                  {...card}
                  ref={(node: HTMLDivElement | null) => {
                     if (node) {
                        cardRefs.current[card.id!] = node;
                     }
                  }}
                  randomRotate
               />
            ))}
         </div>
      );
   }
);

const Table = () => {
   const { slots, clearTable, addCardToHand } = useGame();
   const { isOver, setNodeRef } = useDroppable({ id: "table" });
   const cardRefs = useRef<{
      [id: string]: HTMLElement;
   }>({});
   const animate = useAnimateElement();

   const handleClearTable = () => {
      // clearTableAnimated(cardRefs, clearTable);
      slots.forEach((slot) => {
         slot.cards.forEach((card) => {
            addCardToHand(card);
         });
      });

      Object.values(cardRefs.current).forEach((element) => {
         animate(element, {
            fromElement: element,
            toElement: "playercards",
            animationOptions: {
               animationDuration: 400,
               onFinish: () => {
                  clearTable();
               },
            },
         });
      });
      cardRefs.current = {};
   };

   return (
      <div
         className={`${styles.wrapper} ${isOver ? styles.drop : ""}`}
         ref={setNodeRef}
         onClick={handleClearTable}
      >
         {slots.map((slot) => (
            <Slot key={slot.id} slot={slot} cardRefs={cardRefs} ref={null} />
         ))}
      </div>
   );
};

export default Table;
