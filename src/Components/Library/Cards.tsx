/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import classes from './Library.module.css';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  style: Record<string, any>;
}

function Cards(props: Props): JSX.Element {
  const handleKeyDown = () => {
    if (props.onClick) props.onClick();
  };
  return (
    <div
      style={props.style}
      role='button'
      onClick={() => {
        if (props.onClick) props.onClick();
      }}
      onKeyDown={handleKeyDown}
      className={classes.card}
    >
      {props.children}
    </div>
  );
}

export default Cards;
