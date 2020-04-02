export const _general = {
  isNotEmptyString: value => {
    let _value = value;
    if (typeof value === 'number') {
      _value = value.toString();
    }
    const trimStr = _value.trim();
    return trimStr != null && _value !== '';
  }
};
