"use client";

import styles from './button.module.css';

const Button = ({ value }) => {
  return (
    <button className={styles.mainButton}>{value}</button>
  )
};

export default Button;