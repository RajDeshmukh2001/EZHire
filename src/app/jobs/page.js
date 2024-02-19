'use client';

import FilteredJobs from '@/components/FilteredJobs/FilteredJobs';
import { useFilterContext } from '@/context/FilterContext/FilterContext';

const Jobs = () => {
  let { filter_jobs } = useFilterContext();

  return (
    <FilteredJobs filterJobs={filter_jobs} />
  )
}

export default Jobs;