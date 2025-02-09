import animationService from "src/contexts/animationService";
import { useGame } from "src/contexts/GameContext";
import useAnimateElement, {
   animateElements,
} from "src/hooks/useAnimateElement";
import { Ranks, Suits } from "src/types";
import { clearTableAnimated, moveCardFromDeck } from "src/utils";

const Test = () => {
   const { clearTable, slots, addCardToHand } = useGame();
   const animate = useAnimateElement();

   const { tableCardsRef } = animationService;

   return (
      <div
         style={{
            position: "fixed",
            left: "0",
            top: "0",
            zIndex: 2300,
            background: "white",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
         }}
      >
         <button
            onClick={() => {
               clearTableAnimated(tableCardsRef, () => {
                  clearTable();
               });
            }}
         >
            Смахнуть карты со стола
         </button>
         <button
            onClick={() => {
               animateElements(
                  tableCardsRef.current,
                  {
                     toElement: "playercards",
                     animationOptions: {
                        animationDuration: 500,
                     },
                  },
                  animate
               ).then(() => {
                  slots.forEach((slot) => {
                     addCardToHand(slot.cards);
                  });
                  clearTable();
                  tableCardsRef.current = {};
               });
            }}
         >
            Смахнуть карты игроку
         </button>
         <button
            onClick={() => {
               moveCardFromDeck(
                  "cards-Player 2",
                  animationService.deckRef,
                  400
               );
            }}
         >
            Анимация карты из колоды
         </button>
         <button
            onClick={() => {
               addCardToHand({
                  suit: Object.values(Suits)[Math.floor(Math.random() * 4)],
                  rank: Object.values(Ranks)[Math.floor(Math.random() * 13)],
                  id: Math.floor(Math.random() * 1000),
               });
            }}
         >
            Карта в руку
         </button>
      </div>
   );
};

export default Test;
