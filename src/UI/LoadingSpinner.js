import { Fragment } from "react";
import ReactDOM from "react-dom";
import Styles from './LoadingSpinner.module.css';

const SpinnerOverlay = () => {
  return (
    <div className={Styles.spinnerContainer}>
      <div className={Styles.loadingSpinner}>
      </div>
    </div>
  );
}

const spinnerEl = document.getElementById("spinner");

const LoadingSpinner = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <SpinnerOverlay>{props.children}</SpinnerOverlay>,
        spinnerEl
      )}
    </Fragment>
  );
};

export default LoadingSpinner;