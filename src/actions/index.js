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

export const contactDetailChangedAction = (payload) => {
  return {
    type: 'CONTACTDETAILCHANGED',
    payload
  };
};

export const transactionDetailChangedAction = (payload) => {
  return {
    type: 'TRANSACTIONDETAILCHANGED',
    payload
  };
};

export const companyDetailsAction = (payload) => {
  return {
    type: 'COMPANYDETAILS',
    payload
  };
};

export const clientDataAction = (payload) => {
  return {
    type: 'CLIENTDATA',
    payload
  };
};

export const commonContactDetailsAction = (payload) => {
  return {
    type: 'COMMONCONTACTDETAILS',
    payload
  };
};

export const commonContactDetailsListAction = (payload) => {
  return {
    type: 'COMMONCONTACTDETAILSLIST',
    payload
  };
};

export const clientContactListAction = (payload) => {
  return {
    type: 'CLIENTCONTACTLIST',
    payload
  };
};

export const companyDetailsErrorAction = (payload) => {
  return {
    type: 'COMPANYDETAILSERROR',
    payload
  };
};

export const commonContactDetailChangedAction = (payload) => {
  return {
    type: 'COMMONCONTACTDETAILCHANGED',
    payload
  };
};
