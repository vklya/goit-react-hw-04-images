import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ close, children }) {

    const closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === 'Escape') close();
    };
    
    useEffect(() => {
        document.addEventListener('keydown', closeModal);

        return () => document.addEventListener('keydown', closeModal);
    })


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