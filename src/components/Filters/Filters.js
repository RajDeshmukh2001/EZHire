"use client";

import { useState } from "react";
import styles from "./filters.module.css";
import { IoMdArrowDropdown, IoMdArrowDropup  } from "react-icons/io";
import { useFilterContext } from "@/context/FilterContext/FilterContext";

const Filters = () => {
    const { filters: { work_mode, job_type, job_category }, updateFilterValue, clearFilters } = useFilterContext();
    const [showType, setShowType] = useState(false);
    const [showCategory, setShowCategory] = useState(false);

    return (
        <div className={styles.filter_container}>
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
                            <IoMdArrowDropup  className={styles.icon} onClick={() => setShowType(false)} />
                        ) : (
                            <IoMdArrowDropdown className={styles.icon} onClick={() => setShowType(true)} />
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
                            <IoMdArrowDropup  className={styles.icon} onClick={() => setShowCategory(false)} />
                        ) : (
                            <IoMdArrowDropdown  className={styles.icon} onClick={() => setShowCategory(true)} />
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
                                value="Sales_and_Marketing"
                                checked={job_category.includes('Sales_and_Marketing')}
                                onChange={updateFilterValue}
                            />
                            <label htmlFor="Sales and Marketing">Sales and Marketing</label>
                        </div>

                        <div className={styles.checkBox}>
                            <input
                                type="checkbox"
                                id="Finance and Accounting"
                                name="job_category"
                                value="Finance_and_Accounting"
                                checked={job_category.includes('Finance_and_Accounting')}
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
                                value="Business_Management"
                                checked={job_category.includes('Business_Management')}
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
                                value="Supply_Chain_and_Logistics"
                                checked={job_category.includes('Supply_Chain_and_Logistics')}
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
                                value="Media_Arts_and_Design"
                                checked={job_category.includes('Media_Arts_and_Design')}
                                onChange={updateFilterValue}
                            />
                            <label htmlFor="Media, Arts and Design">Media, Arts and Design</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.clearButton}>
                <button onClick={clearFilters}>Clear All</button>
            </div>
        </div>
    );
};

export default Filters;