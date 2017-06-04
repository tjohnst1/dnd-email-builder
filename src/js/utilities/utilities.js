export function adjustPx(val, step) {
  const num = Number(val.match(/\d+/)[0]);
  if (step !== 0) {
    return `${num + step}px`;
  }
  return val;
}
