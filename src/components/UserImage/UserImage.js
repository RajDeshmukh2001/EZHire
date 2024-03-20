'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './user.module.css';
import { toast } from 'react-toastify';
import { HiUserCircle } from 'react-icons/hi';
import { signOut, useSession } from 'next-auth/react';
import { useContext, useState, useEffect } from 'react';
import { useAnimate, stagger, motion } from "framer-motion";
import { UserContext } from '../../context/UserContext/UserContext';

const staggerProfileItems = stagger(0.1, { startDelay: 0.15 })

const useProfile = (isOpen) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(
            "ul",
            { clipPath: isOpen ? "inset(0% 0% 0% 0% round 8px)" : "inset(10% 50% 90% 50% round 8px)" },
            { type: "spring", bounce: 0, duration: 0.5 }
        );

        animate(
            "li",
            isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 },
            { duration: 0.2, delay: isOpen ? staggerProfileItems : 0 }
        );
    }, [isOpen])

    return scope;
}

const UserImage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scope = useProfile(isOpen);
    const { userInfo, employerInfo } = useContext(UserContext);
    const { data: session } = useSession();
    const user = session?.user?.image;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (scope && !scope.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [scope]);

    return (
        <>
            <div className={styles.user} ref={scope}>
                {
                    user || userInfo?.image_url || employerInfo?.image_url ?
                        <motion.div className={styles.img_div} whileTap={{ scale: 0.90 }} onClick={() => setIsOpen(!isOpen)}>
                            <Image
                                src={user ? user : (userInfo ? userInfo?.image_url : employerInfo?.image_url)}
                                alt="user"
                                width={40}
                                height={40}
                                className={styles.userImg} />
                        </motion.div>
                        :
                        <motion.div whileTap={{ scale: 0.90 }} onClick={() => setIsOpen(!isOpen)}>
                            <HiUserCircle className={styles.faUser} />
                        </motion.div>
                }
                <ul
                    style={{
                        pointerEvents: isOpen ? "auto" : "none",
                        clipPath: "inset(10% 50% 90% 50% round 8px)",
                    }}
                >
                    <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/profile" onClick={() => setIsOpen(!isOpen)}>Profile</Link></motion.li>
                    {userInfo &&
                        <>
                            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/profile/applied" onClick={() => setIsOpen(!isOpen)}>Applied</Link></motion.li>
                            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/profile/resume" onClick={() => setIsOpen(!isOpen)}>Resume</Link></motion.li>
                        </>
                    }
                    {employerInfo &&
                        <>
                            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/profile/jobsPosted" onClick={() => setIsOpen(!isOpen)}>Jobs Posted</Link></motion.li>
                            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/profile/jobApplications" onClick={() => setIsOpen(!isOpen)}>Applications</Link></motion.li>
                        </>
                    }
                    <motion.li
                        whileHover={{ scaleX: 1.05 }}
                        onClick={() => {
                            setIsOpen(!isOpen)
                            signOut({ callbackUrl: '/login', redirect: false })
                            toast.success("Logged out successfully")
                        }}
                    >
                        Logout
                    </motion.li>
                </ul>{" "}
            </div>
        </>
    )
}

export default UserImage;