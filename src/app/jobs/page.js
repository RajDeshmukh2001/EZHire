'use client';

import Link from 'next/link';
import moment from 'moment';
import styles from './jobs.module.css';
import Loading from '../loading';
import Filters from '@/components/Filters/Filters';
import { TbHash } from 'react-icons/tb';
import { format } from 'date-fns';
import { ImSearch } from 'react-icons/im';
import { FaSuitcase } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { useJobContext } from '@/context/JobContext/JobContext';
import { SlLocationPin } from 'react-icons/sl';
import { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GoDotFill, GoBookmark } from 'react-icons/go';
import { PiClockClockwise, PiSuitcaseSimple, PiShareNetwork } from 'react-icons/pi';
import { useFilterContext } from '@/context/FilterContext/FilterContext';
import Image from 'next/image';

const Jobs = () => {
  const { isLoading } = useJobContext();
  const { filters: { text }, filter_jobs, all_jobs, updateFilterValue } = useFilterContext();
  const [search, setSearch] = useState(0);

  const searchOptions = [
    'Search by Job title...',
    'Search by Skills...',
    'Search by Company...',
    'Search by Location...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSearch(prev =>
        (prev + 1) % searchOptions.length
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.jobs_container}>
      <Filters />

      {/* Jobs */}
      <div className={styles.jobsContainer}>
        <div className={styles.header}>
          <p>Showing {filter_jobs?.length} results</p>

          <form className={styles.search} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.searchBox}>
              <input
                type="text"
                name="text"
                value={text}
                onChange={updateFilterValue}
                placeholder={searchOptions[search]}
                autoComplete="on"
              />
              <ImSearch className={styles.icon} />
            </div>
          </form>
        </div>

        <div className={styles.jobs}>
          {
            isLoading && <Loading />
          }
          {filter_jobs?.map((job) => (

            <fieldset className={styles.job} key={job._id}>
              <legend>{job.work_mode}</legend>

              <div className={styles.jobHeader}>
                <div className={styles.jobTitle}>
                  <div className={styles.suitcase}>
                    <Image src="/suitcase.png" alt="suitcase" width={30} height={30} className="suitcaseBag" />
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
                    <p>&#8377; {job.salary ? job.salary : job.stipend}</p>
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
                  <div className={styles.options}>
                    <GoBookmark className={styles.save} />
                    <PiShareNetwork className={styles.share} />
                  </div>
                  <Link href={`/jobs/${job._id}`} className={styles.btn}>View</Link>
                </div>
              </div>
            </fieldset>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Jobs;