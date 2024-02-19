"use client";

import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './delete.module.css';
import { MdDeleteForever } from 'react-icons/md';
import { signOut, useSession } from 'next-auth/react';
import ProfileMenu from '@/components/ProfileMenu/ProfileMenu';
import { AiFillWarning, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const DeleteProfile = () => {
  const [show, setShow] = useState("password");
  const [password, setPassword] = useState("");

  const session = useSession();

  const email = session?.data?.user?.email;

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/deleteUser', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password
        })
      });

      const alert = await res.text();
      if (res.status === 201) {
        toast.success(alert);
        signOut({ callbackUrl: '/register', redirect: false });
      } else {
        toast.error("Incorrect Password");
      }
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePassword = () => {
    show === "password" ? setShow("text") : setShow("password");
  };

  return (
    <>
      <ProfileMenu>
        <div className={styles.deleteProfile}>
          <div className={styles.warning}>
            <AiFillWarning className={styles.warningIcon} />
            <p><span>Warning!</span> Deleting your account is permanent and cannot be undone. All your data will be removed permanently.</p>
          </div>

          <form className={styles.form} onSubmit={handleDelete}>
            <p>To confirm your account deletion, please enter your <span>password</span>.</p>

            <div className={styles.password}>
              <input
                type={show}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
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

            <button className={styles.deleteBtn}>
              <MdDeleteForever className={styles.deleteIcon} />
              Delete
            </button>
          </form>
        </div>
      </ProfileMenu>
    </>
  )
}

export default DeleteProfile;