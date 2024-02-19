'use client';

import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import Loading from '@/app/loading';
import { TbHash } from 'react-icons/tb';
import { ImSearch } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { GiMoneyStack } from 'react-icons/gi';
import styles from './filteredJobs.module.css';
import { SlLocationPin } from 'react-icons/sl';
import Filters from '@/components/Filters/Filters';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GoDotFill, GoBookmark } from 'react-icons/go';
import { useJobContext } from '@/context/JobContext/JobContext';
import { useFilterContext } from '@/context/FilterContext/FilterContext';
import { PiClockClockwise, PiSuitcaseSimple, PiShareNetwork } from 'react-icons/pi';

const Jobs = ({ filterJobs }) => {
  const { isLoading } = useJobContext();
  let { filters: { text }, updateFilterValue, clearFilters } = useFilterContext();
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
          <p>Showing {filterJobs?.length} results</p>

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
            <div className={styles.clearButton}>
                <button onClick={clearFilters}>Clear All</button>
            </div>
          </form>
        </div>

        <div className={styles.jobs}>
          {
            isLoading && <Loading />
          }
          {filterJobs?.map((job) => (

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
                  <Link href={`/jobs/${job._id}`} className={styles.view}>View</Link>
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