import React from 'react';
import { Alert } from 'react-bootstrap';
import style from './Message.module.css';

const Message = ({ variant, children }: any) => {
  return (
    <Alert variant={variant} className={style.message}>
      {children}
    </Alert>
  );
};
Message.defaultProps = {
  variant: 'Info',
};
export default Message;
