'use client';

import Link from 'next/link';
import Button from '../Button/Button';
import { styled } from 'styled-components';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';

const Navbar = () => {

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
    <Container>
      <div className="navbar">
        <Link href="/" className="logo">EZHire</Link>
        <div className={links === 'hide' ? 'links' : 'responsiveLinks'}>
          <RxCross2 className='cross' onClick={handleClose} />
          <Link href="/" onClick={handleClose}>Home</Link>
          <Link href="/jobs" onClick={handleClose}>Jobs</Link>
          <Link href="/employers" onClick={handleClose}>Employers</Link>
          <Link href="/about" onClick={handleClose}>About</Link>
        </div>

        <div className="buttons">
          <Link href="/login"><Button value="Login" /></Link>
          <Link href="/register"><Button value="Sign Up" /></Link>
        </div>

        <HiOutlineMenuAlt3 className={menu === 'show' ? 'menu' : 'hide'} onClick={handleMenu} />
      </div>
    </Container>
  )
};

const Container = styled.nav`
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  .navbar {
    position: fixed;
    top: 0;
    width: 83%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 0 25px;
    z-index: 1000;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  }

  .logo {
    font-size: 24px;
    font-weight: bolder;
    color: ${({ theme }) => theme.mainColor};
    letter-spacing: 1px;
    transition: 0.5s ease-in-out;
  }

  .logo:hover {
    animation: logo 1.2s;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .links a {
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 10px 15px;
    overflow: hidden;
    color: ${({ theme }) => theme.mainColor};
    transition: 0.5s;
    position: relative;
  }

  .links a::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 0.5rem;
    background-color: ${({ theme }) => theme.mainColor};
    left: -100%;
  }

  .links a:hover::before {
    animation: nav .4s linear forwards;
  }

  .links a:hover {
    color: #fff;
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .menu, .cross {
    display: none;
  }


  @keyframes nav {
    0% {
      left: -100%;
      height: 0.5rem;
    }
    50% {
      left: 0;
      height: 0.5rem;
    }
    100% {
      left: 0;
      height: 100%;
      z-index: -1;
    }
  }

  @keyframes logo {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotateX(360deg);
    }
  }

  /* CSS for Tablet/IPad */
  @media screen and (max-width: 770px) {
    .navbar {
      width: 88%;
      padding: 0 20px;
    }

    .logo {
      font-size: 20px;
    }

    .links {
      gap: 2px;
    }

    .links a {
      font-size: 14px;
      padding: 6px 12px;
    }

    .buttons {
      gap: 15px;
    }
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    height: 100px;

    .navbar {
      width: 86%;
      height: 70px;
      padding: 0 16px;
    }

    .logo {
      font-size: 18px;
    }

    .responsiveLinks {
      position: absolute;
      top: 0;
      left: -35px;
      width: 120%;
      height: 100vh;
      padding: 0 45px;
      padding-bottom: 60%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      gap: 10px;
      animation: navbar 1.5s;
    }

    .links {
      display: none;
    }

    .responsiveLinks a {
      font-size: 20px;
    }

    .links a::before {
      display: none;
    }

    .responsiveLinks a:hover {
      color: ${({ theme }) => theme.mainColor};
    }

    .buttons {
      gap: 15px;
    }

    .menu {
      display: flex;
      font-size: 20px;
    }
    
    .cross {
      display: flex;
      font-size: 20px;
      align-self: flex-end;
    }

    @keyframes navbar {
      from {
        transform: translateX(-120%);
      }
    }
  }
`;

export default Navbar;