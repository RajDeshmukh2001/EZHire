'use client';

import styles from './styles.module.css';
import { BiSolidErrorCircle } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { useEffect, useState } from 'react';

const Error = ({ errorMsg, onClose }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (errorMsg) {
            setShow(true);

            const timer = setTimeout(() => {
                setShow(false);
            }, 5000);

            // Clean up the timer when the component unmounts or when show changes
            return () => {
                clearTimeout(timer);
            };
        }
    }, [errorMsg]);

    return (
        <div className={show ? styles.alert : styles.hide}>
            <div className={styles.message}>
                <BiSolidErrorCircle className={styles.icon} />
                <p className={styles.alertMsg}><span className={styles.error}>Error! &nbsp;</span>{errorMsg}</p>
            </div>
            <CgClose className={styles.close} onClick={onClose} />
        </div>
    )
}

export default Error;