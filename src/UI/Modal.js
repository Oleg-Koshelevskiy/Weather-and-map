import { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const ModalOverlay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
};

const portalEl = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalEl
      )}
    </Fragment>
  );
};

export default Modal;
