export const parseErrors = (err) => {
  //err here is the catch(err) variable that has bee used in the register.jsx

  //check if error is a validation error
  if (err?.response?.data?.error?.name === "ValidationError") {
    return {
      message: err.response.data.error.message,
      details: err.response.data.error.details.errors,
    };
  }

  //check if it is a network wrror
  if (err?.message === "Network Error") {
    return {
      message: "unable to connect to the server endpoint provider",
      details: [],
    };
  }

  //check for forbidden error
  if (err?.response?.status === 403) {
    return {
      message: "Your role does not have access to this resource",
      details: [],
    };
  }
  //could we have used else if or else here
  return {
    message: "An unexpected error occured. Contact support",
    details: [],
  };
};
