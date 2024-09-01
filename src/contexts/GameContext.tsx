import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
   useState,
   ReactNode,
   useContext,
   createContext,
   useCallback,
} from "react";
import { CardI, Ranks, Suits } from "src/types";

/**
 * Slot interface
 *
 * @interface Slot
 * @property {number} id - The id of the slot
 * @property {CardI[]} cards - An array of card objects
 */
export interface Slot {
   id: number;
   cards: CardI[];
}

/**
 * GameContext interface
 *
 * @property {Slot[]} slots - Список из слотов (по умолчанию 6 слотов)
 * @property {CardI[]} hand - Список карт, находящихся у игрока в руке
 * @property {function} addCardToHand - Добавляет карту в руку игрока
 * @property {function} removeCardFromHand - Удаляет карту из рук игрока
 * @property {function} clearTable - Функция, очищающая карты на столе (без анимации, используйте `utils/clearTableAnimated()` для анимации)
 * @property {function} addCardToSlot - Добавляет карту в определенный слот по `id` на столе
 */
interface GameContext {
   slots: Slot[];
   hand: CardI[];
   clearTable: () => void;
   addCardToHand: (card: CardI | CardI[]) => void;
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
   hand: Array(6)
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

/**
 * GameProvider component
 *
 * @param {object} props - The props object
 * @param {ReactNode} props.children - The children of the component
 * @returns {JSX.Element} The GameProvider component
 */
export const GameProvider = ({ children }: { children: ReactNode }) => {
   const [slots, setSlots] = useState<Slot[]>(initialValue.slots);
   const [hand, setHand] = useState<CardI[]>(initialValue.hand);

   /**
    * addCardToSlot function
    *
    * Добавляет карту `card` в слот на столе с `slotId`.
    *
    * @param {CardI} card - Объект карты
    * @param {number} slotID - ID слота
    * @returns {void}
    */
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

   /**
    * addCardToHand function
    *
    * Добавляет карту в руку игрока
    *
    * @param {CardI} card - Карта
    * @returns {void}
    */
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

   /**
    * removeCardFromHand function
    *
    * Удаляет карту из рук игрока по её `id`
    *
    * @param {number} card_id - `id` карты
    * @returns {void}
    */
   const removeCardFromHand = useCallback(
      (card_id: number) => {
         setHand((prev) => prev.filter(({ id }) => card_id !== id));
      },
      [setHand]
   );

   /**
    * clearTable function
    *
    * Очищает стол от карт (**без анимации**)
    *
    * @returns {void}
    */
   const clearTable = useCallback(() => {
      setSlots((prev) => prev.map((slot) => ({ ...slot, cards: [] })));
   }, [setSlots]);

   // Callbacks

   const onDroppedToDropZone = (droppedCard: CardI) => {
      // Рандомная позиция как пример
      const random = Math.floor(Math.random() * 6);
      console.log(
         `Карта "${droppedCard.rank} ${droppedCard.suit}" дропнута в зоне и попала на слот ${random}`
      );

      addCardToSlot(droppedCard, random);
   };

   const onDroppedToTableSlot = (droppedCard: CardI, slotId: number) => {
      console.log(
         `Карта "${droppedCard.rank} ${droppedCard.suit}" дропнута на слот ${slotId}`
      );
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

/**
 * useGame hook
 *
 * @returns {GameContext} The GameContext object
 */
export const useGame = () => {
   const context = useContext(GameContext);

   if (!context) {
      throw new Error("useGame must be used with GameProvider");
   }

   return context;
};
