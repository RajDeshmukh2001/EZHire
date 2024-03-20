'use client';

import moment from 'moment';
import Link from 'next/link';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styles from './relatedJobs.module.css';
import "slick-carousel/slick/slick-theme.css";
import { SlLocationPin } from 'react-icons/sl';
import { PiClockClockwise, PiMoney } from 'react-icons/pi';
import { useJobContext } from '@/context/JobContext/JobContext';
import { useFilterContext } from '@/context/FilterContext/FilterContext';

const RelatedJobs = ({ category, jobId }) => {
    const { jobs } = useJobContext();
    let { filter_jobs } = useFilterContext();

    const relatedJobsData = filter_jobs.filter((e) => {
        if (e.job_category && e.job_category === category && e._id !== jobId) {
            return e;
        }
    });

    let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            {relatedJobsData?.length > 0 &&
                <div className={styles.relatedJobsContainer}>
                    <h2 className={styles.relatedJobsTitle}>Related Jobs and Internships</h2>
                    <div className={styles.relatedJobs}>

                        <Slider {...settings}>
                            {relatedJobsData?.map((job) => (
                                <div className={styles.relatedJob} key={job._id}>

                                    <div className={styles.jobHead}>
                                        <div className={styles.jobRole}>
                                            <h3>{job.job_title}</h3>
                                            <p>{job.company_name}</p>
                                        </div>

                                        <div className={styles.jobMode}>
                                            <h4>{job.job_type}</h4>
                                        </div>
                                    </div>

                                    <div className={styles.jobBdy}>
                                        <div className={styles.jobLocation}>
                                            <p><SlLocationPin className={styles.siLocation} />{job.location}</p>
                                            <p><PiMoney />{job.salary ? job.salary : job.stipend}</p>
                                        </div>

                                        <div className={styles.jobSkills}>
                                            <p>Skills - </p>
                                            {job.skills.split(', ').map((skill, index) => (
                                                <p key={index} className={styles.relatedSkills}>{skill.replace('.', '')}</p>
                                            ))}
                                        </div>

                                        <div className={styles.viewJob}>
                                            <p><PiClockClockwise />{moment(job.createdAt).fromNow()}</p>
                                            <Link href={`/jobs/${job._id}`}>View</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            }
        </>
    )
}

export default RelatedJobs;