import { forwardRef, memo, useEffect, useState } from "react";
import { CardI } from "src/types";
import styles from "./card.module.scss";
import { useDraggable } from "@dnd-kit/core";

interface CardProps extends CardI {
   randomRotate?: boolean;
   draggable?: boolean;
   className?: string;
   elementId?: string;
}

const DraggableCard = forwardRef(
   (
      {
         elementId,
         suit,
         rank,
         randomRotate,
         draggable = true,
         id,
         className = "",
      }: CardProps,
      ref
   ) => {
      const [rotate, setRotate] = useState(0);
      const [src, setSrc] = useState("");
      const [isLoading, setIsLoading] = useState(true);

      if (!id) id = Math.floor(Math.random() * 360);

      useEffect(() => {
         const loadCardImage = async () => {
            try {
               const object = await import(
                  `../../../../src/assets/cards/${suit}/${rank}.svg`
               );
               setSrc(object.default);
            } catch (error) {
               console.error(error);
            } finally {
               setIsLoading(false);
            }
         };
         loadCardImage();
      }, [rank, suit]);

      const { attributes, listeners, setNodeRef, transform, isDragging } =
         useDraggable({
            id,
            data: { suit, rank, id },
            disabled: !draggable,
         });

      useEffect(() => {
         if (randomRotate) {
            const randomDeg = Math.floor(Math.random() * 12) - 6;
            setRotate(randomDeg);
         }
      }, [randomRotate]);

      return (
         <img
            id={elementId}
            ref={(node) => {
               setNodeRef(node);
               if (ref) {
                  typeof ref === "function" ? ref(node) : (ref.current = node);
               }
            }}
            {...listeners}
            {...attributes}
            className={`${styles.card} ${isDragging && styles.dragging} ${
               draggable && styles.draggable
            } ${className} ${isLoading ? styles.loader : ""}`}
            style={{
               transform: transform
                  ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                  : undefined,
               rotate: `${rotate}deg`,
            }}
            src={src}
         />
      );
   }
);

export default memo(DraggableCard);
