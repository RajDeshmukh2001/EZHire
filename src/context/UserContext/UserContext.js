'use client';

import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState();
    const [employerInfo, setEmployerInfo] = useState();

    const { data: session } = useSession();
    const isEmail = session?.user?.email;

    useEffect(() => {
        // Fetch user and employer info only if Email is available
        if (isEmail) {
            fetchData();
            fetchEmployer();
        }
    }, [isEmail]);

    // Fetch User's info
    const fetchData = async () => {
        const res = await fetch('/api/auth/userDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ email: isEmail }),
        });

        const { user } = await res.json();
        setUserInfo(user);
    };

    const fetchEmployer = async () => {
        const response = await fetch('/api/auth/employerDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: isEmail }),
        });

        const { employer } = await response.json();
        setEmployerInfo(employer);
    }

    return (
        <UserContext.Provider value={{ fetchData, fetchEmployer, userInfo, employerInfo }}>
            {children}
        </UserContext.Provider>
    )
}