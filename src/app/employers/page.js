'use client';

import Button from '@/components/Button/Button';
import Image from 'next/image';
import styles from './employers.module.css';
import { BiSolidChevronRightCircle } from 'react-icons/bi';

const Employers = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.content}>
          <h1>You have a job. We have 8m+ job seekers.</h1>
          <p>From startups to SMEs to established enterprises, EZHire revolutionizes the way businesses find high-quality talent quickly & effortlessly.</p>
          <div className={styles.btn}>
            <Button value="Post Jobs" />
            <Button value="Start Hiring" />
          </div>
        </div>

        <div className={styles.imgBox}>
          <Image src="/employers.png" alt="employeer" width={380} height={260} className={styles.img} />
        </div>
      </div>

      <div className={styles.box}>
        <div className={styles.boxContent}>
          <p className={styles.tag}>Get Started With EZHire</p>
          <h2>Post a job in minutes</h2>
          <h4>Revolutionize your hiring with our AI-powered algorithm.</h4>
          <p className={styles.point}><span><BiSolidChevronRightCircle /></span>Get unlimited applications</p>
          <p className={styles.point}><span><BiSolidChevronRightCircle /></span>10x higher relevancy</p>
          <p className={styles.point}><span><BiSolidChevronRightCircle /></span>Simplified job posting</p>
        </div>

        <div className={styles.boxContent}>
          <p className={styles.tag}>Hire Faster, Hire Better</p>
          <h2>8 million startup-ready candidates</h2>
          <h4>All the tools you need to hire, all in one place.</h4>
          <p className={styles.point}><span><BiSolidChevronRightCircle /></span>Top tech talent</p>
          <p className={styles.point}><span><BiSolidChevronRightCircle /></span>Worldwide focus</p>
          <p className={styles.point}><span><BiSolidChevronRightCircle /></span>Startup-ready</p>
        </div>
      </div>
    </div>
  )
}

export default Employers;