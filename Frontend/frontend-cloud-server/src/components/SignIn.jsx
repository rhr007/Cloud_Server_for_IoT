import React, { useState } from 'react'
import styles from '../components/SignIn.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const SignIn = () => {
  const serverURL = "http://192.168.1.104:8000/signin";
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function loginAccount(e){
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }
    // console.log(userData);
    axios.post(serverURL, userData, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => {
      if(res.status == 200){
        console.log(res.data);

      }
    }).catch(error => {
      if(error.status == 401)
      {
        alert("Wrong Email or Password.")
      }
      if(error.status == 403){
        alert("Your Account is not Active");
        sessionStorage.setItem("email", email)
        navigate('/activate')
      }
    })
  }


  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <h2>Sign In To Your Account</h2>
        <form action="" className={styles.inputs} onSubmit={loginAccount}>
          <input type="email" required placeholder='Email'onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" required placeholder='Password'onChange={(e) => setPassword(e.target.value)}/>
          <input type="submit" value='Sign In' className={styles.submitButton}/>
          <p>Forgot Password?</p>
        </form>
      </div>
    </>
  );
}

export default SignIn;