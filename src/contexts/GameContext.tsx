import {
   useState,
   ReactNode,
   useContext,
   createContext,
   useCallback,
   useEffect,
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
   addCardToHand: (card: CardI) => void;
   addCardToSlot: (card: CardI, slotID: number) => void;
   removeCardFromHand: (card_id: number) => void;
}

const initialValue = {
   slots: [
      { id: 0, cards: [] },
      { id: 1, cards: [] },
      { id: 2, cards: [] },
      { id: 3, cards: [] },
      { id: 4, cards: [] },
      { id: 5, cards: [] },
   ],
   hand: Array(20)
      .fill(null)
      .map((_, index) => ({
         suit: Object.values(Suits)[Math.floor(Math.random() * 4)],
         rank: Object.values(Ranks)[Math.floor(Math.random() * 13)],
         id: index + 1,
      })),
   clearTable: () => {},
   addCardToHand: () => {},
   addCardToSlot: () => {},
   removeCardFromHand: () => {},
};

const GameContext = createContext<GameContext>(initialValue);

export const GameProvider = ({ children }: { children: ReactNode }) => {
   const [slots, setSlots] = useState<Slot[]>(initialValue.slots);
   const [hand, setHand] = useState<CardI[]>(initialValue.hand);

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

   const a = useEffect(() => {});
   console.table(a);

   const addCardToHand = useCallback(
      (card: CardI) => {
         setHand((prevHand) => [...prevHand, card]);
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
         {children}
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
