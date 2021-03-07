export function debounce(callback, delay) {
  let task;
  return function (...args) {
    clearTimeout(task);
    task = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
