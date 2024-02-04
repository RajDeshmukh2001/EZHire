"use client";

import Link from 'next/link';
import styles from './jobsPosted.module.css';
import Success from '@/alerts/Success/Success';
import MyProfile from '@/components/MyProfile/MyProfile';
import { format } from 'date-fns';
import { IoEyeSharp } from 'react-icons/io5';
import { UserContext } from '@/context/UserContext/UserContext';
import { useJobContext } from '@/context/JobContext/JobContext';
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import Button from '@/components/Button/Button';

const JobsPosted = () => {
    const { employerInfo } = useContext(UserContext);
    const { jobs, getJobs } = useJobContext();
    const [success, setSuccess] = useState("");

    const jobsPosted = jobs.filter((e) => employerInfo?._id === e.employerId);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/postJob/${id}`, { method: 'DELETE' });
            const deleteMessage = await res.text();
            if (res) {
                setSuccess(deleteMessage);
            }
            getJobs();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setSuccess(false);
    };

    return (
        <>
            {success && <Success successMsg={success} onClose={handleClose} />}
            <MyProfile>
                <div className={styles.jobsPosted}>
                    {
                        jobsPosted?.length === 0 && 
                        <div className={styles.noJobs}>
                            <p>No jobs has been posted yet.</p>
                            <Link href="/postJobs"><Button value="Post Jobs" /></Link>
                        </div>
                    }

                    {jobsPosted.map((job) => (
                        <div className={styles.jobs} key={job._id}>
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

                            <div className={styles.buttons}>
                                <Link href={`/jobs/${job._id}`}><IoEyeSharp /></Link>
                                <button><BiSolidEditAlt /></button>
                                <button onClick={() => handleDelete(job._id)}><MdDeleteForever /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </MyProfile>
        </>
    )
}

export default JobsPosted;