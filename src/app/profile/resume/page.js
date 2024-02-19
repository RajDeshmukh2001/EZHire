"use client";

import Link from "next/link";
import { format } from 'date-fns';
import { toast } from "react-toastify";
import styles from "./resume.module.css";
import { useContext, useState } from 'react';
import { BiSolidFilePdf } from 'react-icons/bi';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import ProfileMenu from '@/components/ProfileMenu/ProfileMenu';
import { UserContext } from '@/context/UserContext/UserContext';

const Resume = () => {
    const { userInfo, fetchData } = useContext(UserContext);
    const [show, setShow] = useState(false);

    const email = userInfo?.email

    const sortedResumes = userInfo?.resume.filter(res => res.resume_url).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    console.log(sortedResumes);

    const handleDisplay = (index) => {
        setShow((prevIndex) => (prevIndex === index ? false : index));
    };

    const handleDefault = async (id) => {
        try {
            const res = await fetch('/api/handleResume', {
                method: 'PUT',
                body: JSON.stringify({
                    email,
                    resume_id: id,
                })
            })

            const alert = await res.text();
            if (res.status === 200) {
                toast.success(alert);
                fetchData();
            } else {
                toast.error(alert);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProfileMenu>
            <div className={styles.resumeContainer}>
                <div className={styles.resume_grid}>
                    {
                        sortedResumes?.map((resume, index) => (
                            <div className={styles.resume} key={resume._id}>
                                <div className={styles.resumeHeader}>
                                    <div className={styles.pdfIcon}>
                                        <BiSolidFilePdf className={styles.icon} />
                                    </div>
                                    <div className={styles.resumeName}>
                                        <p className={styles.title}>{userInfo?.fullname.split(" ").join("_")}_Resume_{resume.asset_id}</p>
                                        <p className={styles.date}>{format(new Date(resume.created_at), 'MMM dd, yyyy')}</p>
                                    </div>
                                </div>

                                <div className={styles.defaultOption}>
                                    {resume.set_default && <p className={styles.setDefault}>Default</p>}
                                </div>

                                <div className={styles.options}>
                                    <div className={styles.dotIcon} onClick={() => handleDisplay(index)}>
                                        <PiDotsThreeVerticalBold />
                                    </div>

                                    <div className={show === index ? styles.showOptions : styles.hideOptions} onClick={handleDisplay}>
                                        <Link href={resume.resume_url} className={styles.view} target="_blank" rel="noreferrer" onClick={handleDisplay}>View</Link>
                                        <p className={styles.default} onClick={() => handleDefault(resume._id)}>Set Default</p>
                                        <p className={styles.delete} onClick={handleDisplay}>Delete</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </ProfileMenu>
    )
}

export default Resume;