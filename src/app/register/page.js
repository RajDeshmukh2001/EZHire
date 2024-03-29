"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import styles from "../login/login.module.css";
import { BsGithub, BsCheck2 } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Register = () => {
  const session = useSession();
  const router = useRouter();

  const [show, setShow] = useState("password");
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  if (session.status === "authenticated") {
    redirect("/");
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.password.length < 8) {
      toast.error("Password must contain atleast 8 characters");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: inputs.fullname,
          email: inputs.email,
          password: inputs.password,
        }),
      });

      const alert = await res.text();
      if (res.status === 201) {
        await signIn("credentials", {
          email: inputs.email,
          password: inputs.password,
          redirect: false,
        });
        toast.success(alert);
        router.push("/profile/editProfile");
      } else {
        toast.error(alert);
      }
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePassword = () => {
    show === "password" ? setShow("text") : setShow("password");
  };

  return (
    <>
      <div className={`${styles.container} ${styles.signUpContainer}`}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Register</h2>

          <div className={styles.buttons}>
            <button
              className={styles.btn}
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <FcGoogle className={styles.icon} />
              Google
            </button>

            <button
              className={styles.btn}
              onClick={() => signIn("github", { callbackUrl: "/" })}
            >
              <BsGithub className={styles.icon} />
              GitHub
            </button>
          </div>

          <h3 className={styles.or}>Or</h3>

          <form
            className={`${styles.form} ${styles.signUp}`}
            onSubmit={handleSubmit}
          >
            <div className={styles.input}>
              <div className={styles.box}>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  onChange={handleChange}
                  autoComplete="on"
                  required
                />
              </div>

              <div className={styles.box}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className={styles.box}>
                <div className={styles.password}>
                  <input
                    type={show}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    autoComplete="off"
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
              </div>

              <div className={styles.box}>
                <button className={styles.formBtn}>Register</button>
              </div>
            </div>
          </form>

          <p className={`${styles.text} ${styles.text2}`}>
            Already have an account? <Link href="/login">LOGIN</Link>
          </p>
        </div>

        <div className={`${styles.imgContainer} ${styles.detailsBox}`}>
          <Image
            src="/signin.png"
            alt="signup"
            width={250}
            height={200}
            className={styles.img}
          />
          <div className={styles.details}>
            <h3>New to EZHire?</h3>
            <p>
              <BsCheck2 />
              Build your profile and let recruiters find you.
            </p>
            <p>
              <BsCheck2 />
              Get job postings delivered right to your email.
            </p>
            <p>
              <BsCheck2 />
              Find a job and grow your career.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
