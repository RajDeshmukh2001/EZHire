'use client';

import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { useContext } from 'react';
import Loading from '@/app/loading';
import { TbHash } from 'react-icons/tb';
import { useSession } from 'next-auth/react';
import { GiMoneyStack } from 'react-icons/gi';
import styles from './filteredJobs.module.css';
import { SlLocationPin } from 'react-icons/sl';
import Filters from '@/components/Filters/Filters';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GoDotFill, GoBookmark } from 'react-icons/go';
import { motion, AnimatePresence } from 'framer-motion';
import SearchFilter from '../SearchFilter/SearchFilter';
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { useJobContext } from '@/context/JobContext/JobContext';
import { UserContext } from '@/context/UserContext/UserContext';
import { PiClockClockwise, PiSuitcaseSimple, PiShareNetwork } from 'react-icons/pi';

const Jobs = ({ filterJobs }) => {
  const { isLoading, handleBookmark, bookmarks } = useJobContext();
  const { status: session } = useSession();
  const { employerInfo } = useContext(UserContext);

  const container = {
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
    <div className={styles.jobs_container}>
      <Filters />

      {/* Jobs */}
      <div className={styles.jobsContainer}>
        <SearchFilter filterJobs={filterJobs} />

        <motion.div 
          className={styles.jobs}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {
            isLoading && <Loading />
          }
          <AnimatePresence mode='wait'>
            {filterJobs?.map((job) => {
              const isBookmarked = bookmarks.includes(job._id);
              return (
                <motion.fieldset
                  className={styles.job}
                  key={job._id}
                  variants={item}
                >
                  <legend>{job.work_mode}</legend>

                  <div className={styles.jobHeader}>
                    <div className={styles.jobTitle}>
                      <div className={styles.company_logo}>
                        {job.company_logo ?
                          <Image src={job.company_logo} alt="logo" width={38} height={38} className={styles.logo} />
                          :
                          <Image src="/suitcase.png" alt="suitcase" width={30} height={30} className={styles.suitcaseBag} />
                        }
                      </div>

                      <div className={styles.title}>
                        <h2>{job.job_title}</h2>
                        <div className={styles.company}>
                          <p>{job.company_name}</p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.jobType}>
                      <p className={styles.type}>{job.job_type}</p>

                      <div className={styles.posted}>
                        <PiClockClockwise className={styles.clock} />
                        <p>{moment(job.createdAt).fromNow()}</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.jobBody}>
                    <div className={styles.gridColumn}>
                      <div className={styles.column}>
                        <h4><GiMoneyStack className={styles.money} />{job.salary ? "Salary:" : "Stipend:"} </h4>
                        <p>{job.salary ? job.salary : job.stipend}</p>
                      </div>

                      <div className={styles.column}>
                        <h4><PiSuitcaseSimple className={styles.experience} />Experience: </h4>
                        <p>{job.experience}</p>
                      </div>

                      <div className={styles.column}>
                        <h4><AiOutlineClockCircle />Apply by: </h4>
                        <p>{format(new Date(job.apply_by), 'dd MMM yyyy')}</p>
                      </div>

                      <div className={styles.column}>
                        <h4><TbHash />Openings: </h4>
                        <p>{job.openings}</p>
                      </div>
                    </div>

                    <div className={styles.skills}>
                      <p>Skills - </p>
                      {job.skills.split(', ').map((skill, index) => (
                        <span key={index}>{skill.replace('.', '')}<GoDotFill className={styles.dot} /></span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.buttons}>
                    <p><SlLocationPin /> {job.location}</p>

                    <div className={styles.btns}>
                      {(session === 'authenticated' && !employerInfo) &&
                        <>
                          <div className={styles.options}>
                            {isBookmarked ?
                              <BsFillBookmarkCheckFill className={styles.saved} onClick={() => handleBookmark(job._id)} />
                              :
                              <GoBookmark className={styles.save} onClick={() => handleBookmark(job._id)} />
                            }
                          </div>
                          <PiShareNetwork className={styles.share} />
                        </>
                      }
                      <Link href={`/jobs/${job._id}`} className={styles.view}>View</Link>
                    </div>
                  </div>
                </motion.fieldset>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Jobs;