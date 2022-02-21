import { useEffect } from 'react';

type UseKeyPress = Record<string, (event: KeyboardEvent) => void>;

const useKeyPress = (handlers: UseKeyPress) => {
  useEffect(() => {
    const commonHandler = (event: KeyboardEvent) => {
      const handler = handlers[event.key];

      if (handler) {
        handler(event);
      }
    };

    document.addEventListener('keydown', commonHandler);

    return () => document.removeEventListener('keydown', commonHandler);
  }, [handlers]);
};

export default useKeyPress;
