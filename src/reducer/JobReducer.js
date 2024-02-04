const JobReducer = (state, action) => {
    switch (action.type) {
        case 'IS_LOADING':
            return {
                ...state,
                isLoading: true,
            };

        case 'JOBS_DATA':
            return {
                ...state,
                isLoading: false,
                jobs: action.payload,
            }

        case 'JOBS_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        case 'IS_SINGLE_LOADING':
            return {
                ...state,
                isSingleLoading: true,
            }

        case 'SINGLE_JOB_DATA':
            return {
                ...state,
                isSingleLoading: false,
                singleJob: action.payload,
            }

        case 'SINGLE_JOB_ERROR':
            return {
                ...state,
                isSingleLoading: false,
                isSingleError: true,
            };

        default:
            return state;
    }
}

export default JobReducer;