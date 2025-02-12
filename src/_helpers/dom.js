export const dom = {
    getWindowInnerWidth: () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    getWindowInnerHeight: () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    canUseDOM : !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )
};
