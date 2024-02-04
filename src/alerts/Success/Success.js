'use client';

import styles from './sucess.module.css';
import { CgClose } from 'react-icons/cg';
import { GoCheckCircleFill } from 'react-icons/go';
import { useEffect, useState } from 'react';

const Success = ({ successMsg, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Use setTimeout to set show to false after 10 seconds
        const timer = setTimeout(() => {
            setShow(false);
        }, 10000); // 10 seconds in milliseconds

        // Clean up the timer when the component unmounts or when show changes
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <div className={show ? styles.alert : styles.hide}>
                <div className={styles.message}>
                    <GoCheckCircleFill className={styles.icon} />
                    <p className={styles.alertMsg}><span className={styles.error}>Success! &nbsp;</span>{successMsg}</p>
                </div>
                <CgClose className={styles.close} onClick={onClose} />
            </div>
        </>
    )
}

export default Success