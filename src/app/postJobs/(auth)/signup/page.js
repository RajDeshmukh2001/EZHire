"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import styles from "../styles/styles.module.css";
import { useRouter } from "next/navigation";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const SignUp = () => {
  const session = useSession();
  const router = useRouter();

  const [show, setShow] = useState("password");
  const [inputs, setInputs] = useState({
    employerName: "",
    email: "",
    phone: "",
    password: "",
  });

  if (session.status === "authenticated") {
    router.push("/employers");
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(inputs.phone)) {
      toast.error("Invalid Phone Number");
      return;
    }

    if (inputs.password.length < 8) {
      toast.error("Password must contain atleast 8 characters");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employerName: inputs.employerName,
          email: inputs.email,
          phone: inputs.phone,
          password: inputs.password,
        }),
      });

      const alert = await res.text();
      if (res.status === 201) {
        await signIn("employer-credentials", {
          email: inputs.email,
          password: inputs.password,
          redirect: false,
        });
        toast.success(alert);
        router.push("/profile/editProfile");
        e.target.reset();
      } else {
        toast.error(alert);
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
        {/* Form Content */}
        <div className={styles.formContainer}>
          <h2 className={styles.title}>REGISTER (Employer)</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input}>
              <div className={styles.box}>
                <input
                  type="text"
                  name="employerName"
                  placeholder="Employer Name"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.box}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.box}>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={`${styles.box} ${styles.password}`}>
                <input
                  type={show}
                  name="password"
                  placeholder="Create Password"
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

              <div className={styles.box}>
                <button className={styles.formBtn}>Register</button>
              </div>
            </div>
          </form>

          <p className={styles.text}>
            Already have an Employer Account? <Link href="/postJobs/signin">SIGN IN</Link>
          </p>
        </div>

        <div className={styles.details}>
          <h2>Why Choose EZHire Job Posting?</h2>

          <div className={styles.rows}>
            <Image src="/posting.png" alt="schedule" width={32} height={32} />
            <div className={styles.tagline}>
              <h4>2 Minutes to Post</h4>
              <p>Quick and easy to post job posting with highly optimised job posting form</p>
            </div>
          </div>

          <div className={styles.rows}>
            <Image src="/attraction.png" alt="schedule" width={32} height={32} />
            <div className={styles.tagline}>
              <h4>Attract Job Seekers</h4>
              <p>Reach to over millions of talented jobseekers</p>
            </div>
          </div>

          <div className={styles.rows}>
            <Image src="/schedule.png" alt="schedule" width={32} height={32} />
            <div className={styles.tagline}>
              <h4>30 days visibility</h4>
              <p>Get quality applies guaranteed with 30 days visibility of your job ads.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
