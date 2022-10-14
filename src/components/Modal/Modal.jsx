import { PropTypes } from 'prop-types'; 
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({onClose, children}) {

  useEffect(() => {
    const handleKeyDown = evt =>{
      if (evt.code === 'Escape'){
        onClose();
      };
    };

      window.addEventListener('keydown', handleKeyDown);

    return() =>{
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose] );

   const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };
  
    return createPortal(
      <div onClick={handleBackdropClick} className={css.Overlay}>
        <div className={css.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }

Modal.propTypes = { 
	onClose: PropTypes.func.isRequired,
}
