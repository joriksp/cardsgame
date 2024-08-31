import { memo } from "react";
import styles from "./avatar.module.scss";

interface AvatarProps {
   src?: string;
   name?: string;
}

const Avatar = ({ src, name }: AvatarProps) => {
   return (
      <div className={styles.avatar}>
         {src && <img src={src} className={styles.image} />}
         {name && <span className={styles.name}>{name}</span>}
      </div>
   );
};

export default memo(Avatar);
