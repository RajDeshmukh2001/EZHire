const FilterReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_FILTER_JOBS':
            return {
                ...state,
                filter_jobs: [...action.payload],
                all_jobs: [...action.payload],
            }

        case 'UPDATE_FILTER_VALUE':
            const { name, value } = action.payload;

            if (name === 'job_type' || name === 'job_category') {
                const updatedValues = state.filters[name].includes(value)
                    ? state.filters[name].filter(val => val !== value)
                    : [...state.filters[name], value];

                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        [name]: updatedValues
                    }
                }
            }

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                }
            }

        case 'FILTER_JOBS':
            let { all_jobs } = state;
            let tempFilterJobs = [...all_jobs];
            const { text, work_mode, job_type, job_category } = state.filters;

            if (text) {
                tempFilterJobs = tempFilterJobs.filter((e) => {
                    const lowerCaseText = text.toLowerCase();
                    return (
                        e.job_title.toLowerCase().includes(lowerCaseText) ||
                        e.company_name.toLowerCase().includes(lowerCaseText) ||
                        e.location.toLowerCase().includes(lowerCaseText) ||
                        e.skills.toLowerCase().includes(lowerCaseText)
                    );
                })
            }

            if (work_mode !== 'All') {
                tempFilterJobs = tempFilterJobs.filter((e) => e.work_mode === work_mode)
            }

            if (job_type.length > 0 || job_category.length > 0) {
                tempFilterJobs = tempFilterJobs.filter((e) => {
                    return (
                        job_type.includes(e.job_type) ||
                        job_category.includes(e.job_category)
                    )
                })
            }

            return {
                ...state,
                filter_jobs: tempFilterJobs,
            }

        case 'CLEAR_FILTERS':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: '',
                    work_mode: 'All',
                    job_type: [],
                    job_category: [],
                }
            }

        default:
            return state;
    }
}

export default FilterReducer;