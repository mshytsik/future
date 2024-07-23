export const updateStorageData = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getStorageData = (name) => {
  const values = localStorage.getItem(name);
  return JSON.parse(values);
};

export const getStorageUsers = () => getStorageData('users');
export const getStorageArticles = () => getStorageData('articles');
