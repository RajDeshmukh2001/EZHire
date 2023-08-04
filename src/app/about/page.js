'use client';

import Image from 'next/image';
import styles from './about.module.css';
import { BsArrowRight } from 'react-icons/bs';

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.aboutUs}>
        <h1>About Us</h1>
        <p className={styles.text}>EZHire is an advanced hiring platform based on artificial intelligence, enabling recruiters to hire top talent effortlessly.
          <br /><br />
          Instead of having to waste hours on applying filters to search for the right candidates and then checking if they are interested, EZHire provides the recruiter with a curated list of candidates ready for hire from our premium database. This enables the recruiter to spend more time on providing a top candidate experience, while EZHire does the heavy lifting of providing quality profiles.
          <br /><br />
          If you are looking for jobs, EZHire connects you with curated opportunities based on your profile. No fake jobs, no mass emails, and no spamming unlike other platforms.
          <br /><br />
          Trusted by 10,000+ companies including Google, Amazon, Flipkart, Microsoft, Uber, Walmart, Swiggy, and more!</p>
      </div>

      <div className={styles.aboutNumbers}>
        <div className={styles.numbers}>
          <h1>10,000+</h1>
          <p>Jobs</p>
        </div>

        <div className={styles.numbers}>
          <h1>12,000+</h1>
          <p>Companies</p>
        </div>

        <div className={styles.numbers}>
          <h1>20,000+</h1>
          <p>Placements</p>
        </div>
      </div>

      <div className={styles.aboutBox}>
        <div className={styles.content}>
          <h4>Got Talent?</h4>
          <h2>Why job seekers love us</h2>
          <p><span><BsArrowRight /></span>Unique jobs at startups and tech companies you can&apos;t find anywhere else</p>
          <p><span><BsArrowRight /></span>Say goodbye to cover letters - your profile is all you need. One click to apply and you&apos;re done.</p>
          <p><span><BsArrowRight /></span>Everything you need to know to job search - including seeing salary and stock options upfront when looking</p>
          <p><span><BsArrowRight /></span>Connect directly with founders at top startups - no third party recruiters allowed</p>
        </div>

        <div className={styles.content}>
          <h4>Need Talent?</h4>
          <h2>Why recruiters love us</h2>
          <p><span><BsArrowRight /></span>8 million responsive and startup-ready candidates, with all the information you need to vet them</p>
          <p><span><BsArrowRight /></span>Everything you need to kickstart your recruiting - get job posts, company branding, and HR tools set up within 10 minutes, for free</p>
          <p><span><BsArrowRight /></span>A free applicant tracking system, or free integration with any ATS you may already use</p>
        </div>
      </div>
    </div>
  )
}

export default About;