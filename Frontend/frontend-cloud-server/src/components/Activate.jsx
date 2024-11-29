import React, { useState } from 'react'
import styles from '../components/Activate.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
const Activate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;
  const [OTP, setOTP] = useState('');

  function verifyEmail(e){
    e.preventDefault();

    const data = {
      email: email,
      otp: OTP
    }

    console.log(data);
  }

 

    return (
      <div className={styles.mainContainer}>
        <form onSubmit={verifyEmail} className={styles.inputs}>
          <h3>To activate your account, please verify your email address.</h3>
          <h5>Check your email, we sent an OTP. This is a one time verification.</h5>
          <input type="email" value={email} readOnly className={styles.email}/>
          <input type="number"  required placeholder='OTP'  onChange={(e) => setOTP(e.target.value)}/>
          <input type="submit" value='Verify OTP' className={styles.verifyButton}/>

        </form>
      </div>
    );

}

export default Activate;