'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../../reducer/FilterReducer';
import { useJobContext } from '../JobContext/JobContext';
import { UserContext } from '../UserContext/UserContext';

export const FilterContext = createContext();

const initialState = {
    filter_jobs: [],
    all_jobs: [],
    filters: {
        text: '',
        work_mode: 'All',
        job_type: [],
        job_category: [],
    }
}

export const FilterProvider = ({ children }) => {
    const { jobs } = useJobContext();
    const { userInfo } = useContext(UserContext);

    const [state, dispatch] = useReducer(reducer, initialState);

    const updateFilterValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        return dispatch({ type: 'UPDATE_FILTER_VALUE', payload: { name, value } });
    }

    const clearFilters = () => {
        dispatch({ type: 'CLEAR_FILTERS' });
    }

    // Filter the Jobs
    useEffect(() => {
        dispatch({ type: 'FILTER_JOBS' });
    }, [jobs, state.filters]);

    // Load Filtered Jobs
    useEffect(() => {
        dispatch({ type: 'LOAD_FILTER_JOBS', payload: { jobs, userInfo } });
    }, [jobs, userInfo]);

    return (
        <FilterContext.Provider value={{ ...state, updateFilterValue, clearFilters }}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}