import { useRef, useEffect } from 'react'

function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<any>();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  })
  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback?.current !== 'undefined') {
        savedCallback?.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay])
}

export default useInterval;