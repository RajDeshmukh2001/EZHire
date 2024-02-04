"use client";

import Link from "next/link";
import styles from "./resume.module.css";
import MyProfile from '@/components/MyProfile/MyProfile';
import { format } from 'date-fns';
import { UserContext } from '@/context/UserContext/UserContext';
import { BiSolidFilePdf } from 'react-icons/bi';
import { useContext, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi';

const Resume = () => {
    const { userInfo } = useContext(UserContext);
    const [show, setShow] = useState(null);

    const handleDisplay = (index) => {
        // const newShowOptions = show.map((value, i) => (i === index ? !value : false));
        // setShow(newShowOptions);
        setShow((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <>
            <MyProfile>
                <div className={styles.resumeContainer}>
                    {
                        userInfo?.resume.map((resume, index) => (
                            <div className={styles.resume} key={resume._id}>
                                <div className={styles.resumeInfo}>
                                    <div className={styles.resumeHeader}>
                                        <div className={styles.pdfIcon}>
                                            <BiSolidFilePdf className={styles.icon} />
                                        </div>
                                        <div className={styles.resumeName}>
                                            <p className={styles.title}>{userInfo?.fullname.split(" ").join("_")}_Resume_{resume.asset_id}</p>
                                            <p className={styles.date}>{format(new Date(resume.created_at), 'MMM dd, yyyy')}</p>
                                        </div>
                                    </div>

                                    <div className={styles.resumeOptions}>
                                        <div>
                                            {resume.set_default && <p className={styles.setDefault}>Default</p>}
                                        </div>

                                        <div className={styles.options}>
                                            <div className={styles.dotIcon} onClick={() => handleDisplay(index)}>
                                                <PiDotsThreeVerticalBold />
                                            </div>

                                            <div className={show === index ? styles.showOptions : styles.hideOptions}>
                                                <Link href={resume.resume_url} className={styles.view} target="_blank" rel="noreferrer" onClick={handleDisplay}>View</Link>
                                                <p className={styles.default}>Set Default</p>
                                                <p className={styles.delete} onClick={handleDisplay}>Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </MyProfile>
        </>
    )
}

export default Resume;