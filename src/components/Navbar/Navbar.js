'use client';

import Link from 'next/link';
import Button from '../Button/Button';
import { styled } from 'styled-components';

const Navbar = () => {
  return (
    <Container>
      <div className="navbar">
        <Link href="/" className="logo">EZHire</Link>
        <div className="links">
          <Link href="/">Home</Link>
          <Link href="/jobs">Jobs</Link>
          <Link href="/employers">Employers</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="buttons">
          <Link href="/login"><Button value="Login" /></Link>
          <Link href="/register"><Button value="Sign Up" /></Link>
        </div>
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
`;

export default Navbar