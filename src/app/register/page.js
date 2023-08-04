import Link from 'next/link';
import styles from '../login/login.module.css';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook } from 'react-icons/gr';


const Register = () => {
  return (
    <div className={`${styles.container} ${styles.signUpContainer}`}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Sign Up</h2>

        <div className={styles.buttons}>
          <button className={styles.btn}><FcGoogle className={styles.icon} />Sign up with Google</button>
          <button className={styles.btn}><GrFacebook className={styles.icon} />Sign up with Facebook</button>
        </div>

        <h3 className={styles.or}>Or</h3>

        <div className={`${styles.form} ${styles.signUp}`}>
          <div className={styles.input}>
            <div className={styles.box}>
              <input type="text" placeholder="Full Name" />
            </div>
            <div className={styles.box}>
              <input type="email" placeholder="Email" />
            </div>
            <div className={styles.box}>
              <input type="password" placeholder="Password" />
            </div>
            <div className={styles.box}>
              <Button value="Sign Up" />
            </div>
          </div>
        </div>

        <p className={`${styles.text} ${styles.text2}`}>Already have an account? <Link href="/login">LOGIN</Link></p>
      </div>

      <div className={styles.imgContainer}>
        <Image src="/signin.png" alt="signup" width={500} height={400} className={styles.img} />
      </div>
    </div>
  )
}

export default Register