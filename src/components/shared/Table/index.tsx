import styles from "./table.module.scss";

import card from "src/assets/cards/ace/3_ace.svg";

const Table = () => {
   return (
      <div className={`${styles.wrapper} ${styles.drop}`}>
         <img src={card} />
         <img src={card} />
         <img src={card} />
         <img src={card} />
         <img src={card} />
         <img src={card} />
      </div>
   );
};

export default Table;
