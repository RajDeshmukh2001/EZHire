import Link from 'next/link';
import { toast } from 'react-toastify';
import styles from './menu.module.css';
import { ImUserTie } from "react-icons/im";
import { useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdBusinessCenter } from "react-icons/md";
import { signOut, useSession } from 'next-auth/react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { HiHome, HiPencilSquare } from "react-icons/hi2";
import { stagger, useAnimate, motion } from "framer-motion";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaSignInAlt, FaSignOutAlt, FaUserCheck } from "react-icons/fa";
import { useFilterContext } from '@/context/FilterContext/FilterContext';

const Path = (props) => (
    <path
        fill="transparent"
        strokeWidth="2"
        stroke="#000"
        strokeLinecap="round"
        {...props}
    />
);

const useMenuAnimation = (isOpen) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        const menuAnimations = isOpen ?
            [
                [
                    "nav",
                    { transform: "translateX(0%)", transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                    { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.5 }
                ],
                [
                    "li",
                    { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
                    { delay: stagger(0.08), at: "-0.1" }
                ]
            ]
            :
            [
                [
                    "nav",
                    { transform: "translateX(-100%)", transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                    { ease: [0.08, 0.65, 0.53, 0.96], delay: 0.5, at: "-0.1" }
                ],
                [
                    "li",
                    { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
                    { delay: stagger(0.05, { from: "last" }), at: "<" }
                ]
            ];

        animate([
            [
                "path.top",
                { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 1 2.5 L 20 2.5" },
                { at: "<" }
            ],
            [
                "path.middle",
                { opacity: isOpen ? 0 : 1 },
                { at: "<" }
            ],
            [
                "path.bottom",
                { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 12 16.346 L 20 16.346" },
                { at: "<" }
            ],
            ...menuAnimations
        ]);
    }, [isOpen]);

    return scope;
}

const ResponsiveMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDown, setIsDown] = useState(false);
    const scope = useMenuAnimation(isOpen);
    const { status: session } = useSession();
    const { clearFilters } = useFilterContext();

    return (
        <div className={styles.responsiveLinks} ref={scope}>
            <button onClick={() => setIsOpen(!isOpen)}>
                <svg width="20" height="14" viewBox="0 0 23 18">
                    <Path d="M 1 2.5 L 20 2.5" className="top" />
                    <Path d="M 6 9.423 L 20 9.423" opacity="1" className="middle" />
                    <Path d="M 12 16.346 L 20 16.346" className="bottom" />
                </svg>
            </button>
            <nav className={styles.menu}>
                <ul>
                    <li onClick={clearFilters}><Link href="/" onClick={() => setIsOpen(!isOpen)}><HiHome />Home</Link></li>
                    <li onClick={clearFilters}><Link href="/jobs" onClick={() => setIsOpen(!isOpen)}><MdBusinessCenter />Jobs</Link></li>
                    <li><Link href="/employers" onClick={() => setIsOpen(!isOpen)}><ImUserTie />Employers</Link></li>
                    <li><Link href="/about" onClick={() => setIsOpen(!isOpen)}><AiFillInfoCircle />About</Link></li>
                    {session === 'authenticated' ?
                        (
                            <>
                                <li className={styles.profile_menu}>
                                    <Link href="/profile" onClick={() => setIsOpen(!isOpen)}><FaUserCheck />Profile</Link>
                                    {isDown ? <TiArrowSortedUp onClick={() => setIsDown(!isDown)} /> : <TiArrowSortedDown onClick={() => setIsDown(!isDown)} />}
                                </li>
                                <motion.li className={styles.dropdown_menu}>
                                    <DropdownMenu isDown={isDown} setIsOpen={setIsOpen} isOpen={isOpen} />
                                </motion.li>
                                <li><button
                                    className={styles.logout_btn}
                                    onClick={() => {
                                        setIsOpen(!isOpen)
                                        signOut({ callbackUrl: '/login', redirect: false })
                                        toast.success("Logged out successfully")
                                    }}
                                >
                                    <FaSignOutAlt />Logout
                                </button></li>
                            </>
                        )
                        :
                        (
                            <>
                                <li><Link href="/login" onClick={() => setIsOpen(!isOpen)}><FaSignInAlt />Login</Link></li>
                                <li><Link href="/register" onClick={() => setIsOpen(!isOpen)}><HiPencilSquare />Register</Link></li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </div>
    )
}

export default ResponsiveMenu;