import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/admin">Minh</NavLink>
      </div>
      <div className={styles.menu}>
        <ul className={styles.nav}>
          <li className={styles.nav__item}>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink to="/about">About</NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
