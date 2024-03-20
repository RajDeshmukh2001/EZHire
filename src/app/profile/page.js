'use client';

import Link from 'next/link';
import { useContext } from 'react';
import styles from "./profile.module.css";
import Button from '@/components/Button/Button';
import ProfileMenu from '@/components/ProfileMenu/ProfileMenu';
import { UserContext } from '@/context/UserContext/UserContext';

const Profile = () => {
    const { userInfo, employerInfo } = useContext(UserContext);

    return (
        <ProfileMenu>
            <div className={styles.profile_container}>
                <div className={styles.emailLocation}>
                    <div className={styles.content}>
                        <p>Email: </p>
                        <h4>{userInfo ? userInfo?.email : employerInfo?.email}</h4>
                    </div>
                    <div className={styles.content}>
                        <p>Location: </p>
                        <h4>{userInfo ? userInfo?.location : employerInfo?.location}</h4>
                    </div>
                    {employerInfo &&
                        <div className={styles.content}>
                            <p>Website: </p>
                            {employerInfo?.link && 
                                <Link 
                                    href={employerInfo?.link} 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    style={{ color: "#049ee6" }}
                                >
                                    {employerInfo?.link}    
                                </Link>
                            }
                        </div>
                    }
                </div>

                {userInfo &&
                    <div className={styles.skills_container}>
                        <div className={styles.skills}>
                            <p className={styles.heading}>Skills: </p>
                            <div className={styles.skill}>
                                {userInfo?.skills?.split(', ').map((skill, index) => (
                                    <p key={index}>{skill}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                }

                <div className={styles.about_container}>
                    <span>About</span>
                    <p className={styles.about}>{userInfo ? userInfo?.about : employerInfo?.about}</p>
                </div>

                <div className={styles.buttons}>
                    {userInfo &&
                        <Link href="/profile/deleteProfile"><Button value="Delete Profile" /></Link>
                    }
                    <Link href="/profile/editProfile"><Button value="Update Profile" /></Link>
                </div>
            </div>
        </ ProfileMenu>
    )
}

export default Profile;