"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./login.module.css";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { BsGithub, BsCheck2 } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Login = () => {
    const session = useSession();

    const [show, setShow] = useState("password");
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();
    if (session.status === "authenticated") {
        router.push("/profile/editProfile");
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email: inputs.email,
                password: inputs.password,
                redirect: false,
                callbackUrl: '/profile/editProfile',
            });

            if (res.error) {
                toast.error("Something went wrong. Try again.")
            } else {
                toast.success("Login successfull");
                e.target.reset();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlePassword = () => {
        show === "password" ? setShow("text") : setShow("password");
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <Image
                        src="/login.png"
                        alt="login"
                        width={280}
                        height={250}
                        className={styles.img}
                    />
                    <div className={styles.details}>
                        <h3>Find a job & grow your career on EZHire</h3>
                        <p>
                            <BsCheck2 />
                            One click apply.
                        </p>
                        <p>
                            <BsCheck2 />
                            Get relevant job recommendations.
                        </p>
                        <p>
                            <BsCheck2 />
                            Showcase profile to top companies and consultants.
                        </p>
                    </div>
                </div>

                <div className={styles.formContainer}>
                    <h2 className={styles.title}>Login</h2>

                    <div className={styles.buttons}>
                        <button
                            className={styles.btn}
                            onClick={() => signIn("google", { callbackUrl: "/" })}
                        >
                            <FcGoogle className={styles.icon} />
                            Login with Google
                        </button>

                        <button
                            className={styles.btn}
                            onClick={() => signIn("github", { callbackUrl: "/" })}
                        >
                            <BsGithub className={styles.icon} />
                            Login with GitHub
                        </button>
                    </div>

                    <h3 className={styles.or}>Or</h3>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.input}>
                            <div className={styles.box}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={`${styles.box} ${styles.password}`}>
                                <input
                                    type={show}
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="off"
                                    onChange={handleChange}
                                    className={styles.inputPassword}
                                    required
                                />
                                {show === "password" ? (
                                    <AiOutlineEyeInvisible
                                        className={styles.blindEye}
                                        onClick={handlePassword}
                                    />
                                ) : (
                                    <AiOutlineEye
                                        className={styles.eye}
                                        onClick={handlePassword}
                                    />
                                )}
                            </div>

                            <div>
                                <p className={styles.forgot}>Forgot Password?</p>
                            </div>

                            <div className={styles.box}>
                                <button className={styles.formBtn}>Login</button>
                            </div>
                        </div>
                    </form>

                    <p className={styles.text}>
                        Don&apos;t have an account? <Link href="/register">REGISTER</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;