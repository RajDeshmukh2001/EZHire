'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './categories.module.css';
import { useFilterContext } from '@/context/FilterContext/FilterContext';

const Categories = () => {
    const { filter_jobs } = useFilterContext();

    const categories = new Set(filter_jobs?.map((job) => job.job_category));

    const category = {
        Architecture: "https://cdn-icons-png.flaticon.com/128/681/681560.png",
        Sales_and_Marketing: "https://cdn-icons-png.flaticon.com/128/1260/1260198.png",
        Finance_and_Accounting: "https://cdn-icons-png.flaticon.com/128/7892/7892621.png",
        Technology: "https://cdn-icons-png.flaticon.com/128/13304/13304262.png",
        Media_Arts_and_Design: "https://cdn-icons-png.flaticon.com/128/2779/2779775.png",
        Business_Management: "https://cdn-icons-png.flaticon.com/128/10857/10857083.png",
        Education: "https://cdn-icons-png.flaticon.com/128/3976/3976631.png",
        Healthcare: "https://cdn-icons-png.flaticon.com/128/2382/2382461.png",
        Transportation: "https://cdn-icons-png.flaticon.com/128/575/575780.png",
        Supply_Chain_and_Logistics: "https://cdn-icons-png.flaticon.com/128/10951/10951880.png",
        Construction_and_Extraction: "https://cdn-icons-png.flaticon.com/128/4490/4490479.png",
    };

    return (
        <div className={styles.category_container}>
            <h2>Browse by Category</h2>
            <div className={styles.categories}>
                {[...categories].map((cat) => (
                    <motion.div 
                        key={cat} 
                        className={styles.category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Image src={category[cat] ? category[cat] : ""} alt={cat} width={30} height={30} />
                        <Link href={`/searchedJobs?category=${cat}`}><p>{cat.split('_').join(" ")}</p></Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Categories;