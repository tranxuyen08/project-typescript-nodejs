import React from 'react';
import "./index.css";

const LoadingComponent: React.FC = () => {
  return (
    <div className='wrapper-loading'>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default LoadingComponent;

