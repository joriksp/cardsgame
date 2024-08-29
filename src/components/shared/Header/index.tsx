import styles from "./header.module.scss";

interface HeaderProps {
   title: string;
}

const Header = ({ title }: HeaderProps) => {
   return (
      <header className={styles.header}>
         <h1>{title}</h1>
      </header>
   );
};

export default Header;
