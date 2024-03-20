'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from './applyButton.module.css';
import { GoShareAndroid } from "react-icons/go";
import { PiCheckCircleFill } from "react-icons/pi";
import { useContext, useEffect, useState } from "react";
import { useJobContext } from "@/context/JobContext/JobContext";
import { UserContext } from "@/context/UserContext/UserContext";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";

const ApplyButton = ({ handleApply, hasApplied }) => {
    const [applied, setApplied] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const { getSingleJob, singleJob } = useJobContext();
    const { data: session, status: sessionStatus } = useSession();
    const { userInfo, employerInfo } = useContext(UserContext);
    const email = session?.user?.email;

    useEffect(() => {
        const ifApplied = singleJob?.job_applications?.filter((application) => application.userId === userInfo?._id);
        if (ifApplied?.length === 1 || hasApplied) {
            setApplied(true);
        }

        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        setBookmarked(bookmarks?.includes(singleJob?._id));
    }, [singleJob, userInfo, hasApplied]);

    const handleBookmark = (job_id) => {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        if (bookmarks.includes(job_id)) {
            bookmarks = bookmarks.filter(id => id !== job_id);
            setBookmarked(false);
        } else {
            bookmarks.push(job_id);
            setBookmarked(true);
        }
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    return (
        <>
            <div className={styles.buttons}>
                {(employerInfo && employerInfo?.email === email) ?
                    (null)
                    :
                    (
                        <>
                            <div className={styles.apply_button}>
                                {(sessionStatus === 'unauthenticated') ?
                                    (
                                        <Link href="/login" className={styles.login_btn}>Login as an applicant</Link>
                                    )
                                    :
                                    (
                                        applied ?
                                            <button className={styles.applied_btn}><PiCheckCircleFill /> Applied</button>
                                            :
                                            <button className={styles.apply_btn} onClick={handleApply}>Apply</button>
                                    )
                                }
                            </div>
                            {sessionStatus === 'authenticated' &&
                                <div className={styles.btn}>
                                    {bookmarked ?
                                        <button onClick={() => handleBookmark(singleJob?._id)} className={styles.saved_btn}><BsBookmarkCheckFill /> Saved</button>
                                        :
                                        <button onClick={() => handleBookmark(singleJob?._id)}><BsBookmark /> Save</button>
                                    }
                                    <button><GoShareAndroid /> Share</button>
                                </div>
                            }
                        </>
                    )
                }
            </div>
        </>
    )
}

export default ApplyButton;