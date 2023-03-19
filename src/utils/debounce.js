export default function debounce(func, delay) {
  // your code here
  let prevTimeoutId = -1;
  return function inner(...args) {
    const context = this;
    clearTimeout(prevTimeoutId);
    prevTimeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
