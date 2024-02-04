"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./myProfile.module.css";
import { FaUserAlt } from "react-icons/fa";
import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext/UserContext";
import { useSession } from "next-auth/react";

const MyProfile = ({ children }) => {
    const { userInfo, employerInfo } = useContext(UserContext);
    const session = useSession();
    const pathname = usePathname ();
    const router = useRouter();

    if (session.status === 'unauthenticated') {
        router.push('/login');
    }

    return (
        <div className={styles.container}>
            <div className={styles.profileContainer}>
                <div className={styles.profileHeader}>
                    <div className={styles.profileImage}>
                        {userInfo?.image_url || employerInfo?.image_url ? 
                            <Image src={userInfo ? userInfo?.image_url : employerInfo?.image_url} alt="User" width={120} height={140} className={styles.profilePic}/>
                            :
                            <FaUserAlt className={styles.user} />
                        }
                    </div>

                    <div className={styles.profileInfo}>
                        <h1>{userInfo ? userInfo?.fullname : employerInfo?.employerName}</h1>
                        {userInfo && <p>{userInfo?.designation}</p>}
                        {employerInfo && <p>{employerInfo?.phone} | {employerInfo?.email}</p>}
                    </div>
                </div>

                <div className={styles.profileBody}>
                    <div className={styles.profileNav}>
                        {userInfo && 
                            <Link
                                href="/profile"
                                className={pathname === "/profile" ? styles.active : styles.links}
                            >
                                Profile
                            </Link>
                        }

                        {userInfo && 
                            <Link
                                href="/profile/resume"
                                className={pathname === "/profile/resume" ? styles.active : styles.links}
                            >
                                Resume
                            </Link>}

                        {
                            employerInfo ? 
                            <Link
                                href="/profile/jobsPosted"
                                className={pathname === "/profile/jobsPosted" ? styles.active : styles.links}
                            >
                                Jobs Posted
                            </Link>
                            :
                            <Link
                                href="/profile/jobsApplied"
                                className={pathname === "/profile/jobsApplied" ? styles.active : styles.links}
                            >
                                Jobs Applied
                            </Link>
                        }

                        {
                            employerInfo ? 
                            <Link
                                href="/profile/jobApplications"
                                className={pathname === "/profile/jobApplications" ? styles.active : styles.links}
                            >
                                Job Applications
                            </Link>
                            :
                            <Link
                                href="/profile/jobsBookmarked"
                                className={pathname === "/profile/jobsBookmarked" ? styles.active : styles.links}
                            >
                                Jobs Bookmarked
                            </Link>
                        }

                        <Link
                            href="/profile/deleteProfile"
                            className={pathname === "/profile/deleteProfile" ? styles.active : styles.links}
                        >
                            Delete Profile
                        </Link>
                    </div>

                    <div className={styles.profileContent}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
