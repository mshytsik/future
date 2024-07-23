import { useContext } from 'react';
import { ThemeContext } from '../../App';

import './Coin.scss';
import './CoinTheme.scss';

const Coin = ({ coin, className = '' }) => {
  const theme = useContext(ThemeContext);

  const deltaColors = {
    positive: theme === 'light' ? '#138618' : '#48BB4D',
    negative: theme === 'light' ? '#DB1B1A' : '#F25F5F',
  };

  return (
    <div className={`coin ${className}`}>
      <div className="coin__head">
        {coin.icon && (
          <div className="coin__icon">
            <img src={coin.icon} />
          </div>
        )}
        {coin.name && <p className="coin__name">{coin.name}</p>}
      </div>

      <div className="coin__body">
        {coin.price && (
          <p className="coin__price">${coin.price.toLocaleString('en-US')}</p>
        )}

        {coin.delta && (
          <p
            className="coin__delta"
            style={{
              color: deltaColors[coin.delta >= 0 ? 'positive' : 'negative'],
            }}
          >
            {coin.delta}%
          </p>
        )}
      </div>
    </div>
  );
};

export default Coin;
