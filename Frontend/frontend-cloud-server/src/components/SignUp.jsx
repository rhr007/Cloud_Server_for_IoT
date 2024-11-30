import React, { useState } from 'react'
import styles from '../components/SignUp.module.css'
import axios from 'axios'
import Navbar from './Navbar';
const SignUp = () => {
  const serverURL = "http://192.168.1.104:8000/registration";
  
  const [firstName, setFirstName] = useState('')
  const [lasttName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [insttitution, setInstitution] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function createAccount(e){
    e.preventDefault();
    if(password != confirmPassword){
      alert("Password did not match.")
    }

    else{
      const userData = {
        first_name: firstName,
        last_name: lasttName,
        email: email,
        institution: insttitution,
        password: password,
        ac_created: 2024
      }

      axios.post(serverURL, userData).then(response => {
        if(response.status == 201){
          location.reload()
          alert("Account Registration Successful")
          window.location.href="signin"

        }
      }).catch(error => {
        if(error.status == 400)
        {
          alert("This email is already Registered.")
          
        }
      })

    //   console.log(JSON.stringify(userData));
    //   fetch ("http://192.168.1.104:8000/registration", {
    //     method: "POST",
    //         body: JSON.stringify(userData),
    //         headers: {
    //             "Content-Type": "application/json",
    //           },
    // }).then(res => res.json().then(data => console.log(data)))


    }
  }

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>

          <h2 className={styles.headline}>Register Your Account</h2>

          <form className={styles.inputs} onSubmit={createAccount}>
              <input type="text" placeholder='First Name' required onChange={(e) => setFirstName(e.target.value)}/>
              <input type="text" placeholder='Last Name' required onChange={(e) => setLastName(e.target.value)}/>
              <input type="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)}/>
              <input type="text" placeholder='Institution' required onChange={(e) => setInstitution(e.target.value)}/>
              <input type="password" placeholder='Password' required minLength={8} maxLength={32} onChange={(e) => setPassword(e.target.value)}/>
              <input type="password" placeholder='Comfirm Password' minLength={8} maxLength={32}required onChange={(e) => setConfirmPassword(e.target.value)}/>
              <input type='submit' className={styles.submitButton} value='Sign Up'/>
          </form>
          
      </div>
    </>
  );
}

export default SignUp;