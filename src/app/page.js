'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { images } from './imagesData';
import { motion } from "framer-motion";
import styles from './page.module.css';
import Button from '@/components/Button/Button';
import { IoIosCheckmarkCircle } from "react-icons/io";
import LatestJobs from '@/components/LatestJobs/LatestJobs';
import Categories from '@/components/Categories/Categories';

export default function Home() {
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');

  let query;
  if (company && location) {
    query = 'company=' + company + '&location=' + location;
  } else if (company) {
    query = 'company=' + company;
  } else {
    query = 'location=' + location;
  }

  return (
    <>
      {/* Hero Section */}
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <div className={styles.left}>
            <h1 className={styles.tagline}>Connecting Talent, Shaping Futures: Your Gateway to Success!</h1>
            <p className={styles.text}>The most talent relationship platform for talent sourcing that takes your recruiting into the digital age.</p>

            <form className={styles.searchBar}>
              <input type="text" onChange={(e) => setCompany(e.target.value)} placeholder="Search by Company" className={styles.search} />
              <input type="text" onChange={(e) => setLocation(e.target.value)} placeholder="Search by Location" className={styles.search} />
              <Link href={`/searchedJobs?${query}`}><Button value="Search" /></Link>
            </form>

            <div className={styles.numbers}>
              <div>
                <h2>10k+</h2>
                <p>Jobs</p>
              </div>
              <div>
                <h2>12k+</h2>
                <p>Companies</p>
              </div>
              <div>
                <h2>20k+</h2>
                <p>Placements</p>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.job_card}>
              <Image src="/reactjs.png" alt="reactjs" width={22} height={22} />
              <div className={styles.react}>
                <h2>React.js Developer</h2>
                <p>100+ jobs</p>
              </div>
            </div>
            <div className={styles.finance}>
              <Image src="/finance-dollar.png" alt="finance" width={22} height={22} />
              <div className={styles.react}>
                <h2>Finance Executive</h2>
                <p>Mumbai, India</p>
              </div>
            </div>
            <div className={styles.Applied}>
              <IoIosCheckmarkCircle />
              <p>Applied</p>
            </div>
            <div className={styles.image}>
              <Image src="/ManAndChild.png" alt="Hero" width={420} height={450} className={styles.img} />
              <Image src="/ManAndChild.png" alt="Hero-Section" width={220} height={250} className={styles.responsive} />
            </div>
          </div>
        </div>
      </div>

      {/* Top Companies */}
      <section className={styles.section}>
        <h2 className={styles.title}>EZHire is a award winning platform trusted by Top Companies</h2>
        <div className={styles.companies}>
          <div className={styles.company}>
            {images.map((image) => (
              <div key={image.id} className={styles.imgBox}>
                <Image src={image.img} alt="logo" width={120} height={60} className={styles.companyLogo} />
              </div>
            ))}
          </div>
          <div className={styles.company}>
            {images.map((image) => (
              <div key={image.id} className={styles.imgBox}>
                <Image src={image.img} alt="logo" width={120} height={60} className={styles.companyLogo} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div>
        <Categories />
      </div>

      <div className={styles.latestListings}>
        <LatestJobs />
      </div>
    </>
  )
};