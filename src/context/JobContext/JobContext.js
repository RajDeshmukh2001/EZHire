"use client"

import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../../reducer/JobReducer';

export const JobContext = createContext();

const initialState = {
    isLoading: false,
    isError: false,
    jobs: [],
    isSingleLoading: false,
    isSingleError: false,
    singleJob: [],
}

export const JobProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const getJobs = async () => {
        dispatch({ type: 'IS_LOADING' });
        try {
            const res = await fetch('/api/postJob');
            const jobsData = await res.json();
            dispatch({ type: 'JOBS_DATA', payload: jobsData });
        } catch (error) {
            dispatch({ type: 'JOBS_ERROR' });
        }
    }

    const getSingleJob = async (url) => {
        dispatch({ type: 'IS_SINGLE_LOADING' });
        try {
            const res = await fetch(url, { cache: "no-store" });
            const singleJob = await res.json();
            dispatch({ type: 'SINGLE_JOB_DATA', payload: singleJob });
        } catch (error) {
            dispatch({ type: 'SINGLE_JOB_ERROR' });
        }
    }

    useEffect(() => {
        getJobs();
    }, []);

    return (
        <JobContext.Provider value={{ ...state, getSingleJob, getJobs }}>
            {children}
        </JobContext.Provider>
    )
}

export const useJobContext = () => {
    return useContext(JobContext);
}