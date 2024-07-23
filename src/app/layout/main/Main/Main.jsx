import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import MainNav from '../MainNav/MainNav';

import './Main.scss';

const Main = ({ body, navBar = null, className = '' }) => {
  const location = useLocation();

  const mainBodyRef = useRef(null);

  useEffect(() => {
    mainBodyRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return (
    <main className={`main container ${className}`}>
      {navBar ?? <MainNav />}

      <div className="main__body main-body" ref={mainBodyRef}>
        {body}
      </div>
    </main>
  );
};

export default Main;
