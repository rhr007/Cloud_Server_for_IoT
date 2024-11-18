import React, { useState } from 'react'
import styles from '../components/SignIn.module.css'
const SignIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function loginAccount(e){
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }
    console.log(userData);
  }


  return (
    <div className={styles.mainContainer}>
      <h2>Sign In To Your Account</h2>
      <form action="" className={styles.inputs} onSubmit={loginAccount}>
        <input type="email" required placeholder='Email'onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" required placeholder='Password'onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" value='Sign In' className={styles.submitButton}/>
        <p>Forgot Password?</p>
      </form>
    </div>
  );
}

export default SignIn;