'use client';

import Button from '@/components/Button/Button';
import styles from './jobs.module.css';
import Image from 'next/image';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useEffect, useState } from 'react';

const Jobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://data.usajobs.gov/api/search?Keyword=developer', {
        method: 'GET',
        headers: {
          "Host": process.env.NEXT_PUBLIC_HOST,
          "User-Agent": process.env.NEXT_PUBLIC_USERAGENT,
          "Authorization-Key": process.env.NEXT_PUBLIC_AUTHKEY
        }
      });
      const data = await res.json();
      setJobsData(data.SearchResult.SearchResultItems);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.filter}>
          <label htmlFor="location" className={styles.label}>Location</label>
          <input type="text" className={styles.input} results="5" />
        </div>
        
        <div className={styles.filter}>
          <label htmlFor="company" className={styles.label}>Company</label>
          <input type="text" className={styles.input} results="5" />
        </div>

        <div className={styles.filter}>
          <label htmlFor="industry" className={styles.label}>Industry</label>
          <input type="text" placeholder="Ex. Banking, Technology, etc." className={styles.input} results="5" />
        </div>

        <div className={styles.filter}>
          <label htmlFor="sort" className={styles.label}>Sort by</label>
          <select name="sort" className={styles.input}>
            <option value="Most Relevant">Most Relevant</option>
            <option value="Most Resent">Most Resent</option>
            <option value="Date Posted">Date Posted</option>
          </select>
        </div>

        <div className={styles.filter}>
          <label htmlFor="type" className={styles.label}>Job Type</label>
          <select name="sort" className={styles.input}>
            <option value="on site">On-site</option>
            <option value="remote">Remote</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className={styles.filter}>
          <label htmlFor="experience" className={styles.label}>Experience</label>
          <select name="sort" className={styles.input}>
            <option value="fresher">Fresher</option>
            <option value="1 Year">1 Year</option>
            <option value="2 year">2 Year</option>
            <option value="3 year">3 Year</option>
            <option value="4 year">4 Year</option>
            <option value="5 year">5+ Year</option>
          </select>
        </div>

        <div className={styles.btn}>
          <Button value="Apply" />
          <Button value="Clear" />
        </div>
      </div>

      {
        isLoading && 
        <div className={styles.spinnerBox}>
          <div className={styles.spinner}></div>
        </div>
      }
      <div className={styles.jobs}>
        {jobsData.map((job) => {
          const { OrganizationName, PositionID, PositionLocationDisplay, PositionTitle, JobCategory } = job.MatchedObjectDescriptor;
          return (
            <div className={styles.job} key={PositionID}>
              <div className={styles.header}>
                <div className={styles.imgBox}>
                  <Image src="/suitcase.png" alt="suitcase" width={40} height={40} className={styles.img} />
                </div>
                <div className={styles.jobTitle}>
                  <h2>{PositionTitle}</h2>
                  <p>{OrganizationName}</p>
                </div>
                <div className={styles.date}>
                  <AiOutlineClockCircle className={styles.clock} />
                  <p>1d</p>
                </div>
              </div>

              <div className={styles.category}>
                {JobCategory.map((cat) => {
                  return (
                    <p key={cat.Code}>{cat.Name}</p>
                  )
                })}
              </div>

              <div className={styles.location}>
                <div className={styles.city}>
                  <HiOutlineLocationMarker className={styles.mark} />
                  <p>{PositionLocationDisplay}</p>
                </div>
                <Button value="View" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Jobs;