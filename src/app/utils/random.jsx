export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const randomizeArray = (array) => {
  return array.sort(() => 0.5 - Math.random());
};

export const getRandomColorName = () => {
  const COLORS = [
    'blue-gem',
    'green-pea',
    'meteor',
    'honey-flower',
    'shiraz',
    'martinique',
  ];

  return COLORS[getRandomInt(0, COLORS.length - 1)];
};
