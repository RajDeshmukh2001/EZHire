'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import styles from './applied.module.css';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import { useJobContext } from '@/context/JobContext/JobContext';
import { UserContext } from '@/context/UserContext/UserContext';
import { useFilterContext } from '@/context/FilterContext/FilterContext';

const Applied = () => {
    const router = useRouter();
    const { jobs } = useJobContext();
    const { filter_jobs } = useFilterContext();
    const { userInfo } = useContext(UserContext);
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        const job_applied = filter_jobs.filter((job) => {
            return job.job_applications.some((applicant) => {
                return applicant.userId === userInfo?._id
            })
        });

        setAppliedJobs(job_applied);
    }, [userInfo]);

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
                            <th>Applied on</th>
                            <th>Status</th>
                            <th>View Job</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appliedJobs?.map((job, index) => (
                            <tr key={index}>
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
                                {job.job_applications.map((applicant) => (
                                    applicant.userId === userInfo?._id &&
                                    <td key={applicant._id}>{format(new Date(applicant.applied_on), 'dd MMM yyyy')}</td>
                                ))}
                                <td>pending</td>
                                <td><Link href={`/jobs/${job._id}`}>View</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ProfileMenu>
    )
}

export default Applied;