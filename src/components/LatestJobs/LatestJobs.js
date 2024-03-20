'use client';

import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import Slider from "react-slick";
import Loading from '@/app/loading';
import styles from './jobs.module.css';
import "slick-carousel/slick/slick.css";
import { useSession } from 'next-auth/react';
import "slick-carousel/slick/slick-theme.css";
import { SlLocationPin } from 'react-icons/sl';
import { PiClockClockwise, PiMoney } from 'react-icons/pi';
import { useJobContext } from '@/context/JobContext/JobContext';
import { BsBookmark, BsFillBookmarkCheckFill } from 'react-icons/bs';
import { useFilterContext } from '@/context/FilterContext/FilterContext';

const LatestJobs = () => {
    const { isLoading, handleBookmark, bookmarks } = useJobContext();
    const { status: session } = useSession();
    let { filter_jobs } = useFilterContext();

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
        <div className={styles.container}>
            <h2>Recent Listings</h2>

            <div className={styles.jobsContainer}>
                {isLoading ?
                    <Loading />
                    :
                    <Slider {...settings}>
                        {filter_jobs.slice(0, 6).map((job) => {
                            const isBookmarked = bookmarks.includes(job._id);
                            return (
                                <div className={styles.latest} key={job._id}>
                                    <div className={styles.listingBox}>
                                        <div className={styles.header}>
                                            <div className={styles.imgBox}>
                                                {job.company_logo ?
                                                    <Image src={job.company_logo} alt="logo" width={25} height={25} className={styles.logo} />
                                                    :
                                                    <Image src="/suitcase.png" alt="suitcase" width={25} height={25} className={styles.suitcaseBag} />
                                                }
                                            </div>

                                            <div className={styles.description}>
                                                <h2>{job.job_title}</h2>
                                                <p>{job.company_name}</p>
                                            </div>
                                        </div>

                                        <div className={styles.jobType}>
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

                                        <div className={styles.job_footer}>
                                            <p><PiClockClockwise />{moment(job.createdAt).fromNow()}</p>
                                            <div className={styles.buttons}>
                                                {session === 'authenticated' &&
                                                    <div>
                                                        {isBookmarked ?
                                                            <BsFillBookmarkCheckFill className={styles.saved} onClick={() => handleBookmark(job._id)} />
                                                            :
                                                            <BsBookmark className={styles.save} onClick={() => handleBookmark(job._id)} />
                                                        }
                                                    </div>
                                                }
                                                <Link href={`/jobs/${job._id}`}>View</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                }
            </div>
        </div>
    )
};


export default LatestJobs;