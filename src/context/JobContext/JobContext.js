"use client"

import reducer from '../../reducer/JobReducer';
import { createContext, useContext, useEffect, useReducer, useState } from "react";

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
    const [bookmarks, setBookmarks] = useState([]);
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

    const handleBookmark = (jobId) => {
        const isBookmarked = bookmarks.includes(jobId);
        if (isBookmarked) {
            setBookmarks(currentBookmarks => currentBookmarks.filter(id => id !== jobId));
        } else {
            setBookmarks(currentBookmarks => [...currentBookmarks, jobId]);
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

    useEffect(() => {
        // Fetch bookmarks from localStorage on client side
        const savedBookmarks = localStorage.getItem('bookmarks');
        if (savedBookmarks) {
            setBookmarks(JSON.parse(savedBookmarks));
        }
    }, []);

    useEffect(() => {
        // Update localStorage whenever bookmarks change
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    return (
        <JobContext.Provider value={{ ...state, getSingleJob, getJobs, handleBookmark, bookmarks }}>
            {children}
        </JobContext.Provider>
    )
}

export const useJobContext = () => {
    return useContext(JobContext);
}