import { forwardRef, memo, useEffect, useState } from "react";
import { CardI } from "src/types";

import styles from "./card.module.scss";
import { useDraggable } from "@dnd-kit/core";

interface CardProps extends CardI {
   randomRotate?: boolean;
   draggable?: boolean;
   className?: string;
}

const Card = forwardRef(
   ({ suit, rank, randomRotate, draggable, id, className }: CardProps, ref) => {
      const [rotate, setRotate] = useState(0);
      const [src, setSrc] = useState("");

      useEffect(() => {
         import(`../../../../src/assets/cards/${suit}/${rank}.svg`).then(
            (object) => {
               setSrc(object.default);
            }
         );
      }, [rank, suit]);

      const { attributes, listeners, setNodeRef, transform, isDragging } =
         useDraggable({
            id: id,
            data: { suit, rank, id },
            disabled: !draggable,
         });
      const transformStyle = transform
         ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
         : "";

      useEffect(() => {
         if (randomRotate) {
            setRotate(Math.floor(Math.random() * 12) - 6);
         }
      }, [randomRotate]);

      return (
         <img
            ref={(node) => {
               setNodeRef(node);
               if (ref) {
                  if (typeof ref === "function") {
                     ref(node);
                  } else {
                     ref.current = node;
                  }
               }
            }}
            {...listeners}
            {...attributes}
            className={`${styles.card} ${isDragging ? styles.drag : ""} ${
               className ? className : ""
            }`}
            style={{
               transform: transformStyle,
               rotate: `${rotate}deg`,
            }}
            src={src}
         />
      );
   }
);

export default memo(Card);
