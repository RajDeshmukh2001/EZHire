"use client";

import styles from "./filters.module.css";
import { SlMinus, SlPlus } from "react-icons/sl";
import { useFilterContext } from "@/context/FilterContext/FilterContext";
import { useState } from "react";
import Button from "../Button/Button";

const Filters = () => {
    const { filters: { work_mode, job_type, job_category }, updateFilterValue, clearFilters } = useFilterContext();
    const [showType, setShowType] = useState(false);
    const [showCategory, setShowCategory] = useState(false);

    return (
        <div className={styles.filters}>

            <div className={`${styles.filter} ${styles.responsiveFilter}`}>
                <h4>Work Mode</h4>

                <form action="#">
                    <select name="work_mode" value={work_mode} onChange={updateFilterValue}>
                        <option value="All" name="work_mode">All</option>
                        <option value="In-Office" name="work_mode">In-Office</option>
                        <option value="Remote" name="work_mode">Remote</option>
                        <option value="Flexible" name="work_mode">Flexible</option>
                    </select>
                </form>
            </div>

            <div className={`${styles.filter} ${styles.filterBox}`}>
                <div className={styles.filterHeading}>
                    <h4>Job Type</h4>

                    {showType ? (
                        <SlMinus className={styles.icon} onClick={() => setShowType(false)} />
                    ) : (
                        <SlPlus className={styles.icon} onClick={() => setShowType(true)} />
                    )}
                </div>

                <div className={showType ? styles.checkBoxFilter : styles.hide}>
                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Full-time"
                            name="job_type"
                            value="Full-time"
                            checked={job_type.includes('Full-time')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Full-time">Full-time</label>
                    </div>

                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Part-time"
                            name="job_type"
                            value="Part-time"
                            checked={job_type.includes('Part-time')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Part-time">Part-time</label>
                    </div>

                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Fresher"
                            name="job_type"
                            value="Fresher"
                            checked={job_type.includes('Fresher')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Fresher">Fresher</label>
                    </div>

                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Internship"
                            name="job_type"
                            value="Internship"
                            checked={job_type.includes('Internship')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Internship">Internship</label>
                    </div>

                    <div className={`${styles.checkBox} ${styles.lastCheckBox}`}>
                        <input
                            type="checkbox"
                            id="Contract"
                            name="job_type"
                            value="Contract"
                            checked={job_type.includes('Contract')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Contract">Contract</label>
                    </div>
                </div>
            </div>

            <div className={`${styles.filter} ${styles.filterBox}`}>
                <div className={styles.filterHeading}>
                    <h4>Job Category</h4>

                    {showCategory ? (
                        <SlMinus className={styles.icon} onClick={() => setShowCategory(false)} />
                    ) : (
                        <SlPlus className={styles.icon} onClick={() => setShowCategory(true)} />
                    )}
                </div>

                <div className={showCategory ? styles.checkBoxFilter : styles.hide}>
                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Architecture"
                            name="job_category"
                            value="Architecture"
                            checked={job_category.includes('Architecture')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Architecture">Architecture</label>
                    </div>

                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Sales and Marketing"
                            name="job_category"
                            value="Sales and Marketing"
                            checked={job_category.includes('Sales and Marketing')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Sales and Marketing">Sales and Marketing</label>
                    </div>

                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Finance and Accounting"
                            name="job_category"
                            value="Finance and Accounting"
                            checked={job_category.includes('Finance and Accounting')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Finance and Accounting">Finance and Accounting</label>
                    </div>

                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Technology"
                            name="job_category"
                            value="Technology"
                            checked={job_category.includes('Technology')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Technology">Technology</label>
                    </div>

                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Business Management"
                            name="job_category"
                            value="Business Management"
                            checked={job_category.includes('Business Management')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Business Management">Business Management</label>
                    </div>

                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Education"
                            name="job_category"
                            value="Education"
                            checked={job_category.includes('Education')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Education">Education</label>
                    </div>

                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Healthcare"
                            name="job_category"
                            value="Healthcare"
                            checked={job_category.includes('Healthcare')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Healthcare">Healthcare</label>
                    </div>

                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Supply Chain and Logistics"
                            name="job_category"
                            value="Supply Chain and Logistics"
                            checked={job_category.includes('Supply Chain and Logistics')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Supply Chain and Logistics">Supply Chain and Logistics</label>
                    </div>

                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="Transportation"
                            name="job_category"
                            value="Transportation"
                            checked={job_category.includes('Transportation')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Transportation">Transportation</label>
                    </div>

                    <div className={`${styles.checkBox} ${styles.lastCheckBox}`}>
                        <input
                            type="checkbox"
                            id="Media, Arts and Design"
                            name="job_category"
                            value="Media, Arts and Design"
                            checked={job_category.includes('Media, Arts and Design')}
                            onChange={updateFilterValue}
                        />
                        <label htmlFor="Media, Arts and Design">Media, Arts and Design</label>
                    </div>
                </div>
            </div>

            <div className={styles.clearButton}>
                <button onClick={clearFilters}>
                    <Button value="Clear All" />
                </button>
            </div>
        </div>
    );
};

export default Filters;