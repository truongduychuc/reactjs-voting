const err = {
  getErrorMessage(error) {
    const {message, error_code} = error;
    if (message) {
      return message;
    }
    return "Something went wrong";
  }
};