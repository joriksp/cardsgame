import { DndContext, DragEndEvent } from "@dnd-kit/core";
import GameField from "./components/shared/GameField";
import Navbar from "./components/shared/Navbar";
import { useGame } from "./contexts/GameContext";
import { CardI } from "./types";

function App() {
   const { addCardToSlot, removeCardFromHand } = useGame();

   const onDroppedToDropZone = (droppedCard: CardI) => {
      // random position as example
      const random = Math.floor(Math.random() * 6);

      addCardToSlot(droppedCard, random);
   };

   const onDroppedToTableSlot = (droppedCard: CardI, slotId: number) => {
      addCardToSlot(droppedCard, slotId);
   };

   const handleDragEnd = (event: DragEndEvent) => {
      const data = event.active.data;

      if (event.over?.id === "table" && data.current) {
         onDroppedToDropZone(data.current as CardI);
         removeCardFromHand(data.current?.id as number);
      }

      if (String(event.over?.id).startsWith("slot")) {
         const id = String(event.over?.id).split("-")[1];
         onDroppedToTableSlot(data.current as CardI, Number(id));
         removeCardFromHand(data.current?.id as number);
      }
   };

   return (
      <DndContext onDragEnd={handleDragEnd}>
         <div className="root">
            <GameField />
            <Navbar />
         </div>
      </DndContext>
   );
}

export default App;
