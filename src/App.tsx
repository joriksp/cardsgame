import { DndContext, DragEndEvent } from "@dnd-kit/core";
import GameField from "./components/shared/GameField";
import Navbar from "./components/shared/Navbar";
import { useGame } from "./contexts/GameContext";
import { CardI } from "./types";

function App() {
   const { addCardToSlot, removeCardFromHand } = useGame();

   const handleDragEnd = (event: DragEndEvent) => {
      const data = event.active.data;

      if (event.over?.id === "table" && data.current) {
         addCardToSlot(data.current as CardI, Math.floor(Math.random() * 6));
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
