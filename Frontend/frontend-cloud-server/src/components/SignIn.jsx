import React from 'react'
import styles from '../components/SignIn.module.css'
const SignIn = () => {
  return (
    <div className={styles.mainContainer}>
      <h2>Sign In To Your Account</h2>
      <form action="" className={styles.inputs}>
        <input type="email" required placeholder='Email'/>
        <input type="password" required placeholder='Password'/>
        <input type="submit" value='Sign In' className={styles.submitButton}/>
        <p>Forgot Password?</p>
      </form>
    </div>
  );
}

export default SignIn;