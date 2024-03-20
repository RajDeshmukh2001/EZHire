import Link from "next/link";
import { useContext } from "react";
import styles from "./dropdown.module.css";
import { IoBookmark } from "react-icons/io5";
import { FaUserEdit, FaUsers  } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { MdDelete, MdBusinessCenter } from "react-icons/md";
import { UserContext } from "@/context/UserContext/UserContext";
import { BsFileEarmarkTextFill, BsFillClipboard2CheckFill } from "react-icons/bs";

const DropdownMenu = ({ isDown, setIsOpen, isOpen }) => {
    const { userInfo, employerInfo } = useContext(UserContext);

    const showDropdown = {
        show: {
            transform: "translateX(0%)",
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.2,
                ease: [0.08, 0.65, 0.53, 0.96],
                duration: 0.5,
            },
        },

        hidden: {
            transform: "translateX(-100%)",
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
                ease: [0.08, 0.65, 0.53, 0.96],
                delay: 0.5,
                at: "-0.1",
            },
        },
    };

    const showDropdownList = (baseDelay = 0) => ({
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                x: { stiffness: 1000, velocity: -100 },
                duration: 0.1,
                delay: baseDelay,
            },
        },

        hidden: {
            x: -50,
            opacity: 0,
            transition: { x: { stiffness: 1000 }, staggerDirection: -1, delay: 0.05, at: "-0.1" },
        },
    });

    return (
        <AnimatePresence>
            {isDown && (
                <motion.ul
                    className={styles.dropdown_list}
                    variants={showDropdown}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                >
                    {userInfo && (
                        <>
                            <motion.li
                                onClick={() => setIsOpen(!isOpen)}
                                variants={showDropdownList(0.2)}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <Link href="/profile/resume">
                                    <BsFileEarmarkTextFill />
                                    Resume
                                </Link>
                            </motion.li>
                            <motion.li
                                onClick={() => setIsOpen(!isOpen)}
                                variants={showDropdownList(0.4)}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <Link href="/profile/applied">
                                    <BsFillClipboard2CheckFill />
                                    Jobs Applied
                                </Link>
                            </motion.li>
                            <motion.li
                                onClick={() => setIsOpen(!isOpen)}
                                variants={showDropdownList(0.6)}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <Link href="/profile/bookmarkedJobs">
                                    <IoBookmark />
                                    Bookmarked
                                </Link>
                            </motion.li>
                            <motion.li
                                onClick={() => setIsOpen(!isOpen)}
                                variants={showDropdownList(0.8)}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <Link href="/profile/editProfile">
                                    <FaUserEdit />
                                    Update Profile
                                </Link>
                            </motion.li>
                        </>
                    )}

                    {employerInfo && (
                        <>
                            <motion.li
                                onClick={() => setIsOpen(!isOpen)}
                                variants={showDropdownList(0.2)}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <Link href="/profile/jobsPosted">
                                    <MdBusinessCenter />
                                    Jobs Posted
                                </Link>
                            </motion.li>
                            <motion.li
                                onClick={() => setIsOpen(!isOpen)}
                                variants={showDropdownList(0.4)}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <Link href="/profile/jobApplications">
                                    <FaUsers />
                                    Applications
                                </Link>
                            </motion.li>
                            <motion.li
                                onClick={() => setIsOpen(!isOpen)}
                                variants={showDropdownList(0.6)}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <Link href="/profile/editProfile">
                                    <FaUserEdit />
                                    Update Profile
                                </Link>
                            </motion.li>
                            <motion.li
                                onClick={() => setIsOpen(!isOpen)}
                                variants={showDropdownList(0.8)}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <Link href="/profile/deleteProfile">
                                    <MdDelete />
                                    Delete Profile
                                </Link>
                            </motion.li>
                        </>
                    )}
                </motion.ul>
            )}
        </AnimatePresence>
    );
};

export default DropdownMenu;
