import styles from './page.module.css'

const Loading = () => {
    return (
        <div className={styles.spinnerBox}>
            <div className={styles.spinner}></div>
        </div>
    )
};

export default Loading;