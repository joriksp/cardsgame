import { forwardRef, memo, useEffect, useState } from "react";
import { CardI } from "src/types";
import styles from "./card.module.scss";

interface CardProps extends CardI {
   randomRotate?: boolean;
   className?: string;
}

const Card = forwardRef(
   ({ suit, rank, randomRotate, className = "" }: CardProps, ref) => {
      const [rotate, setRotate] = useState(0);
      const [src, setSrc] = useState("");
      const [isLoading, setIsLoading] = useState(true);

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

      useEffect(() => {
         loadCardImage();
      }, [rank, suit]);

      useEffect(() => {
         if (randomRotate) {
            const randomDeg = Math.floor(Math.random() * 12) - 6;
            setRotate(randomDeg);
         }
      }, [randomRotate]);

      return (
         <>
            <img
               ref={(node) => {
                  if (ref) {
                     typeof ref === "function"
                        ? ref(node)
                        : (ref.current = node);
                  }
               }}
               style={{
                  rotate: `${rotate}deg`,
               }}
               className={`${styles.card} ${className} ${
                  isLoading ? styles.loader : ""
               }`}
               src={src}
            />
         </>
      );
   }
);

export default memo(Card);
