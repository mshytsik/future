export const socialLogin = async (social) => {
  const USER_ID = 2;

  console.log(`Social login: ${social}`);

  const response = await new Promise((resolve) =>
    setTimeout(() => resolve(USER_ID), 1000)
  );

  return response;
};

export const socialRegister = async (social) => {
  const USER = {
    username: 'Social Name',
    email: 'social_register@email.com',
    password: '1234567890',
  };

  console.log(`Social register: ${social}`);

  const response = await new Promise((resolve) =>
    setTimeout(() => resolve(USER), 1000)
  );

  return response;
};
