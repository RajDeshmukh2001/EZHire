'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { IoMdEye } from "react-icons/io";
import styles from './applications.module.css';
import { MdFileDownload } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from 'react';
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import { useJobContext } from '@/context/JobContext/JobContext';
import { UserContext } from '@/context/UserContext/UserContext';

const JobApplications = () => {
    const [jobTitle, setJobTitle] = useState('');
    const { jobs } = useJobContext();
    const { employerInfo } = useContext(UserContext);

    const selected_jobs = jobs.filter((job) => job.employerId === employerInfo?._id);
    useEffect(() => {
        if (jobTitle === '' && selected_jobs.length > 0) {
            setJobTitle(selected_jobs[0].job_title);
        }
    }, [selected_jobs]);

    const tableBody = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <ProfileMenu>
            <div className={styles.container}>
                <div className={styles.header}>
                    <p>Total Applications:
                        {selected_jobs.map((job) =>
                            job.job_title === jobTitle &&
                            <span key={job._id}> {job.job_applications?.length}</span>
                        )}
                    </p>
                    <div className={styles.select_job}>
                        <h4>Select Job: </h4>
                        <select name="select_job" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}>
                            {selected_jobs.map((job) => (
                                <option key={job._id} value={job.job_title} name="select_job">{job.job_title}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.application_container}>
                    <AnimatePresence mode='wait'>
                        <table className={styles.table_container}>
                            <thead>
                                <tr>
                                    <th>Applicant Name</th>
                                    <th>Email</th>
                                    <th>Applied on</th>
                                    <th>View CV</th>
                                    <th>Download CV</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <motion.tbody
                                variants={tableBody}
                                initial="hidden"
                                animate="visible"
                            >
                                {selected_jobs.map((job) =>
                                    job.job_title === jobTitle && job.job_applications?.map((applicant, index) => (
                                        <motion.tr
                                            key={applicant._id}
                                            variants={item}
                                        >
                                            <td>{applicant.user_name}</td>
                                            <td>{applicant.user_email}</td>
                                            <td>{format(new Date(applicant.applied_on), 'dd MMM yyyy')}</td>
                                            <td><Link href={applicant.user_resume} className={styles.view_resume} target="_blank" rel="noreferrer"><IoMdEye /></Link></td>
                                            <td><Link href={applicant.user_resume} className={styles.download} download><MdFileDownload /></Link></td>
                                            <td className={styles.actions}>
                                                <button className={styles.approve}>Approve</button>
                                                <button className={styles.reject}>Reject</button>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </motion.tbody>
                        </table>
                    </AnimatePresence>
                </div>
            </div>
        </ProfileMenu>
    )
}

export default JobApplications;