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

export const updateClientContactDetailsAction = (payload) => {
  return {
    type: 'UPDATECLIENTCONTACTDETAILS',
    payload
  };
};

export const transactionDetailsAction = (payload) => {
  return {
    type: 'TRANSACTIONLIST',
    payload
  };
};

export const clientDetailsAction = (payload) => {
  return {
    type: 'CLIENTDETAILS',
    payload
  };
};

export const clientDetailsErrorAction = (payload) => {
  return {
    type: 'CLIENTDETAILSERROR',
    payload
  };
};