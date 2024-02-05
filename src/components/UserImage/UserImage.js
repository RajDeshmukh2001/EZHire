'use client';

import { HiUserCircle } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './user.module.css';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import Link from 'next/link';

const UserImage = () => {
    const { userInfo, employerInfo } = useContext(UserContext);
    const session = useSession();
    const user = session?.data?.user?.image;

    return (
        <>
            <div className={styles.user}>
                {
                    user || userInfo?.image_url || employerInfo?.image_url ?
                        <Link href="/profile">
                            <Image 
                                src={user ? user : (userInfo ? userInfo?.image_url : employerInfo?.image_url)} 
                                alt="user" 
                                width={40} 
                                height={40} 
                                className={styles.userImg} />
                        </Link> 
                        :
                        <Link href="/profile">
                            <HiUserCircle className={styles.faUser} />
                        </Link>
                }
                <p className={styles.name}>{userInfo?.fullname || employerInfo?.employerName}</p>
            </div>
        </>
    )
}

export default UserImage;