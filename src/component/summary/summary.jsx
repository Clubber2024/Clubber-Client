import styles from './summary.module.css';
function Summary() {
    return (
        <div className={styles.wrap}>
            <img src="/summary/summary.png" alt="summary" className={styles.imgStyle} />
        </div>
    );
}
export default Summary;
