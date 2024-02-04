'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <div className={styles.mainFooter}>
      <div className={styles.footer}>
        <div className={styles.main}>
          <div className={`${styles.links} ${styles.grid1}`}>
            <Link href="/" className={styles.logo}>EZHire</Link>
            <p className={styles.tagline}>We always help our seekers find the best jobs and companies find the best candidates</p>
          </div>

          <div className={styles.links}>
            <h3 className={styles.title}>For Candidates</h3>
            <h4 className={styles.link}>Top Companies</h4>
            <h4 className={styles.link}>Marketing and Sales Jobs</h4>
            <h4 className={styles.link}>Software Engineering Jobs</h4>
            <h4 className={styles.link}>UX/UI and Graphic Design Jobs</h4>
          </div>

          <div className={styles.links}>
            <h3 className={styles.title}>For Recruiters</h3>
            <h4 className={styles.link}>Pricing</h4>
            <h4 className={styles.link}>Post Jobs</h4>
            <h4 className={styles.link}>Hire Talents</h4>
          </div>

          <div className={styles.links}>
            <h3 className={styles.title}>Company</h3>
            <h4 className={styles.link}>Blog</h4>
            <h4 className={styles.link}>Partners</h4>
            <Link href="/about"><h4 className={styles.link}>About Us</h4></Link>
            <h4 className={styles.link}>Contact Us</h4>
          </div>

          <div className={styles.links}>
            <h3 className={styles.title}>Legal</h3>
            <h4 className={styles.link}>FAQs</h4>
            <h4 className={styles.link}>Terms</h4>
            <h4 className={styles.link}>Help Center</h4>
            <h4 className={styles.link}>Privacy Policy</h4>
          </div>
        </div>

        <div className={styles.social}>
          <p className={styles.copyright}>&copy; EZHire 2023 | All Rights Reserved</p>
          <div className={styles.socialIcons}>
            <Image src="/instagram.png" alt="instagram" width={23} height={23} className={styles.icons} />
            <Image src="/twitter.png" alt="instagram" width={23} height={23} className={styles.icons} />
            <Image src="/facebook.png" alt="instagram" width={23} height={23} className={styles.icons} />
            <Image src="/linkedin.png" alt="instagram" width={23} height={23} className={styles.icons} />
            <Image src="/telegram.png" alt="instagram" width={23} height={23} className={styles.icons} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Footer;