export const envVar = {
  get(key) {
    return process.env['MIX_' + key] || process.env['REACT_APP_' + key];
  }
};
