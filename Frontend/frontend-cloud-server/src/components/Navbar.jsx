import React from 'react'
import styles from '../components/Navbar.module.css'
import { Link, NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <img src="https://placehold.co/150x50" alt="img" className={styles.logo}/>
            <p className={styles.webName}>BDU Cloud Server</p>
        </div>

        <div className={styles.listContainer}>
            <ul className={styles.navlist}>
                <NavLink to='/home'><li>Home</li></NavLink>
                <NavLink to='/feature'><li>Feature</li></NavLink>
                <NavLink to='/contact'><li>Contact</li></NavLink>
                <NavLink to='/about'><li>About</li></NavLink>
            </ul>
        </div>

        <div className={styles.buttons}>
            <li className={styles.buttonList}>
                <NavLink to='/signin'><button className={styles.signin}>Sign In</button></NavLink>
                <NavLink to='/signup'><button className={styles.signup}>Sign Up</button></NavLink>
            </li>
        </div>

    </div>
  );
}

export default Navbar;