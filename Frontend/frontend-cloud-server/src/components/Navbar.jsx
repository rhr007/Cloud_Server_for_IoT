import React from 'react'
import styles from '../components/Navbar.module.css'
const Navbar = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <img src="https://placehold.co/150x50" alt="img" className={styles.logo}/>
            <p className={styles.webName}>BDU Cloud Server</p>
        </div>

        <div className={styles.listContainer}>
            <ul className={styles.navlist}>
                <li>Home</li>
                <li>Feature</li>
                <li>Contact</li>
                <li>About</li>
            </ul>
        </div>

        <div className={styles.buttons}>
            <li className={styles.buttonList}>
                <button className={styles.signin}>Sign In</button>
                <button className={styles.signup}>Sign Up</button>
            </li>
        </div>

    </div>
  );
}

export default Navbar;