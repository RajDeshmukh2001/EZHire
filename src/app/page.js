import Image from 'next/image';
import styles from './page.module.css';
import Button from '@/components/Button/Button';
import { images } from './imagesData';
import LatestJobs from '@/components/LatestJobs/LatestJobs';

export default function Home() {
  return (
    <>
    {/* Hero Section */}
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <div className={styles.left}>
            <h1 className={styles.tagline}>Connecting Talent, Shaping Futures: Your Gateway to Success!</h1>
            <p className={styles.text}>The most talent relationship platform for talent sourcing that takes your recruiting into the digital age.</p>

            <div className={styles.searchBar}>
              <input type="search" placeholder="Search by Company" className={styles.search} />
              <input type="search" placeholder="Search by Location" className={styles.search} />
              <Button value="Search" />
            </div>

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
            <div className={styles.image}>
              <Image src="/HeroSection.png" alt="Hero-Section" width={400} height={400} className={styles.img} />
            </div>
          </div>
        </div>
      </div>

      {/* Top Companies */}
      <section className={styles.section}>
        <div className={styles.companies}>
          <h2 className={styles.title}>EZHire is a award winning platform trusted by Top Companies</h2>
          <div className={styles.company}>
            {images.map((image) => (
              <div key={image.id} className={styles.imgBox}>
                <Image src={image.img} alt="logo" width={120} height={60} className={styles.companyLogo} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.latestListings}>
        <LatestJobs />
      </div>
    </>
  )
};