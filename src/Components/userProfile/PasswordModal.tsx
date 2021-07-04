/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './password.css';

export default function Password({ children, show, close }: Record<string, any>) {
  if (!show) return null;
  return (
    <>
      <div className='modall'>
        <div className='overlayy' onClick={close} />
        <div className='modalContent'>
          <FaTimes className='faTimes' onClick={close} />
          {children}
        </div>
      </div>
    </>
  );
}
