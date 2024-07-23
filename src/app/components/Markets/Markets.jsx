import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMarkets, fill } from '../../store/reducers/marketsReducer';
import { getMarketCoins } from '../../services/getMarketCoins';

import Coin from '../Coin/Coin';

import './Markets.scss';

const Markets = () => {
  const coins = useSelector(selectMarkets);

  const dispatch = useDispatch();

  const handleGetCoins = async () => {
    const coinsList = await getMarketCoins();
    dispatch(fill(coinsList));
  };

  useEffect(() => {
    if (!coins.length) {
      handleGetCoins();
    }
  }, []);

  return (
    <div className="markets hide-scroll">
      {coins.map((coin) => (
        <Coin key={coin.id} coin={coin} className="markets__item" />
      ))}
    </div>
  );
};

export default Markets;
