'use client';

import Button from '../Button/Button';
import Image from 'next/image';
import styles from './jobs.module.css';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const LatestJobs = () => {
    return (
        <div className={styles.container}>
            <h2>Recent Listings</h2>

            <div className={styles.jobsContainer}>
                <div className={styles.latest}>
                    <div className={styles.listingBox}>
                        <div className={styles.imgBox}>
                            <Image src="/suitcase.png" alt="suitcase" width={30} height={30} />
                        </div>

                        <div className={styles.description}>
                            <h2>React Frontend Developer</h2>
                            <p>Indra Company</p>
                        </div>
                        <p className={styles.new}>New</p>
                    </div>

                    <div className={styles.jobLocation}>
                        <div className={styles.jobCity}>
                            <HiOutlineLocationMarker className={styles.mark} />
                            <p>Pune - Maharashtra</p>
                        </div>
                        <Button value="View" />
                    </div>
                </div>
                <div className={styles.latest}>
                    <div className={styles.listingBox}>
                        <div className={styles.imgBox}>
                            <Image src="/suitcase.png" alt="suitcase" width={30} height={30} />
                        </div>

                        <div className={styles.description}>
                            <h2>PHP, Laraval Developer</h2>
                            <p>Infosys</p>
                        </div>
                        <p className={styles.new}>New</p>
                    </div>

                    <div className={styles.jobLocation}>
                        <div className={styles.jobCity}>
                            <HiOutlineLocationMarker className={styles.mark} />
                            <p>Delhi</p>
                        </div>
                        <Button value="View" />
                    </div>
                </div>
                <div className={styles.latest}>
                    <div className={styles.listingBox}>
                        <div className={styles.imgBox}>
                            <Image src="/suitcase.png" alt="suitcase" width={30} height={30} />
                        </div>

                        <div className={styles.description}>
                            <h2>Sales Manager</h2>
                            <p>EdX Infotech</p>
                        </div>
                        <p className={styles.new}>New</p>
                    </div>

                    <div className={styles.jobLocation}>
                        <div className={styles.jobCity}>
                            <HiOutlineLocationMarker className={styles.mark} />
                            <p>Chennai - Tamil Nadu</p>
                        </div>
                        <Button value="View" />
                    </div>
                </div>
                <div className={styles.latest}>
                    <div className={styles.listingBox}>
                        <div className={styles.imgBox}>
                            <Image src="/suitcase.png" alt="suitcase" width={30} height={30} />
                        </div>

                        <div className={styles.description}>
                            <h2>Data Analyst</h2>
                            <p>TCS</p>
                        </div>
                        <p className={styles.new}>New</p>
                    </div>

                    <div className={styles.jobLocation}>
                        <div className={styles.jobCity}>
                            <HiOutlineLocationMarker className={styles.mark} />
                            <p>Bangolore - Karnataka</p>
                        </div>
                        <Button value="View" />
                    </div>
                </div>
                <div className={styles.latest}>
                    <div className={styles.listingBox}>
                        <div className={styles.imgBox}>
                            <Image src="/suitcase.png" alt="suitcase" width={30} height={30} />
                        </div>

                        <div className={styles.description}>
                            <h2>Software Developer</h2>
                            <p>TCS</p>
                        </div>
                        <p className={styles.new}>New</p>
                    </div>

                    <div className={styles.jobLocation}>
                        <div className={styles.jobCity}>
                            <HiOutlineLocationMarker className={styles.mark} />
                            <p>Mumbai - Maharashtra</p>
                        </div>
                        <Button value="View" />
                    </div>
                </div>
                <div className={styles.latest}>
                    <div className={styles.listingBox}>
                        <div className={styles.imgBox}>
                            <Image src="/suitcase.png" alt="suitcase" width={30} height={30} />
                        </div>

                        <div className={styles.description}>
                            <h2>Next Js Frontend Developer</h2>
                            <p>Accenture</p>
                        </div>
                        <p className={styles.new}>New</p>
                    </div>

                    <div className={styles.jobLocation}>
                        <div className={styles.jobCity}>
                            <HiOutlineLocationMarker className={styles.mark} />
                            <p>Kochi - Kerala</p>
                        </div>
                        <Button value="View" />
                    </div>
                </div>
            </div>
        </div>
    )
};


export default LatestJobs;