"use client"

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './bookmarked.module.css';
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import { useJobContext } from '@/context/JobContext/JobContext';

const BookmarkedJobs = () => {
    const [bookmarked, setBookmarked] = useState();
    const { bookmarks, handleBookmark, jobs } = useJobContext();
    
    useEffect(() => {
        const bookmarkedJobs = jobs?.filter(job => bookmarks?.includes(job._id));
        setBookmarked(bookmarkedJobs);
    }, [jobs, bookmarks]);

    return (
        <ProfileMenu>
            <div className={styles.applied_container}>
                <table className={styles.table_container}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Company</th>
                            <th>Job Type</th>
                            <th>Posted on</th>
                            <th>View Job</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarked?.map((job) => (
                            <tr key={job._id}>
                                <td className={styles.company_logo}>
                                    {job.company_logo ?
                                        <Image src={job.company_logo} alt="logo" width={30} height={30} className={styles.logo} />
                                        :
                                        <Image src="/suitcase.png" alt="suitcase" width={30} height={30} className={styles.suitcaseBag} />
                                    }
                                </td>
                                <td className={styles.job}>
                                    <motion.h2 whileTap={{ scale: 0.95 }} onClick={() => router.push(`/jobs/${job._id}`)}>{job.job_title}</motion.h2>
                                    <p>{job.company_name} | {job.location}</p>
                                </td>
                                <td>{job.job_type}</td>
                                <td>{format(new Date(job.createdAt), 'dd MMM yyyy')}</td>
                                <td><Link href={`/jobs/${job._id}`}>View</Link></td>
                                <td><button onClick={() => handleBookmark(job._id)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ProfileMenu>
    )
}

export default BookmarkedJobs;