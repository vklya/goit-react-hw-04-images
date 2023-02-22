import { Component } from "react";
import { createPortal } from "react-dom";
import css from './modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMount() {
        document.addEventListener('keydown', this.closeModal);
    }

    componentWillUnmount() {
        document.addEventListener('keydown', this.closeModal);
    }

    closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === 'Escape') {
            this.props.close();
        }
    }

    render() {
        const { children } = this.props;
        const { closeModal } = this;

        return (
            createPortal(
                <div className={css.backdrop} onClick={closeModal}>
                    <div className={css.modal}>
                        {children}
                    </div>
                </div>,
                modalRoot
        ));
    }
}