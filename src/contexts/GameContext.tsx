import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
   useState,
   ReactNode,
   useContext,
   createContext,
   useCallback,
} from "react";
import { CardI, Ranks, Suits } from "src/types";

export interface Slot {
   id: number;
   cards: CardI[];
}

interface GameContext {
   slots: Slot[];
   hand: CardI[];
   clearTable: () => void;
   addCardToHand: (card: CardI | CardI[]) => void;
   addCardToSlot: (card: CardI, slotID: number) => void;
   removeCardFromHand: (card_id: number) => void;
}

const getInitialValue = () => ({
   slots: Array(6)
      .fill(null)
      .map((_, index) => ({ id: index, cards: [] })),
   hand: Array(6)
      .fill(null)
      .map((_, index) => ({
         suit: Object.values(Suits)[Math.floor(Math.random() * 4)],
         rank: Object.values(Ranks)[Math.floor(Math.random() * 13)],
         id: index + 1,
      })),
});

const GameContext = createContext<GameContext | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
   const [slots, setSlots] = useState<Slot[]>(getInitialValue().slots);
   const [hand, setHand] = useState<CardI[]>(getInitialValue().hand);

   const addCardToSlot = useCallback(
      (card: CardI, slotID: number) => {
         setSlots((prev) => {
            return prev.map((slot) => {
               if (slot.id === slotID) {
                  return { ...slot, cards: [...slot.cards, card] };
               }
               return slot;
            });
         });
      },
      [setSlots]
   );

   const addCardToHand = useCallback(
      (card: CardI | CardI[]) => {
         if (Array.isArray(card)) {
            setHand((prevHand) => [...prevHand, ...card]);
         } else {
            setHand((prevHand) => [...prevHand, card]);
         }
      },
      [setHand]
   );

   const removeCardFromHand = useCallback(
      (card_id: number) => {
         setHand((prev) => prev.filter(({ id }) => card_id !== id));
      },
      [setHand]
   );

   const clearTable = useCallback(() => {
      setSlots((prev) => prev.map((slot) => ({ ...slot, cards: [] })));
   }, [setSlots]);

   const onDroppedToDropZone = (card: CardI) => {
      const random = Math.floor(Math.random() * 6);
      console.log(
         `Карта "${card.rank} ${card.suit}" дропнута в зоне и попала на слот ${random}`
      );

      addCardToSlot(card, random);
   };

   const onDroppedToTableSlot = (card: CardI, slotId: number) => {
      console.log(
         `Карта "${card.rank} ${card.suit}" дропнута на слот ${slotId}`
      );
      addCardToSlot(card, slotId);
   };

   const handleDragEnd = (event: DragEndEvent) => {
      const { current } = event.active.data;

      if (event.over?.id === "table" && current) {
         onDroppedToDropZone(current as CardI);
         removeCardFromHand(current?.id as number);
      }

      if (String(event.over?.id).startsWith("slot")) {
         const id = Number(String(event.over?.id).split("-")[1]);
         onDroppedToTableSlot(current as CardI, id);
         removeCardFromHand(current?.id as number);
      }
   };

   return (
      <GameContext.Provider
         value={{
            slots,
            clearTable,
            addCardToHand,
            addCardToSlot,
            removeCardFromHand,
            hand,
         }}
      >
         <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>
      </GameContext.Provider>
   );
};

export const useGame = () => {
   const context = useContext(GameContext);

   if (!context) {
      throw new Error("useGame must be used with GameProvider");
   }

   return context;
};
