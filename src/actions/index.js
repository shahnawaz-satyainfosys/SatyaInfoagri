export const loginAction = (payload) => {
  return {
    type: 'LOGIN',
    payload
  };
};

export const resetPasswordAction = (payload) => {
  return {
  type: 'RESETPASSWORD',
  payload
  };
};

export const clientContactDetailsAction = (payload) => {
  return {
    type: 'CLIENTCONTACTDETAILSLIST',
    payload
  };
};