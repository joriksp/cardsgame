import { createElement, CSSProperties, RefObject } from "react";
import back_ic from "src/assets/cards/backs/red.svg";

export const varibleGap = (
   gapSizes: number[],
   gapValues: number[],
   cardsCount: number
) => {
   let gap = gapValues[0];

   for (let i = 0; i < gapSizes.length; i++) {
      if (cardsCount > gapSizes[i]) {
         gap = gapValues[i + 1];
      }
   }

   return gap;
};

export const moveCardFromDeck = (
   targetRef: RefObject<any> | string,
   deckRef: RefObject<any> | string,
   animationDuration: number = 1000
) => {
   const getDOMElement = (ref: RefObject<any> | string) => {
      return typeof ref === "string"
         ? document.getElementById(ref)
         : ref.current;
   };

   const getAbsolutePosition = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      return {
         x: rect.left + window.scrollX,
         y: rect.top + window.scrollY,
         width: rect.width,
         height: rect.height,
      };
   };

   const deckElement = getDOMElement(deckRef);
   if (!deckElement) throw new Error("Deck element not found");
   const deckRect = getAbsolutePosition(deckElement);

   const targetElement = getDOMElement(targetRef);
   if (!targetElement) throw new Error("Target element not found");
   const targetRect = getAbsolutePosition(targetElement);

   const cardWidth = deckElement.offsetWidth;
   const cardHeight = deckElement.offsetHeight;

   const targetWidth = targetElement.offsetWidth;
   const targetHeight = targetElement.offsetHeight;

   const startX = deckRect.x + deckRect.width / 2 - cardWidth / 2;
   const startY = deckRect.y + deckRect.height / 2 - cardHeight / 2;
   const endX = targetRect.x + targetRect.width / 2 - targetWidth / 2;
   const endY = targetRect.y + targetRect.height / 2 - targetHeight / 2;

   // console.log(`start x: ${startX} y: ${startY}`);
   // console.log(`end x: ${endX} y: ${endY}`);

   const cardElement = element("img", {
      style: {
         position: "absolute",
         width: `${cardWidth}px`,
         height: `${cardHeight}px`,
         transition: `opacity .3s ease-out`,
      },
      src: back_ic,
   });

   // const cardElement = document.createElement("img");
   // cardElement.style.position = "absolute";
   // cardElement.style.width = `${cardWidth}px`;
   // cardElement.style.height = `${cardHeight}px`;
   // cardElement.style.transition = `opacity .3s ease-out`;
   // cardElement.src = back_ic;
   document.body.appendChild(cardElement);

   let startTime = 0;

   const animate = (timestamp: number) => {
      if (!startTime) {
         startTime = timestamp;
      }

      let progress = (timestamp - startTime) / animationDuration;

      if (progress > 1) {
         progress = 1;
      }

      const x = startX + (endX - startX) * progress;
      const y = startY + (endY - startY) * progress;
      // const width = cardWidth + (targetWidth - cardWidth) * progress;
      const height = cardHeight + (targetHeight - cardHeight) * progress;

      cardElement.style.left = `${x}px`;
      cardElement.style.top = `${y}px`;
      // cardElement.style.width = `${width}px`;
      cardElement.style.height = `${height}px`;

      if (progress > 0.8) {
         cardElement.style.opacity = "0";
      }

      if (progress < 1) {
         requestAnimationFrame(animate);
      } else {
         setTimeout(() => {
            cardElement.remove();
         }, 500);
      }
   };

   requestAnimationFrame(animate);
};

export const clearTableAnimated = (
   cardRefs: React.MutableRefObject<{
      [id: string]: HTMLElement;
   }>,
   callback?: () => void
) => {
   Object.values(cardRefs.current).forEach((element) => {
      const cardElement = element;
      const x = window.innerWidth + 100;
      if (!cardElement) throw new Error("Card element doesn't exist");

      cardElement.style.transform = `translateX(${x}px)`;

      setTimeout(() => {
         callback && callback();
      }, 500);
   });
   cardRefs.current = {};
};

export const element = (
   type: string,
   props?: {
      style?: CSSProperties;
      src?: string;
   }
) => {
   const element = document.createElement(type);

   if (props) {
      Object.assign(element.style, props.style);
      if (element instanceof HTMLImageElement && props.src) {
         element.src = props.src;
      }
   }

   return element;
};
