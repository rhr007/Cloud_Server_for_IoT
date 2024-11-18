import React from 'react'
import styles from '../components/Footer.module.css'
const Footer = () => {
    const date = new Date();
  return (
    <div className={styles.mainContainer}>
        <hr></hr>
        <p>&copy;{date.getFullYear()}. Copyrights are reserved by <a href='https://bdu.ac.bd/' className={styles.bduLink} target='_blank'>BDU</a></p>
    </div>
  );
}

export default Footer;