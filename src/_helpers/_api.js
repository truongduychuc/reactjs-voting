export const _apiHelper = {
  regexUrl: new RegExp(/\/{2,}$/),
  regexParam: new RegExp(/^\/+/i),
  mapUrlWithParam(url, param) {
    const EMPTY_STR = '';
    const SLASH = '/';
    let _url = EMPTY_STR;
    if (url == null) {
      console.error('Url passed to api is null!');
      return;
    } else {
      if (!url.endsWith(SLASH)) {
        _url = url + SLASH;
      } else {
        // avoid repeating slash at the end of url
        if (this.regexUrl.test(url)) {
          _url = url.replace(this.regexUrl, SLASH);
        } else {
          _url = url;
        }
      }
    }
    let _param = EMPTY_STR;
    if (param == null) {
      console.error('param passed to api is null!');
      return;
    } else if (this.regexParam.test(param)) {
      _param = param.replace(this.regexParam, EMPTY_STR);
    } else {
      _param = param;
    }
    return _url + _param;
  }
};
