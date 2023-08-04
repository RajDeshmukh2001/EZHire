import Link from 'next/link';
import styles from './login.module.css';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { FcGoogle } from 'react-icons/fc'
import { GrFacebook } from 'react-icons/gr'

const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src="/login.png" alt="login" width={500} height={500} className={styles.img} />
            </div>

            <div className={styles.formContainer}>
                <h2 className={styles.title}>Login</h2>

                <div className={styles.buttons}>
                    <button className={styles.btn}><FcGoogle className={styles.icon} />Login with Google</button>
                    <button className={styles.btn}><GrFacebook className={styles.icon} />Login with Facebook</button>
                </div>

                <h3 className={styles.or}>Or</h3>

                <div className={styles.form}>
                    <div className={styles.input}>
                        <div className={styles.box}>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className={styles.box}>
                            <input type="password" placeholder="Password" />
                        </div>
                        <div>
                            <p className={styles.forgot}>Forgot Password?</p>
                        </div>
                        <div className={styles.box}>
                            <Button value="Login" />
                        </div>
                    </div>
                </div>

                <p className={styles.text}>Don't have an account? <Link href="/register">SIGN UP</Link></p>
            </div>
        </div>
    )
};

export default Login;