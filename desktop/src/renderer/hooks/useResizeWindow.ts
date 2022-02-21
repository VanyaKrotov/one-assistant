/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from 'lodash';
import { useRef, useState, useEffect } from 'react';

type Sizes = [number, number];

interface UseResizeWindow {
  sizes: Sizes;
  prev: Sizes;
}

const useResizeWindow = (): UseResizeWindow => {
  const getSizes = (): Sizes => [window.innerWidth, window.innerHeight];

  const prevSizes = useRef<Sizes>(getSizes());
  const [sizes, setSizes] = useState<Sizes>(getSizes());

  useEffect(() => {
    const handler = debounce(() => {
      prevSizes.current = sizes;
      setSizes(getSizes());
    }, 100);

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return {
    sizes,
    prev: prevSizes.current,
  };
};

export default useResizeWindow;
