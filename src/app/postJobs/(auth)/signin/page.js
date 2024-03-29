"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import styles from "../styles/styles.module.css";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const SignIn = () => {
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

    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("employer-credentials", {
        email: inputs.email,
        password: inputs.password,
        redirect: false,
        callbackUrl: '/profile/editProfile',
      });

      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success("Login successfull");
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePassword = () => {
    show === "password" ? setShow("text") : setShow("password");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.details}>
          <h2>Why Choose EZHire Job Posting?</h2>

          <div className={styles.rows}>
            <Image src="/posting.png" alt="schedule" width={32} height={32} />
            <div className={styles.tagline}>
              <h4>2 Minutes to Post</h4>
              <p>
                Quick and easy to post job posting with highly optimised job
                posting form
              </p>
            </div>
          </div>

          <div className={styles.rows}>
            <Image
              src="/attraction.png"
              alt="schedule"
              width={32}
              height={32}
            />
            <div className={styles.tagline}>
              <h4>Attract Job Seekers</h4>
              <p>Reach to over millions of talented jobseekers</p>
            </div>
          </div>

          <div className={styles.rows}>
            <Image src="/schedule.png" alt="schedule" width={32} height={32} />
            <div className={styles.tagline}>
              <h4>30 days visibility</h4>
              <p>
                Get quality applies guaranteed with 30 days visibility of your
                job ads.
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className={styles.formContainer}>
          <h2 className={styles.title}>SIGN IN (Employer)</h2>

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
                <button className={styles.formBtn}>Sign In</button>
              </div>
            </div>
          </form>

          <p className={styles.text}>
            Don&apos;t have an Employer Account? <Link href="/postJobs/signup">REGISTER</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;