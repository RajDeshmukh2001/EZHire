'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import styles from './jobsPosted.module.css';
import Button from '@/components/Button/Button';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import { UserContext } from '@/context/UserContext/UserContext';
import { useJobContext } from '@/context/JobContext/JobContext';


const JobsPosted = () => {
    const { employerInfo } = useContext(UserContext);
    const { jobs, getJobs } = useJobContext();
    const [show, setShow] = useState(false);

    const jobsPosted = jobs.filter((e) => employerInfo?._id === e.employerId);

    const handleDisplay = (index) => {
        setShow((prevIndex) => (prevIndex === index ? false : index));
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/postJob/${id}`, { method: 'DELETE' });
            const deleteMessage = await res.text();
            if (res) {
                toast.success(deleteMessage);
            }
            getJobs();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ProfileMenu>
            <div className={styles.jobsPosted}>
                {
                    jobsPosted?.length === 0 &&
                    <div className={styles.noJobs}>
                        <p>No jobs has been posted yet.</p>
                        <Link href="/postJobs"><Button value="Post Jobs" /></Link>
                    </div>
                }

                {jobsPosted.map((job, index) => (
                    <div className={styles.jobs} key={job._id}>
                        <div className={styles.job}>
                            <div className={styles.title}>
                                <h1>{job.job_title}</h1>
                                <p>{job.job_type}</p>
                            </div>

                            <div className={styles.postedOn}>
                                <p>Date Posted</p>
                                <h3>{format(new Date(job.createdAt), 'dd MMM yyyy')}</h3>
                            </div>

                            <div className={styles.applicants}>
                                <p>Applications</p>
                                <h3>20</h3>
                            </div>
                        </div>

                        <div className={styles.options}>
                            <div className={styles.dotIcon} onClick={() => handleDisplay(index)}>
                                <PiDotsThreeVerticalBold />
                            </div>

                            <div className={show === index ? styles.showOptions : styles.hideOptions} onClick={handleDisplay}>
                                <Link href={`/jobs/${job._id}`} className={styles.view}>View</Link>
                                <button>Edit</button>
                                <button className={styles.delete} onClick={() => handleDelete(job._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ProfileMenu>
    )
}

export default JobsPosted;