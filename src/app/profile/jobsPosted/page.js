'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { TiEye } from "react-icons/ti";
import { useContext, useState } from 'react';
import styles from './jobsPosted.module.css';
import Button from '@/components/Button/Button';
import { MdDeleteForever } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import { UserContext } from '@/context/UserContext/UserContext';
import { useJobContext } from '@/context/JobContext/JobContext';


const JobsPosted = () => {
    const { employerInfo } = useContext(UserContext);
    const { jobs, getJobs } = useJobContext();

    const jobsPosted = jobs.filter((e) => employerInfo?._id === e.employerId);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/postJob/${id}`, { 
                method: 'DELETE', 
            });
            const deleteMessage = await res.text();
            if (res) {
                toast.success(deleteMessage);
            }
            getJobs();
        } catch (error) {
            console.error(error);
        }
    };

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
            <div className={styles.jobsPosted}>
                {
                    jobsPosted?.length === 0 &&
                    <div className={styles.noJobs}>
                        <p>No jobs has been posted yet.</p>
                        <Link href="/postJobs"><Button value="Post Jobs" /></Link>
                    </div>
                }

                {jobsPosted?.length > 0 &&
                    <AnimatePresence mode='wait'>
                        <table className={styles.table_container}>
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Job Type</th>
                                    <th>Posted on</th>
                                    <th>End Date</th>
                                    <th>Applications</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <motion.tbody
                                variants={tableBody}
                                initial="hidden"
                                animate="visible"
                            >
                                {jobsPosted.map((job, index) => (
                                    <motion.tr
                                        key={job._id}
                                        variants={item}
                                    >
                                        <td className={styles.title}>{job.job_title}</td>
                                        <td>{job.job_type}</td>
                                        <td>{format(new Date(job.createdAt), 'dd MMM yyyy')}</td>
                                        <td>{format(new Date(job.apply_by), 'dd MMM yyyy')}</td>
                                        <td>{job.job_applications?.length}</td>
                                        <td>
                                            <Link href={`/jobs/${job._id}`} className={styles.view}><TiEye /></Link>
                                            <button className={styles.delete} onClick={() => handleDelete(job._id)}><MdDeleteForever /></button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </table>
                    </AnimatePresence>
                }
            </div>
        </ProfileMenu>
    )
}

export default JobsPosted;