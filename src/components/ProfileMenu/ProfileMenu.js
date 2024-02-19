"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import styles from "./profilemenu.module.css";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext/UserContext";

const ProfileMenu = ({ children }) => {
    const { userInfo, employerInfo } = useContext(UserContext);
    const pathname = usePathname();
    const session = useSession();
    const router = useRouter();

    if (session.status === "unauthenticated") {
        router.push('/login');
    }

    return (
        <div className={styles.container}>
            <div className={styles.profileMenu}>
                <div className={styles.profileHeader}>
                    <div className={styles.profileImage}>
                        {userInfo?.image_url || employerInfo?.image_url ?
                            <Image src={userInfo ? userInfo?.image_url : employerInfo?.image_url} alt="User" width={80} height={80} className={styles.profilePic} />
                            :
                            <FaUserAlt className={styles.user} />
                        }
                    </div>

                    <div className={styles.profileInfo}>
                        <h1>{userInfo ? userInfo?.fullname : employerInfo?.employerName}</h1>
                        {userInfo && <p>{userInfo?.designation}</p>}
                    </div>
                </div>

                <div className={styles.profileNav}>
                    <Link
                        href="/profile"
                        className={pathname === "/profile" ? styles.active : styles.links}
                    >
                        Profile
                    </Link>

                    {userInfo &&
                        <>
                            <Link
                                href="/profile/resume"
                                className={pathname === "/profile/resume" ? styles.active : styles.links}
                            >
                                Resume
                            </Link>

                            <Link
                                href="/profile/jobsApplied"
                                className={pathname === "/profile/jobsApplied" ? styles.active : styles.links}
                            >
                                Jobs Applied
                            </Link>

                            <Link
                                href="/profile/jobsBookmarked"
                                className={pathname === "/profile/jobsBookmarked" ? styles.active : styles.links}
                            >
                                Jobs Bookmarked
                            </Link>
                        </>
                    }

                    {employerInfo &&
                        <>
                            <Link
                                href="/profile/jobsPosted"
                                className={pathname === "/profile/jobsPosted" ? styles.active : styles.links}
                            >
                                Jobs Posted
                            </Link>

                            <Link
                                href="/profile/jobApplications"
                                className={pathname === "/profile/jobApplications" ? styles.active : styles.links}
                            >
                                Job Applications
                            </Link>

                            <Link
                                href="/profile/deleteProfile"
                                className={pathname === "/profile/deleteProfile" ? styles.active : styles.links}
                            >
                                Delete Profile
                            </Link>
                        </>
                    }
                </div>
            </div>
            
            <div className={styles.profileContent}>
                {children}
            </div>
        </div>
    );
};

export default ProfileMenu;
