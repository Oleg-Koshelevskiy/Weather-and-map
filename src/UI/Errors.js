import styles from "./Errors.module.css";

const Errors = (props) => {
  return <span className={styles.error}>{props.message}</span>;
};
export default Errors;
