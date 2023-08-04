'use client';

import Link from 'next/link';
import Image from 'next/image';
import { styled } from 'styled-components';

const Footer = () => {
  return (
    <Container>
      <div className="footer">
        <div className="main">
          <div className="links">
            <Link href="/" className="logo">EZHire</Link>
            <p className="tagline">We always help our seekers find the best jobs and companies find the best candidates</p>
          </div>

          <div className="links">
            <h3 className="title">For Candidates</h3>
            <h4 className="link">Top Companies</h4>
            <h4 className="link">Marketing and Sales Jobs</h4>
            <h4 className="link">Software Engineering Jobs</h4>
            <h4 className="link">UX/UI and Graphic Design Jobs</h4>
          </div>

          <div className="links">
            <h3 className="title">For Recruiters</h3>
            <h4 className="link">Pricing</h4>
            <h4 className="link">Post Jobs</h4>
            <h4 className="link">Hire Talents</h4>
          </div>

          <div className="links">
            <h3 className="title">Company</h3>
            <h4 className="link">Blog</h4>
            <h4 className="link">Partners</h4>
            <h4 className="link">About Us</h4>
            <h4 className="link">Contact Us</h4>
          </div>

          <div className="links">
            <h3 className="title">Legal</h3>
            <h4 className="link">FAQs</h4>
            <h4 className="link">Terms</h4>
            <h4 className="link">Help Center</h4>
            <h4 className="link">Privacy Policy</h4>
          </div>
        </div>

        <div className="social">
          <p className="copyright">&copy; EZHire 2023 | All Rights Reserved</p>
          <div className="socialIcons">
            <Image src="/instagram.png" alt="instagram" width={23} height={23} className="icons" />
            <Image src="/twitter.png" alt="instagram" width={23} height={23} className="icons" />
            <Image src="/facebook.png" alt="instagram" width={23} height={23} className="icons" />
            <Image src="/linkedin.png" alt="instagram" width={23} height={23} className="icons" />
            <Image src="/telegram.png" alt="instagram" width={23} height={23} className="icons" />
          </div>
        </div>
      </div>
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 60px 20px 60px;
  background-color: ${({ theme }) => theme.mainColor};
  color: ${({ theme }) => theme.textColor};

  .footer {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .main {
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }

  .logo {
    font-size: 18px;
    font-weight: 600;
  }

  .logo:hover {
    color: #007cc7;
  }

  .tagline {
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 0.8px;
    line-height: 22px;
  }

  .links {
    max-width: 240px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .title {
    margin-bottom: 5px;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.textColor};
    text-decoration: underline;
  }

  .links .link {
    font-size: 14px;
    font-weight: 350;
    letter-spacing: 0.5px;
    display: flex;
    transition: 0.4s ease-in-out;
  }

  .links .link:hover {
    transform: translateX(5px);
    color: #007cc7;
    cursor: pointer;
  }

  .social {
    border-top: 0.5px solid #888;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .copyright {
    font-size: 14px;
    font-weight: 350;
    letter-spacing: 0.6px;
  }

  .socialIcons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .icons {
    filter: grayscale(100%);
    transition: 0.4s;
  }

  .icons:hover {
    transform: scale(1.2);
    filter: grayscale(0);
    cursor: pointer;
  }
`;

export default Footer;