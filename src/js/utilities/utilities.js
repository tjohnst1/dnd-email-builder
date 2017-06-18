import { isMatch } from 'lodash';

export function adjustPx(val, step) {
  const num = Number(val.match(/\d+/)[0]);
  if (step !== 0) {
    return `${num + step}px`;
  }
  return val;
}

export function sameFourBorderValues(borderObj) {
  return isMatch(borderObj.bottom, borderObj.top) && isMatch(borderObj.right, borderObj.left) && isMatch(borderObj.right, borderObj.top);
}
