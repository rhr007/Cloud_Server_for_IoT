import React, { useState } from 'react'
import styles from '../components/SignUp.module.css'
const SignUp = () => {

  const [firstName, setFirstName] = useState('')
  const [lasttName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [insttitution, setInstitution] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className={styles.mainContainer}>

        <h2 className={styles.headline}>Register Your Account</h2>

        <form className={styles.inputs}>
            <input type="text" placeholder='First Name' required onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" placeholder='Last Name' required onChange={(e) => setLastName(e.target.value)}/>
            <input type="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder='Institution' required onChange={(e) => setInstitution(e.target.value)}/>
            <input type="password" placeholder='Password' required minLength={8} maxLength={32} onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" placeholder='Comfirm Password' minLength={8} maxLength={32}required onChange={(e) => setConfirmPassword(e.target.value)}/>
            <input type='submit' className={styles.submitButton} value='Sign Up'/>
        </form>
        
    </div>
  );
}

export default SignUp;