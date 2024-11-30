import React from 'react'

import styles from '../components/ProfileInfo.module.css'

const ProfileInfo = (props) => {
  return (
    <div className={styles.mainContainer}>
            <div className={styles.profileMenu}>
                <div className={styles.pictureContainer}>
                    <img src="https://placehold.co/200x200" alt="profile picture" />
                    <p>Set Profile Picture</p>
                    <hr />
                </div>

                <p>First Name: <b>{props.firstName}</b></p>
                <p>Last Name: <b>{props.lasttName}</b></p>
                <p>Email: <b>{props.email}</b></p>
                <p>Institution: <b>{props.institution}</b></p>
                <p>Account Creation Date-Time: <b>{props.acCreated}</b></p>
            </div>
        </div>
  );
}

export default ProfileInfo;