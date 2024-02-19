'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FilteredJobs from '@/components/FilteredJobs/FilteredJobs';
import { useFilterContext } from '@/context/FilterContext/FilterContext';

const SearchedJobs = () => {
    let { filter_jobs } = useFilterContext();
    const [filterJobs, setFilterJobs] = useState([...filter_jobs]);
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let company = params.get('company');
        let location = params.get('location');
        let category = params.get('category');

        if (company && location) {
            let jobs = filter_jobs.filter((job) => {
                return (
                    job.company_name.toLowerCase().includes(company.toLowerCase()) &&
                    job.location.toLowerCase().includes(location.toLowerCase())
                )
            })
            setFilterJobs(jobs);
        } else if (company) {
            let jobs = filter_jobs.filter((job) => {
                return (
                    job.company_name.toLowerCase().includes(company.toLowerCase())
                )
            })
            setFilterJobs(jobs);
        } else if (location) {
            let jobs = filter_jobs.filter((job) => {
                return (
                    job.location.toLowerCase().includes(location.toLowerCase())
                )
            })
            setFilterJobs(jobs);
        } else if (category) {
            let jobs = filter_jobs.filter((job) => {
                return (
                    job.job_category.toLowerCase().includes(category.toLowerCase())
                )
            })
            setFilterJobs(jobs);
        } else {
            router.push('/');
        }
    }, [filter_jobs])

    return (
        <FilteredJobs filterJobs={filterJobs} />
    )
}

export default SearchedJobs;