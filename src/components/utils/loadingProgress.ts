export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  const clamp = (v: number) => Math.max(0, Math.min(100, v));

  // Fast, deterministic-ish progress so the loader never feels stuck.
  // It ramps to 95 quickly and then waits for `loaded()` to finish.
  let interval = setInterval(() => {
    if (percent < 60) percent = clamp(percent + 4);
    else if (percent < 80) percent = clamp(percent + 3);
    else if (percent < 90) percent = clamp(percent + 2);
    else if (percent < 95) percent = clamp(percent + 1);
    setLoading(percent);
  }, 70);

  function clear() {
    clearInterval(interval);
    setLoading(50);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};

