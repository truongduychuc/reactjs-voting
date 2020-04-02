export const errorService = {
  /**
   * @param error Error Object caught by axios
   * */
  transformErrorResponse: (error) => {
    const {response} = error;
    if (!response) {
      console.error('The error did not include response internally!');
      return {
        message: 'Something went wrong',
        statusCode: 0,
        error: 'UNKNOWN'
      };
    } else {
      const {data, status} = response;
      if (!data) {
        console.warn('The response error return no data!');
        return {
          message: 'Something went wrong',
          statusCode: status,
          error: data.error ? data.error : 'UNKNOWN'
        };
      } else {
        return {
          ...data,
          statusCode: status
        }
      }
    }
  },
  /**
   * @param validationError caught and transformed by transformErrorResponse
   * @param keyArr
   * */
  transformValidationError: (validationError, keyArr = []) => {
    const {validate} = validationError;
    if (!validate) {
      return {};
    }
    let obj = {};
    Object.keys(validate).forEach(key => {
      if (keyArr.includes(key) && validate[key] != null) {
        obj[key] = Array.isArray(validate[key]) ? validate[key][0] : validate[key];
      }
    });
    return obj;
  }
};
