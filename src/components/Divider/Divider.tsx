import React from 'react';
import { iDividerProps } from './types';

const Divider: React.FC<iDividerProps> = ({ text }) => {
  return (
    <div className="divider">
      {text && <span className="divider-text">{text}</span>}
      <hr />
    </div>
  );
};

export default Divider;
