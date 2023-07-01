import { Component } from "react";
import css from "./Modal.module.css";
import PropTypes from "prop-types";

export class Modal extends Component {
  modalClose = (event) => {
    if (event.key === "Escape" || event.type === "click") {
      this.props.onClick("");
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.modalClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.modalClose, false);
  }

  render() {
    const { imageAddress } = this.props;

    return (
      <div className={css.Overlay} onClick={this.modalClose}>
        <div className={css.Modal}>
          <img src={imageAddress} alt="modal" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imageAddress: PropTypes.string,
  modalClose: PropTypes.func,
};
