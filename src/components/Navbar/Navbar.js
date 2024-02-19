'use client';

import Link from 'next/link';
import Button from '../Button/Button';
import styles from './navbar.module.css';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import UserImage from '../UserImage/UserImage';

const Navbar = () => {
  const session = useSession();
  const [menu, setMenu] = useState('show');
  const [links, setLinks] = useState('hide');

  const handleMenu = () => {
    setMenu('hide');
    setLinks('show');
  };

  const handleClose = () => {
    setMenu('show');
    setLinks('hide');
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navbar}>
        <Link href="/" className={styles.logo}>EZHire</Link>
        <div className={links === 'hide' ? styles.links : styles.responsiveLinks}>
          <RxCross2 className={styles.cross} onClick={handleClose} />
          <Link href="/" onClick={handleClose}>Home</Link>
          <Link href="/jobs" onClick={handleClose}>Jobs</Link>
          <Link href="/employers" onClick={handleClose}>Employers</Link>
          <Link href="/about" onClick={handleClose}>About</Link>
          {session.status === 'authenticated' ?
            (
              <>
                <Link href="/profile" onClick={handleClose}>Profile</Link>
                <button
                  className={styles.logoutBtn}
                  onClick={() => {
                    signOut({ callbackUrl: '/login', redirect: false })
                    handleClose()
                  }}
                >
                  Logout
                </button>
              </>
            )
            :
            (
              <>
                <Link href="/login" onClick={handleClose}>Login</Link>
                <Link href="/register" onClick={handleClose}>Sign Up</Link>
              </>
            )
          }
        </div>

        <div className={styles.buttons}>
          {
            session.status === 'unauthenticated' ?
              (
                <>
                  <Link href="/login"><Button value="Login" /></Link>
                  <Link href="/register"><Button value="Sign Up" /></Link>
                </>
              ) :
              (
                <>
                  <UserImage />
                  <button className={styles.logout} onClick={() => signOut({ callbackUrl: '/login', redirect: false })}>Logout</button>
                </>
              )
          }

        </div>

        <HiOutlineMenuAlt3 className={menu === 'show' ? styles.menu : styles.hide} onClick={handleMenu} />
      </div>
    </nav>
  )
};

export default Navbar;