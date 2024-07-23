import { useEffect } from 'react';

function useOnResize(callback) {
  useEffect(() => {
    callback();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  });
}

export default useOnResize;
