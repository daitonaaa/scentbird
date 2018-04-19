import React from 'react';

import styles from '../PaymentForm.scss';


const GenderSelect =  () => (
  <div className={styles.gender}>
    <div className={styles.genderTitle}>
      Choose your subscription type
    </div>
    <div className={styles.genderBox}>
      <div className={styles.genderSelect}>
        <input type="radio" id="female" name="gender" />
        <label htmlFor="female">
          <div className={styles.genderSelectImage}>
            <img
              alt="female"
              className={styles.genderSelectIcon}
              src="http://test2.ortuna.ru/female.svg"
            />
          </div>
          <img
            alt="check"
            className={styles.genderSelectCheck}
            src="http://test2.ortuna.ru/check.png"
          />
          <div className={styles.genderSelectTitle}>For women</div>
        </label>
      </div>
      <div className={styles.genderSelect}>
        <input type="radio" id="male" name="gender" />
        <label htmlFor="male">
          <div className={styles.genderSelectImage}>
            <img
              alt="male"
              className={styles.genderSelectIcon}
              src="http://test2.ortuna.ru/male.svg"
            />
          </div>
          <img
            alt="check"
            className={styles.genderSelectCheck}
            src="http://test2.ortuna.ru/check.png"
          />
          <div className={styles.genderSelectTitle}>For men</div>
        </label>
      </div>
    </div>
  </div>
);


export default GenderSelect;
