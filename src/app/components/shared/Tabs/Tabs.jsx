import { useState, useRef, useContext } from 'react';
import { ThemeContext } from '../../../App';
import { useOnResize } from '../../../hooks';

import chevron from '../../../assets/img/icons/chevron-d.svg';
import chevronDark from '../../../assets/img/icons/theme/chevron-d.svg';

import './Tabs.scss';
import './TabsTheme.scss';

const Tabs = ({
  tabs,
  activeTab,
  setActive = null,
  callback = null,
  className = '',
}) => {
  const theme = useContext(ThemeContext);

  const [showArrows, setShowArrows] = useState({ left: false, right: false });

  const tabsRef = useRef(null);
  const trackRef = useRef(null);

  const handleShowArrows = () => {
    setShowArrows({
      left: trackRef.current.scrollLeft > 0,
      right:
        trackRef.current.scrollWidth >
        tabsRef.current.offsetWidth + trackRef.current.scrollLeft + 10,
    });
  };

  useOnResize(handleShowArrows);

  const handleClick = (value) => {
    setActive && setActive(value);
    callback?.();
  };

  return (
    <div className={`tabs ${className}`} ref={tabsRef}>
      <div
        className={`tabs__arrow tabs__arrow--left ${
          showArrows.left ? 'is-visible' : ''
        }`}
      >
        <img src={theme === 'light' ? chevron : chevronDark} />
      </div>

      <div
        className="tabs__track hide-scroll"
        ref={trackRef}
        onScroll={handleShowArrows}
      >
        {tabs.map((tab) => (
          <p
            key={tab.value}
            onClick={() => handleClick(tab.value)}
            className={`tabs__item ${
              tab.value === activeTab ? 'is-active' : ''
            }`}
          >
            {tab.name}
            {'count' in tab && <span>{tab.count}</span>}
          </p>
        ))}
      </div>

      <div
        className={`tabs__arrow tabs__arrow--right ${
          showArrows.right ? 'is-visible' : ''
        }`}
      >
        <img src={theme === 'light' ? chevron : chevronDark} />
      </div>
    </div>
  );
};

export default Tabs;
