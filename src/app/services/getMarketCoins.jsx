export const getMarketCoins = async () => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
  );

  if (response.ok) {
    const coins = await response.json();

    return coins.map((coin) => ({
      id: coin.id,
      name: coin.name,
      icon: coin.image,
      price: new Intl.NumberFormat('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(coin.current_price),
      delta: new Intl.NumberFormat('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(coin.price_change_percentage_24h),
    }));
  }

  return [];
};
