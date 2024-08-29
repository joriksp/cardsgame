import { memo, useEffect, useState } from "react";
import { CardI } from "src/types";

import styles from "./card.module.scss";
import { useDraggable } from "@dnd-kit/core";

interface CardProps extends CardI {
   randomRotate?: boolean;
   draggable?: boolean;
}

const Card = ({ suit, rank, randomRotate, draggable, id }: CardProps) => {
   const [rotate, setRotate] = useState(0);
   const [src, setSrc] = useState("");

   useEffect(() => {
      import(`../../../../src/assets/cards/${suit}/${rank}.svg`).then(
         (object) => {
            console.log(object.default);
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
   const style = transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "";

   useEffect(() => {
      if (randomRotate) {
         setRotate(Math.floor(Math.random() * 5) - 2.5);
      }
   }, [randomRotate]);

   return (
      <img
         ref={setNodeRef}
         {...listeners}
         {...attributes}
         className={`${styles.card} ${isDragging ? styles.drag : ""}`}
         style={{
            transform: `rotate(${rotate}deg) ${style}`,
         }}
         src={src}
      />
   );
};

export default Card;
