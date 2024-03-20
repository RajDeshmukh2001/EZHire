'use client';

import Link from 'next/link';
import Button from '../Button/Button';
import { motion } from 'framer-motion'; 
import styles from './navbar.module.css';
import UserImage from '../UserImage/UserImage';
import { useSession, signOut } from 'next-auth/react';
import ResponsiveMenu from '../ReponsiveMenu/ResponsiveMenu';
import { useFilterContext } from '@/context/FilterContext/FilterContext';

const Navbar = () => {
  const { clearFilters } = useFilterContext();
  const session = useSession();

  return (
    <nav className={styles.nav}>
      <div className={styles.navbar}>
        <Link href="/" className={styles.logo}>EZHire</Link>
        <div className={styles.links}>
          <Link href="/" onClick={clearFilters}>Home</Link>
          <Link href="/jobs" onClick={clearFilters}>Jobs</Link>
          <Link href="/employers">Employers</Link>
          <Link href="/about">About</Link>
        </div>
        <div className={styles.profile}>
          {session.status === 'unauthenticated' ?
            <>
              <Link href="/login"><Button value="Login" /></Link>
              <Link href="/register"><Button value="Register" /></Link>
            </>
            :
            <UserImage />
          }
        </div>

        <ResponsiveMenu />
      </div>
    </nav>
  )
};

export default Navbar;