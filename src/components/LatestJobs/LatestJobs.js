'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './jobs.module.css';
import { SlLocationPin } from 'react-icons/sl';
import { useJobContext } from '@/context/JobContext/JobContext';
import { PiClockClockwise, PiMoney } from 'react-icons/pi';
import moment from 'moment';

const LatestJobs = () => {
    const { jobs, isLoading } = useJobContext();

    return (
        <div className={styles.container}>
            <h2>Recent Listings</h2>

            <div className={styles.jobsContainer}>
                {isLoading && <p>Loading...</p>}

                {jobs.slice(0, 3).map((job) => (
                    <div className={styles.latest} key={job._id}>
                        <div className={styles.listingBox}>
                            <div className={styles.header}>
                                <div className={styles.imgBox}>
                                    <Image src="/suitcase.png" alt="suitcase" width={30} height={30} />
                                </div>

                                <div className={styles.description}>
                                    <h2>{job.job_title}</h2>
                                    <p>{job.company_name}</p>
                                </div>
                            </div>

                            <div className={styles.jobType}>
                                <p className={styles.new}>New</p>
                                <h2>{job.job_type}</h2>
                            </div>
                        </div>

                        <div className={styles.jobBody}>
                            <div className={styles.jonInfo}>
                                <div className={styles.locationAndSalary}>
                                    <SlLocationPin className={styles.icon} />
                                    <p>{job.location}</p>
                                </div>

                                <div className={styles.locationAndSalary}>
                                    <PiMoney className={styles.icon} />
                                    <p>{job.salary ? job.salary : job.stipend}</p>
                                </div>
                            </div>

                            <div className={styles.jobSkills}>
                                <p>Skills - </p>
                                {job.skills.split(', ').map((skill, index) => (
                                    <p key={index} className={styles.skills}>{skill.replace('.', '')}</p>
                                ))}
                            </div>

                            <div className={styles.viewJob}>
                                <p><PiClockClockwise />{moment(job.createdAt).fromNow()}</p>
                                <Link href={`/jobs/${job._id}`}>View</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};


export default LatestJobs;